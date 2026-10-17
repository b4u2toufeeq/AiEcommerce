"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
function toProduct(p) {
    return {
        id: p.id,
        name: p.name,
        description: p.description,
        price: Number(p.price),
        category: p.category,
        image: p.image,
        rating: Number(p.rating),
        inStock: p.inStock,
        features: p.features,
        salePrice: p.salePrice != null ? Number(p.salePrice) : null,
        dealExpiresAt: p.dealExpiresAt instanceof Date
            ? p.dealExpiresAt.toISOString()
            : (p.dealExpiresAt ?? null),
        sellerId: p.sellerId ?? null,
    };
}
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const where = {};
        if (query.category) {
            where.category = query.category;
        }
        if (query.minPrice || query.maxPrice) {
            where.price = {
                ...(query.minPrice ? { gte: Number(query.minPrice) } : {}),
                ...(query.maxPrice ? { lte: Number(query.maxPrice) } : {}),
            };
        }
        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { description: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        const rows = await this.prisma.product.findMany({
            where,
            orderBy: { rating: 'desc' },
        });
        const products = rows.map(toProduct);
        return { products, total: products.length };
    }
    async getDeals() {
        const now = new Date();
        const rows = await this.prisma.product.findMany({
            where: {
                salePrice: { not: null },
                OR: [{ dealExpiresAt: null }, { dealExpiresAt: { gt: now } }],
            },
            orderBy: { updatedAt: 'desc' },
        });
        return rows.map(toProduct);
    }
    async findById(id) {
        const p = await this.prisma.product.findUnique({ where: { id } });
        return p ? toProduct(p) : null;
    }
    async getCategories() {
        const results = await this.prisma.product.findMany({
            select: { category: true },
            distinct: ['category'],
            orderBy: { category: 'asc' },
        });
        return results.map((r) => r.category);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map