import { NextFunction, Request, Response } from 'express';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from '@dtos/categories.dto';
import categoryService from '@services/categories.service';

class CategoriesController {
  public categoryService = new categoryService();

  public getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCategoriesData: Category[] = await this.categoryService.findAllCategory();

      res.status(200).json(findAllCategoriesData);
    } catch (error) {
      next(error);
    }
  };

  public getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = Number(req.params.id);
      const findOneCategoryData: Category = await this.categoryService.findCategoryById(categoryId);

      res.status(200).json(findOneCategoryData);
    } catch (error) {
      next(error);
    }
  };

  public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryData: CreateCategoryDto = req.body;
      const createCategoryData: Category = await this.categoryService.createCategory(categoryData);

      res.status(201).json({ data: createCategoryData, message: 'the category successfully created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = Number(req.params.id);
      const categoryData: CreateCategoryDto = req.body;
      const updateCategoryData: Category = await this.categoryService.updateCategory(categoryId, categoryData);

      res.status(200).json({ data: updateCategoryData, message: 'the category data successfully changed' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = Number(req.params.id);
      const deleteCategoryData: Category = await this.categoryService.deleteCategory(categoryId);

      res.status(200).json({ data: deleteCategoryData, message: 'the category successfully deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoriesController;
