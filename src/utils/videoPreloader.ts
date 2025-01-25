class VideoPreloader {
  private static instance: VideoPreloader;
  private preloadQueue: string[] = [];
  private maxPreloadSize = 3; // 最大同时预加载数量
  private currentlyLoading: Set<string> = new Set();
  private preloadedUrls: Set<string> = new Set();

  private constructor() {}

  static getInstance(): VideoPreloader {
    if (!VideoPreloader.instance) {
      VideoPreloader.instance = new VideoPreloader();
    }
    return VideoPreloader.instance;
  }

  preload(urls: string[]) {
    // 清理已有队列
    this.preloadQueue = [];
    this.currentlyLoading.clear();

    // 添加新的URL到队列
    this.preloadQueue.push(...urls);
    this.processQueue();
  }

  private processQueue() {
    while (
      this.preloadQueue.length > 0 &&
      this.currentlyLoading.size < this.maxPreloadSize
    ) {
      const url = this.preloadQueue.shift();
      if (url && !this.preloadedUrls.has(url)) {
        this.preloadVideo(url);
      }
    }
  }

  private preloadVideo(url: string) {
    if (this.currentlyLoading.has(url) || this.preloadedUrls.has(url)) {
      return;
    }

    this.currentlyLoading.add(url);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    xhr.onload = () => {
      if (xhr.status === 200) {
        this.preloadedUrls.add(url);
      }
      this.currentlyLoading.delete(url);
      this.processQueue();
    };

    xhr.onerror = () => {
      this.currentlyLoading.delete(url);
      this.processQueue();
    };

    xhr.send();
  }

  isPreloaded(url: string): boolean {
    return this.preloadedUrls.has(url);
  }
}

export default VideoPreloader; 