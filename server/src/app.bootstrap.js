import express from 'express';
import middleware from "#/common/middleware/index.js"
import config from '#/config/config.js';
import { connection } from '#/database/_index.js';
import modules from '#/module/index.js';
const app = express();

app.use('/user', modules.userController);

app.use(middleware.globalHandler)
const bootstrap = async () => {
  await connection
    .authenticate()
    .then(async () => {
      console.log('---');
      console.log('database connected successfully');
      await connection.sync({ alter: true , force : true });
      return app.listen(config.PORT, config.BACKEND_URL, () => {
        console.log(`app url :  http://${config.BACKEND_URL + ':' + config.PORT} `);
      });
    })
    .catch(() => {
      console.log('---');
      console.log('error in database connection');
      return process.exit(1);
    });
};

export default bootstrap;
