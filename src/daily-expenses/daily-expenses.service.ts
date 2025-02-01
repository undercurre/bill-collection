import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyExpense } from './daily-expenses.entity';
import { CreateDailyExpenseDto } from './daily-expenses.dto';

@Injectable()
export class DailyExpensesService {
  constructor(
    @InjectRepository(DailyExpense)
    private readonly dailyExpenseRepository: Repository<DailyExpense>,
  ) {}

  async create(
    createDailyExpenseDto: CreateDailyExpenseDto,
  ): Promise<DailyExpense> {
    const expense = this.dailyExpenseRepository.create(createDailyExpenseDto);
    return this.dailyExpenseRepository.save(expense);
  }

  async findAll(userId: string): Promise<DailyExpense[]> {
    return this.dailyExpenseRepository.find({
      where: { user: { id: userId } },
      relations: ['user'], // 关联用户信息
    });
  }

  async findOne(id: string): Promise<DailyExpense> {
    const expense = await this.dailyExpenseRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!expense) {
      throw new NotFoundException(`Daily expense with ID "${id}" not found.`);
    }
    return expense;
  }

  async remove(id: string): Promise<void> {
    const result = await this.dailyExpenseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Daily expense with ID "${id}" not found.`);
    }
  }
}
