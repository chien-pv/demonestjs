import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Product from './product.entity';
import { ProductParams } from './products.controller';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  private readonly logger = new Logger(ProductsService.name);

  public getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  public getOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  public async create(product: ProductParams) {
    // const product = await this.productRepository.findOne({
    //   where: {
    //     id: 1,
    //   },
    // });
    // return await this.productRepository.delete(1);
    // const productNew = new Product();
    // productNew.name = product.name;
    // productNew.description = product.description;
    // productNew.image = '6565';
    // productNew.price = '56565';

    return this.productRepository.save(product);
  }
  public async update(params: ProductParams, id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });
    console.log(product);
    product.description = params.description;
    product.name = params.name;
    product.price = params.price;
    product.image = params.image;
    return this.productRepository.save(product);
  }

  public async delete(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    this.productRepository.delete({ id });
    return product;
  }

  // @Cron('20 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 20');
  }
}
