import App from './app';
import AppRoutes from '@routes/index.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App(AppRoutes);

app.listen();
