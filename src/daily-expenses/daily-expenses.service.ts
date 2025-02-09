import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyExpense } from './daily-expenses.entity';
import { CreateDailyExpenseDto } from './daily-expenses.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class DailyExpensesService {
  constructor(
    @InjectRepository(DailyExpense)
    private readonly dailyExpenseRepository: Repository<DailyExpense>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createDailyExpenseDto: CreateDailyExpenseDto,
  ): Promise<DailyExpense> {
    // 查找 User 实体
    const user = await this.userRepository.findOne({
      where: { id: createDailyExpenseDto.userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const expense = this.dailyExpenseRepository.create({
      ...createDailyExpenseDto,
      user,
    });
    return this.dailyExpenseRepository.save(expense);
  }

  async createBatch(
    createDailyExpenseDtos: CreateDailyExpenseDto[],
  ): Promise<DailyExpense[]> {
    const expenses = this.dailyExpenseRepository.create(createDailyExpenseDtos);
    return this.dailyExpenseRepository.save(expenses); // 批量插入
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
