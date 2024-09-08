import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from 'src/constants/names.constants';
import { User } from 'src/user/entities/user.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: process.env.DB_PASSWORD,
        database: 'fanscrm',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
