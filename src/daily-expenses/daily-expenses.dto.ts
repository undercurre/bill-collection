import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateDailyExpenseDto {
  @IsNotEmpty()
  @IsString()
  userId: string; // 用户ID

  @IsNotEmpty()
  @IsNumber()
  amount: number; // 消费金额

  @IsNotEmpty()
  @IsString()
  category: string; // 消费类别

  @IsOptional()
  @IsString()
  description?: string; // 消费详情描述

  @IsNotEmpty()
  @IsDateString()
  expenseDate: string; // 消费日期
}
