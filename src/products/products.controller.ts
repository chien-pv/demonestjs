import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth.guard';

export interface ProductParams {
  name: string;
  description: string;
  image: string;
  price: string;
}

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @UseGuards(AuthGuard)
  @Get('')
  public async index() {
    const products = await this.productService.getAll();
    return { products };
  }

  @Put('update/:id')
  public async update(@Body() body: ProductParams, @Param('id') id: number) {
    console.log(body);

    const product = await this.productService.update(body, id);

    return { message: 'Update thành công!!!', product };
  }

  @UseGuards(AuthGuard)
  @Post('create')
  public async create(@Body() body: ProductParams) {
    // console.log(body);

    // const product = await this.productService.create(body);

    return { message: 'Tạo mới thành công!!!' };
  }
}
