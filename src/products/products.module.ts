import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService, ProductsResolver, JwtService],
  controllers: [ProductsController],
})
export class ProductsModule {}
