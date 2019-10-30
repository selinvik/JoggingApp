import Sequelize, {
  Model,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association
} from 'sequelize';
import { sequelize } from '../db';
import { Record } from './Record';
import bcrypt from 'bcrypt';

export class User extends Model {
  public id!: number;
  public firstName: string;
  public lastName: string;
  public email!: string;
  public password: string;

  public getRecords!: HasManyGetAssociationsMixin<Record>;
  public addRecord!: HasManyAddAssociationMixin<Record, number>;
  public hasRecord!: HasManyHasAssociationMixin<Record, number>;
  public countRecords!: HasManyCountAssociationsMixin;
  public createRecord!: HasManyCreateAssociationMixin<Record>;

  public readonly records?: Record[];

  public static associations: {
    projects: Association<User, Record>;
  };

  public validPassword: (string) => Promise<boolean>;
}

User.init({
  id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  firstName : { type: Sequelize.STRING },
  lastName  : { type: Sequelize.STRING },
  email     : { type: Sequelize.STRING, allowNull: false, unique: true },
  password  : { type: Sequelize.STRING },
}, {
  tableName: 'Users',
  sequelize: sequelize,
});

User.prototype.validPassword = async function(password){
  return await bcrypt.compare(password, this.dataValues.password);
}