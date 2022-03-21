import { Routes } from '@interfaces/routes.interface';
import AuthRoute from '@routes/auth.route';
import UsersRoute from '@routes/users.route';
import ProductsRoute from '@routes/products.route';

const AppRoutes: Array<Routes> = [
  new UsersRoute(),
  new AuthRoute(),
  new ProductsRoute()
]

export default AppRoutes;
