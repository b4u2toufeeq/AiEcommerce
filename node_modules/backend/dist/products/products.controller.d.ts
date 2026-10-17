import { ProductsService } from './products.service';
import { ProductQueryDto } from './dto/product-query.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(query: ProductQueryDto): Promise<{
        products: import("./interfaces/product.interface").Product[];
        total: number;
    }>;
    getCategories(): Promise<string[]>;
    getDeals(): Promise<import("./interfaces/product.interface").Product[]>;
    findById(id: string): Promise<import("./interfaces/product.interface").Product>;
}
