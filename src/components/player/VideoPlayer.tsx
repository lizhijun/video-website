'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';
import { Movie } from '@/types/movie';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import PlayerControls from './PlayerControls';
import PlayerHeader from './PlayerHeader';
import QualityMenu from './QualityMenu';
import ShortcutHints from './ShortcutHints';
import { Subtitle, SubtitleCue } from '@/types/subtitle';
import { parseVTT } from '@/utils/subtitleParser';
import SubtitleDisplay from './SubtitleDisplay';
import SubtitleMenu from './SubtitleMenu';
import { detectSubtitles, getUserPreferredSubtitle, saveUserPreferredSubtitle } from '@/utils/subtitleLoader';
import { SubtitleSettings, defaultSubtitleSettings } from '@/utils/subtitleSettings';

interface VideoPlayerProps {
  movie: Movie;
  onClose?: () => void;
}

const HLS_URL = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export default function VideoPlayer({ movie, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [currentQuality, setCurrentQuality] = useState<number>(0);
  const [qualities, setQualities] = useState<{ height: number; bitrate: number }[]>([]);
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<string | null>(null);
  const [subtitleCues, setSubtitleCues] = useState<SubtitleCue[]>([]);
  const [subtitleSettings, setSubtitleSettings] = useState<SubtitleSettings>(defaultSubtitleSettings);

  // 初始化 HLS
  useEffect(() => {
    if (!videoRef.current) return;

    setIsLoading(true);
    if (Hls.isSupported()) {
      const hls = new Hls({
        capLevelToPlayerSize: true,
        autoStartLoad: true,
        startLevel: -1, // 自动选择最佳质量
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });

      hlsRef.current = hls;
      hls.loadSource(HLS_URL);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        setQualities(data.levels.map(level => ({
          height: level.height,
          bitrate: level.bitrate
        })));
        setIsLoading(false);
        // 自动播放
        videoRef.current?.play().catch(() => {
          console.log('Auto-play prevented');
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        setCurrentQuality(data.level);
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = HLS_URL;
      setIsLoading(false);
    }
  }, []);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleSeek = useCallback((value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
      setCurrentTime(value);
    }
  }, []);

  const handleVolumeChange = useCallback((value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      setVolume(value);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // 控制界面显示/隐藏
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    setShowBackdrop(true);
    clearTimeout(controlsTimeoutRef.current);

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowBackdrop(false);
      }, 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?') {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
        return;
      }
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          handleVolumeChange(volume === 0 ? 1 : 0);
          break;
        case 'arrowleft':
          e.preventDefault();
          if (videoRef.current) {
            handleSeek(Math.max(0, currentTime - 10));
          }
          break;
        case 'arrowright':
          e.preventDefault();
          if (videoRef.current) {
            handleSeek(Math.min(duration, currentTime + 10));
          }
          break;
        case 'arrowup':
          e.preventDefault();
          handleVolumeChange(Math.min(1, volume + 0.1));
          break;
        case 'arrowdown':
          e.preventDefault();
          handleVolumeChange(Math.max(0, volume - 0.1));
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentTime, duration, volume, handlePlayPause, handleVolumeChange, handleSeek, toggleFullscreen]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoClick = () => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;

    if (timeDiff < 300) {
      // Double click detected
      toggleFullscreen();
    } else {
      handlePlayPause();
    }

    setLastClickTime(currentTime);
  };

  const handleQualityChange = (index: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = index;
    }
  };

  // 初始化字幕
  useEffect(() => {
    async function initSubtitles() {
      try {
        // 检测可用字幕
        const { subtitles: availableSubtitles, defaultSubtitle } = await detectSubtitles(movie.id);
        setSubtitles(availableSubtitles);

        // 获取用户首选字幕
        const preferredSubtitle = getUserPreferredSubtitle();
        const subtitleToUse = preferredSubtitle || defaultSubtitle;

        // 如果有可用字幕且用户未明确关闭字幕，则自动加载
        if (subtitleToUse && availableSubtitles.some(s => s.id === subtitleToUse)) {
          setCurrentSubtitle(subtitleToUse);
        }
      } catch (error) {
        console.error('Failed to initialize subtitles:', error);
      }
    }

    initSubtitles();
  }, [movie.id]);

  // 保存用户字幕偏好
  const handleSubtitleChange = useCallback((subtitleId: string | null) => {
    setCurrentSubtitle(subtitleId);
    saveUserPreferredSubtitle(subtitleId);
  }, []);

  // 加载字幕
  useEffect(() => {
    if (!currentSubtitle) {
      setSubtitleCues([]);
      return;
    }

    const subtitle = subtitles.find(s => s.id === currentSubtitle);
    if (!subtitle) return;

    fetch(subtitle.url)
      .then(res => res.text())
      .then(vttContent => {
        const cues = parseVTT(vttContent);
        setSubtitleCues(cues);
      })
      .catch(error => {
        console.error('Failed to load subtitles:', error);
      });
  }, [currentSubtitle, subtitles]);

  return (
    <div 
      className="fixed inset-0 bg-black z-50"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (isPlaying) {
          setShowControls(false);
          setShowBackdrop(false);
        }
      }}
    >
      {/* 顶部渐变背景 */}
      <div 
        className={`absolute top-0 left-0 right-0 h-32 gradient-bottom z-40 transition-opacity duration-300 ${
          showBackdrop ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 返回按钮 */}
      {onClose && (
        <div 
          className={`absolute top-0 left-0 right-0 z-50 p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors btn-secondary"
          >
            <ArrowLeftIcon className="w-6 h-6" />
            <span>返回观看详情</span>
          </button>
        </div>
      )}

      {/* 视频标题 */}
      <PlayerHeader 
        title={movie.title} 
        show={showControls}
      />
      
      {/* 视频播放器 */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={handleVideoClick}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => {
            setIsBuffering(false);
            setIsPlaying(true);
          }}
          onPause={() => setIsPlaying(false)}
          poster={movie.posterUrl}
          playsInline
        />

        {/* 加载动画 */}
        {(isLoading || isBuffering) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="netflix-loader" />
          </div>
        )}

        <SubtitleDisplay
          cues={subtitleCues}
          currentTime={currentTime}
          show={showControls}
          settings={subtitleSettings}
        />

        {/* 播放控制器 */}
        <PlayerControls
          show={showControls}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          isFullscreen={isFullscreen}
          movie={movie}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onToggleFullscreen={toggleFullscreen}
          qualityMenu={
            <QualityMenu
              qualities={qualities}
              currentQuality={currentQuality}
              onQualityChange={handleQualityChange}
            />
          }
          subtitleMenu={
            <SubtitleMenu
              subtitles={subtitles}
              currentSubtitle={currentSubtitle}
              onSubtitleChange={handleSubtitleChange}
            />
          }
        />
      </div>

      {/* 快捷键提示 */}
      <ShortcutHints show={showShortcuts} />
    </div>
  );
} 