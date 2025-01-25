import { VideoSource } from '@/types/movie';

class AdaptiveBitrate {
  private static instance: AdaptiveBitrate;
  private measurementPeriod = 5000; // 5 seconds
  private measurements: number[] = [];
  private lastMeasurementTime = 0;
  private currentBandwidth = Infinity;

  private constructor() {}

  static getInstance(): AdaptiveBitrate {
    if (!AdaptiveBitrate.instance) {
      AdaptiveBitrate.instance = new AdaptiveBitrate();
    }
    return AdaptiveBitrate.instance;
  }

  addMeasurement(bytesLoaded: number, duration: number) {
    const now = Date.now();
    const bps = (bytesLoaded * 8) / (duration / 1000);

    this.measurements.push(bps);
    
    // Keep only measurements from the last period
    while (this.measurements.length > 0 && 
           now - this.lastMeasurementTime > this.measurementPeriod) {
      this.measurements.shift();
    }

    this.lastMeasurementTime = now;
    this.updateBandwidth();
  }

  private updateBandwidth() {
    if (this.measurements.length === 0) return;

    // Use the 90th percentile of measurements
    const sorted = [...this.measurements].sort((a, b) => a - b);
    const index = Math.floor(sorted.length * 0.9);
    this.currentBandwidth = sorted[index];
  }

  getBestQuality(sources: VideoSource[]): VideoSource {
    // 使用当前带宽的70%来选择质量，留出缓冲
    const targetBitrate = this.currentBandwidth * 0.7;

    // 按比特率从高到低排序
    const sortedSources = [...sources].sort((a, b) => b.bitrate - a.bitrate);

    // 选择第一个比特率低于目标的源
    return sortedSources.find(source => source.bitrate * 1000 <= targetBitrate) 
           || sortedSources[sortedSources.length - 1];
  }
}

export default AdaptiveBitrate; 