import { Module } from '@nestjs/common';
import { DailyExpensesService } from './daily-expenses.service';
import { DailyExpensesController } from './daily-expenses.controller';

@Module({
  controllers: [DailyExpensesController],
  providers: [DailyExpensesService],
})
export class DailyExpensesModule {}
