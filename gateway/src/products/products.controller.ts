import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE, SERVICE_NATS } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
    @Inject(SERVICE_NATS) private readonly productsClientNats: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    //return this.productsClient.send(
    //  { cmd: 'create_product' },
    //  createProductDto,
    //);
    return this.productsClientNats.send(
      { cmd: 'create_product' },
      createProductDto,
    );
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    //return this.productsClient.send(
    //  { cmd: 'find_all_products' },
    //  paginationDto,
    //);
    return this.productsClientNats.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    //------------------------ TCP ----------------------------------------------
    //return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
    //  catchError((err) => {
    //    throw new RpcException(err);
    //  }),
    //);
    //------------------------ TCP ----------------------------------------------
    //------------------------ NATS SERVER --------------------------------------

    return this.productsClientNats.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
    //------------------------ NATS SERVER --------------------------------------
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClientNats.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsClientNats
      .send(
        { cmd: 'update_product' },
        {
          id,
          ...updateProductDto,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
