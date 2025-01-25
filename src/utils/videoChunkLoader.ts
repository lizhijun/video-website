interface ChunkInfo {
  start: number;
  end: number;
  loaded: boolean;
}

class VideoChunkLoader {
  private static instance: VideoChunkLoader;
  private chunkSize = 1024 * 1024; // 1MB per chunk
  private chunks: Map<string, ChunkInfo[]> = new Map();
  private activeRequests: Map<string, XMLHttpRequest[]> = new Map();

  private constructor() {}

  static getInstance(): VideoChunkLoader {
    if (!VideoChunkLoader.instance) {
      VideoChunkLoader.instance = new VideoChunkLoader();
    }
    return VideoChunkLoader.instance;
  }

  initializeVideo(url: string, totalSize: number) {
    const numChunks = Math.ceil(totalSize / this.chunkSize);
    const chunks: ChunkInfo[] = [];

    for (let i = 0; i < numChunks; i++) {
      chunks.push({
        start: i * this.chunkSize,
        end: Math.min((i + 1) * this.chunkSize - 1, totalSize - 1),
        loaded: false,
      });
    }

    this.chunks.set(url, chunks);
    this.activeRequests.set(url, []);
  }

  loadChunk(url: string, chunkIndex: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const chunks = this.chunks.get(url);
      if (!chunks || chunks[chunkIndex].loaded) {
        resolve();
        return;
      }

      const chunk = chunks[chunkIndex];
      const xhr = new XMLHttpRequest();
      
      xhr.open('GET', url, true);
      xhr.setRequestHeader('Range', `bytes=${chunk.start}-${chunk.end}`);
      
      xhr.onload = () => {
        if (xhr.status === 206) {
          chunks[chunkIndex].loaded = true;
          this.removeActiveRequest(url, xhr);
          resolve();
        } else {
          this.removeActiveRequest(url, xhr);
          reject(new Error('Failed to load chunk'));
        }
      };

      xhr.onerror = () => {
        this.removeActiveRequest(url, xhr);
        reject(new Error('Network error'));
      };

      this.addActiveRequest(url, xhr);
      xhr.send();
    });
  }

  private addActiveRequest(url: string, xhr: XMLHttpRequest) {
    const requests = this.activeRequests.get(url) || [];
    requests.push(xhr);
    this.activeRequests.set(url, requests);
  }

  private removeActiveRequest(url: string, xhr: XMLHttpRequest) {
    const requests = this.activeRequests.get(url) || [];
    const index = requests.indexOf(xhr);
    if (index > -1) {
      requests.splice(index, 1);
    }
  }

  cancelLoading(url: string) {
    const requests = this.activeRequests.get(url) || [];
    requests.forEach(xhr => xhr.abort());
    this.activeRequests.set(url, []);
  }
}

export default VideoChunkLoader; 