import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.NUMBER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;
}
