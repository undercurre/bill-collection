import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity'; // 假设 User 实体位于 ../user/user.entity

@Entity('daily_expenses')
export class DailyExpense {
  @PrimaryGeneratedColumn('uuid')
  id: string; // 消费记录ID，使用 UUID

  @ManyToOne(() => User, (user) => user.dailyExpense, { onDelete: 'CASCADE' })
  user: User; // 关联的用户，设置为多对一关系

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number; // 消费金额

  @Column({ type: 'varchar', length: 50 })
  category: string; // 消费类别

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string; // 消费详情描述

  @Column({ type: 'date' })
  expenseDate: string; // 消费日期

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // 记录创建时间，自动生成
}
