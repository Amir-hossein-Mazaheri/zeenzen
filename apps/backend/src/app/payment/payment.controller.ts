import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { PaymentService } from './payment.service';
import { GetPaymentCodeDTO } from './dto/get-payment-code.dto';
import { VerifyPaymentDTO } from './dto/verify-payment.dto';
import { Public } from '../auth/decorators/public.decorator';
import { RequestUser } from '../types';
import { GetUser } from '../user/decorators/user.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Public()
  @Post('verify')
  returnUrl(@Body() verifyPaymentDto: VerifyPaymentDTO) {
    return this.paymentService.verify(verifyPaymentDto);
  }

  @Public()
  @Post('get-payment-code')
  getPaymentCode(
    @Body() getPaymentDto: GetPaymentCodeDTO,
    @Req() req: Request,
    @GetUser() user: RequestUser
  ) {
    return this.paymentService.connectToIDPayGate(
      getPaymentDto,
      req,
      user,
      '2000',
      'testing payment api.'
    );
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentService.findOne(id);
  }
}
