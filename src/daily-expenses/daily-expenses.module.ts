import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyExpensesService } from './daily-expenses.service';
import { DailyExpensesController } from './daily-expenses.controller';
import { DailyExpense } from './daily-expenses.entity';
import { User } from '../users/users.entity'; // 关联 User 实体

@Module({
  imports: [TypeOrmModule.forFeature([DailyExpense, User])],
  controllers: [DailyExpensesController],
  providers: [DailyExpensesService],
})
export class DailyExpensesModule {}
