import express from 'express';
import middleware from '#/common/structure/index.js';
import config from '#/config/config.js';
import { connection } from '#/database/index.js';
import modules from '#/module/index.js';
const app = express();

app.use('/user', modules.userController);

app.use(middleware.globalHandler);
const bootstrap = async () => {
  await connection.sequelize
    .authenticate()
    .then(async () => {
      console.log('---');
      console.log('database connected successfully');
      await connection.sequelize.sync({ alter: true, force: true });
      return app.listen(config.PORT, config.BACKEND_URL, () => {
        console.log(`app url :  http://${config.BACKEND_URL + ':' + config.PORT} `);
      });
    })
    .catch((err) => {
      config.NODE_ENV == 'development' ? console.log(err) : undefined;

      console.log('---');
      console.log('error in database connection');
      return process.exit(1);
    });
};

export default bootstrap;
