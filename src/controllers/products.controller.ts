import { NextFunction, Request, Response } from 'express';
import { Product } from '@prisma/client';
import { CreateProductDto } from '@dtos/products.dto';
import productService from '@services/products.service';

class ProductsController {
  public productService = new productService();

  public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const {sortBy} = req.query;
      const sortingParam = this.sortingProducts(sortBy);

      const findAllProductsData: Product[] = await this.productService.findAllProduct(sortingParam);

      res.status(200).json(findAllProductsData);
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = Number(req.params.id);
      const findOneProductData: Product = await this.productService.findProductById(productId);

      res.status(200).json(findOneProductData);
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productData: CreateProductDto = req.body;
      const createProductData: Product = await this.productService.createProduct(productData);

      res.status(201).json({ data: createProductData, message: 'the user successfully created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = Number(req.params.id);
      const productData: CreateProductDto = req.body;
      const updateProductData: Product = await this.productService.updateProduct(productId, productData);

      res.status(200).json({ data: updateProductData, message: 'the user data successfully changed' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = Number(req.params.id);
      const deleteProductData: Product = await this.productService.deleteProduct(productId);

      res.status(200).json({ data: deleteProductData, message: 'the user successfully deleted' });
    } catch (error) {
      next(error);
    }
  };

  public sortingProducts = (value: any): Object[] => {
    const sortingParam: Object[] = []

    switch (value) {
      case 'cheapest':
        sortingParam.push({ 'price': 'asc'})
      case 'latest':
        sortingParam.push({ 'created_at': 'desc'})
    }

    return sortingParam
  };
}

export default ProductsController;
