import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';


import { ORDER_SERVICE, SERVICE_NATS } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {

  constructor(
    //@Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
    @Inject(SERVICE_NATS) private readonly ordersClientNats: ClientProxy,

  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClientNats.send('createOrder', createOrderDto);
  }

  @Get()
  findAll( @Query() orderPaginationDto: OrderPaginationDto ) {
    //console.log('object');
    return this.ordersClientNats.send('findAllOrders', orderPaginationDto);
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe ) id: string) {
    console.log('entro');
    try {
      const order = await firstValueFrom(
        this.ordersClientNats.send('findOneOrder', { id })
      );

      return order;

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {

      return this.ordersClientNats.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      });

    } catch (error) {
      throw new RpcException(error);
    }
  }


  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe ) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return this.ordersClientNats.send('changeOrderStatus', { id, status: statusDto.status })
    } catch (error) {
      throw new RpcException(error);
    }
  }



}
