import { Routes } from '@interfaces/routes.interface';
import AuthRoute from '@routes/auth.route';
import UsersRoute from '@routes/users.route';
import ProductsRoute from '@routes/products.route';
import CategoriesRoute from '@routes/categories.route';

const AppRoutes: Array<Routes> = [
  new UsersRoute(),
  new AuthRoute(),
  new ProductsRoute(),
  new CategoriesRoute()
]

export default AppRoutes;
