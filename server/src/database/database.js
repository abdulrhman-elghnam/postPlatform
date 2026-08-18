import { Sequelize } from 'sequelize';
import config from '#/config/config.js';

const sequelize = new Sequelize(config.DB_URI, {
  pool: {
    min: 0,
    max: 4,
  },
});

export default sequelize;
