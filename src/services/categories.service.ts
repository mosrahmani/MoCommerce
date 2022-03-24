import { hash } from 'bcrypt';
import { PrismaClient, Category } from '@prisma/client';
import { CreateCategoryDto } from '@dtos/categories.dto';
import { HttpException } from '@exceptions/HttpException';
import { checkDataExists } from '@utils/util';

class CategoryService {
  public categories = new PrismaClient().category;

  public async findAllCategory(): Promise<Category[]> {

    const allCategory: Category[] = await this.categories.findMany({});
    return allCategory;
  }

  public async findCategoryById(categoryId: number): Promise<Category> {
    checkDataExists(categoryId);

    const findCategory: Category = await this.categories.findUnique({where: { id: categoryId }});

    if (!findCategory) throw new HttpException(409, "You're not category");

    return findCategory;
  }

  public async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    checkDataExists(categoryData)
    const createCategoryData: Category = await this.categories.create({ data: categoryData });
    return createCategoryData;
  }

  public async updateCategory(categoryId: number, categoryData: CreateCategoryDto): Promise<Category> {
    checkDataExists(categoryData)

    const findCategory: Category = await this.categories.findUnique({ where: { id: categoryId } });
    if (!findCategory) throw new HttpException(409, "You're not category");

    const updateCategoryData = await this.categories.update({ where: { id: categoryId }, data: categoryData });
    return updateCategoryData;
  }

  public async deleteCategory(categoryId: number): Promise<Category> {
    checkDataExists(categoryId)

    const findCategory: Category = await this.categories.findUnique({ where: { id: categoryId } });
    if (!findCategory) throw new HttpException(409, "the category not found");

    const deleteCategoryData = await this.categories.delete({ where: { id: categoryId } });
    return deleteCategoryData;
  }
}

export default CategoryService;
