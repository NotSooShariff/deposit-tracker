export enum LogLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
}

export class Logger {
  private time(): string {
    return new Date().toISOString(); 
  }

  private formatLog(level: LogLevel, message: string, metadata?: Record<string, any>): void {
    const logMessage = `${level} | ${this.time()} | ${message}`;
    if (metadata) {
      console.log(logMessage, '| Metadata:', JSON.stringify(metadata));
    } else {
      console.log(logMessage);
    }
  }

  public info(message: string, metadata?: Record<string, any>): void {
    this.formatLog(LogLevel.INFO, message, metadata);
  }

  public error(message: string, metadata?: Record<string, any>): void {
    this.formatLog(LogLevel.ERROR, message, metadata);
  }
}
