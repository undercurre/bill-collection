import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DailyExpensesService } from './daily-expenses.service';
import { CreateDailyExpenseDto } from './daily-expenses.dto';
import { JwtAuthGuard } from 'src/guard/jwt/jwt-auth.guard';
import { isPublic } from 'src/guard/jwt/public.decorator';

@Controller('daily-expenses')
export class DailyExpensesController {
  constructor(private readonly dailyExpensesService: DailyExpensesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
