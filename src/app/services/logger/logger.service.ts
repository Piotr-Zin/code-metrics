import { Injectable } from '@angular/core';
import ConsoleColors from 'src/app/utils/console-colors';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor() {}

  info(message: string): void {
    console.log(
      `%c[INFO] %c=> ${message}`,
      `color: ${ConsoleColors.INFO}`,
      `color: ${ConsoleColors.DEFAULT}`
    );
  }

  debug(message: string): void {
    console.log(
      `%c[DEBUG] %c=> ${message}`,
      `color: ${ConsoleColors.DEBUG}`,
      `color: ${ConsoleColors.DEFAULT}`
    );
  }

  warn(message: string): void {
    console.log(
      `%c[WARNING] %c=> ${message}`,
      `color: ${ConsoleColors.WARN}`,
      `color: ${ConsoleColors.DEFAULT}`
    );
  }

  error(message: string): void {
    console.error(`%c[ERROR] => ${message}`, `color: ${ConsoleColors.ERROR}`);
  }
}
