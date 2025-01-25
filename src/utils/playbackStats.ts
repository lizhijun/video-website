interface PlaybackStats {
  movieId: number;
  currentTime: number;
  duration: number;
  lastPlayed: Date;
}

export function savePlaybackProgress(movieId: number, currentTime: number, duration: number) {
  const stats: PlaybackStats = {
    movieId,
    currentTime,
    duration,
    lastPlayed: new Date(),
  };
  localStorage.setItem(`playback-${movieId}`, JSON.stringify(stats));
}

export function getPlaybackProgress(movieId: number): PlaybackStats | null {
  const data = localStorage.getItem(`playback-${movieId}`);
  return data ? JSON.parse(data) : null;
} 