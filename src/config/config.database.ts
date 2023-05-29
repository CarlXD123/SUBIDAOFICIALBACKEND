import { Sequelize } from "sequelize"

const db = new Sequelize('SL_RedLab_Dev', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  port: 5432,
  protocol: 'postgres',
  dialectOptions: {
      ssl: process.env.DB_ENABLE_SSL && {
          require: true
      }
  }
});
export default db;