import express from 'express';
import middleware from '#/common/structure/_index.js';
import config from '#/config/config.js';
import { connection } from '#/database/_index.js';
import modules from '#/module/_index.js';
import structure from '#/common/structure/_index.js';
const app = express();

app.use(express.json());

app.use('/users', modules.userController);
app.use('/posts', modules.postController);
app.use('/comments', modules.postController);

app.use(middleware.globalHandler);
const bootstrap = async () => {
  await connection.sequelize
    .authenticate()
    .then(async () => {
      console.log('---');
      console.log('database connected successfully');
      await connection.sequelize.sync({ alter: true, force: false });
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

app.get('/', (req, res) => {
  structure.sendSuccess(res, 'welcome to backend api', 404, undefined);
});
app.all('/{*any}', (req, res) => {
  structure.sendSuccess(res, 'route not found', 404, undefined);
});

export default bootstrap;
