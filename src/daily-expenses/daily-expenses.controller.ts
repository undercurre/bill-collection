import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { DailyExpensesService } from './daily-expenses.service';
import { CreateDailyExpenseDto } from './daily-expenses.dto';
import { isPublic } from 'src/guard/jwt/public.decorator';

@Controller('daily-expenses')
export class DailyExpensesController {
  constructor(private readonly dailyExpensesService: DailyExpensesService) {}

  @Post()
  async create(
    @Body() createDailyExpenseDto: Omit<CreateDailyExpenseDto, 'userId'>,
    @Request() req,
  ) {
    console.log(req.user);
    return this.dailyExpensesService.create({
      userId: req.user.userId,
      ...createDailyExpenseDto,
    });
  }

  @Post('create/batch')
  async createBatch(
    @Body()
    createDailyExpenseDtos: { list: Omit<CreateDailyExpenseDto, 'userId'>[] },
    @Request() req,
  ) {
    return this.dailyExpensesService.createBatch(
      createDailyExpenseDtos.list.map((item) => {
        return {
          userId: req.user.userId,
          ...item,
        };
      }),
    );
  }

  @Get()
  async findAll(@Query('userId') userId: string) {
    return this.dailyExpensesService.findAll(userId);
  }

  // 注意顺序，否则会被findOne吞掉
  @Get('public')
  @isPublic()
  getPublic() {
    return 'This is a public endpoint';
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.dailyExpensesService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.dailyExpensesService.remove(id);
  }
}
