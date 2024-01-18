import { insufficientNutrientAlarmService } from './service';
import cron from 'node-cron';

// 매일 저녁 9시에 cron job 실행
cron.schedule(
  '0 21 * * *',
  async () => {
    try {
      await insufficientNutrientAlarmService();
    } catch (e) {
      console.error('에러 발생:', e.message);
      return e;
    }
  },
  {
    scheduled: true,
    timezone: 'Asia/Seoul',
  },
);
