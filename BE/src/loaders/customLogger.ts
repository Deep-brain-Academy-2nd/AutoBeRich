import winston, { Logger, createLogger, transports, format, config } from 'winston';

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}

// 직접 정의한 로그 레벨
const customLevels: config.AbstractConfigSetLevels = {
  customedError: 0,
  customedWarn: 1,
  customedInfo: 2,
  customedDebug: 3,
  customedSilly: 4,
};

// 레벨별 색상 * 주어지지않은 색상을 넣을 경우 오류 발생
const customColors: config.AbstractConfigSetColors = {
  customedError: 'red',
  customedWarn: 'yellow',
  customedInfo: 'cyan',
  customedDebug: 'magenta',
  customedSilly: 'gray',
};

// 색상을 추가하고싶다면 winston에게 이를 알려야한다. (README 참고)
winston.addColors(customColors);

interface CustomLevels extends winston.Logger {
  customedError: winston.LeveledLogMethod;
  customedWarn: winston.LeveledLogMethod;
  customedInfo: winston.LeveledLogMethod;
  customedDebug: winston.LeveledLogMethod;
  customedSilly: winston.LeveledLogMethod;
}

const logDir = './logs'; // logs 디렉토리 하위에 로그 파일 저장

export const customLogger: CustomLevels = <CustomLevels>createLogger({
  levels: customLevels,
  format: format.combine(
    format.label({ label: '[customed-server]' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.colorize(), // 색상을 보고싶다면 꼭 추가!
    format.printf((info: TransformableInfo) => `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`)
  ),
  transports: [
    new transports.File({ filename: 'combined.log', dirname: logDir }),
    new transports.File({ filename: 'error.log', level: 'error', dirname: logDir }),
    new transports.Console({ level: 'customedSilly' }),
  ],
});
// Production 환경이 아닌 경우(dev 등)
if (process.env.NODE_ENV !== 'production') {
  customLogger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // 색깔 넣어서 출력
        winston.format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
      ),
    })
  );
}

export { customLogger as logger };
