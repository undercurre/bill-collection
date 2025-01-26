import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailyExpensesModule } from './daily-expenses/daily-expenses.module';

@Module({
  imports: [DailyExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
