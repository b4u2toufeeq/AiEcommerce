import { PrismaService } from '../prisma/prisma.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { Product } from './interfaces/product.interface';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: ProductQueryDto): Promise<{
        products: Product[];
        total: number;
    }>;
    getDeals(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    getCategories(): Promise<string[]>;
}
