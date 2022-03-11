import App from '@/app';
import FlagRoute from '@routes/flags.route';
import validateEnv from '@utils/validateEnv';

validateEnv();
const app = new App([new FlagRoute()]);
app.listen();
