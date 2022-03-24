import { hash } from 'bcrypt';
import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDto } from '@dtos/products.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import slugify from 'slugify';

class ProductService {
  public products = new PrismaClient().product;

  public async findAllProduct(orderBy: Object[]): Promise<Product[]> {

    const allProduct: Product[] = await this.products.findMany({
      include: { photos: { select: { url: true } } },
      orderBy,
    });
    return allProduct;
  }

  public async findProductById(productId: number): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, "You're not productId");

    const findProduct: Product = await this.products.findUnique({
      where: { id: productId },
      include: { photos: { select: { url: true } } }
    });

    if (!findProduct) throw new HttpException(409, "You're not product");

    return findProduct;
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    productData.slug = slugify(productData.slug);
    const createProductData: Product = await this.products.create({ data: productData });
    return createProductData;
  }

  public async updateProduct(productId: number, productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    const findProduct: Product = await this.products.findUnique({ where: { id: productId } });
    if (!findProduct) throw new HttpException(409, "You're not product");

    const hashedPassword = await hash(productData.password, 10);
    const updateProductData = await this.products.update({ where: { id: productId }, data: { ...productData, password: hashedPassword } });
    return updateProductData;
  }

  public async deleteProduct(productId: number): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, "You're not productId");

    const findProduct: Product = await this.products.findUnique({ where: { id: productId } });
    if (!findProduct) throw new HttpException(409, "You're not product");

    const deleteProductData = await this.products.delete({ where: { id: productId } });
    return deleteProductData;
  }
}

export default ProductService;
