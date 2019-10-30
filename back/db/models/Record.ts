import Sequelize, {
  Model,
  BelongsToGetAssociationMixin,
  BelongsToCreateAssociationMixin,
  BelongsToSetAssociationMixin,
} from
'sequelize';
import { sequelize } from '../db';
import { User } from './User';

export class Record extends Model {
  public id!: number;
  public date: string;
  public distance: number;
  public time: number;

  public getUser!: BelongsToGetAssociationMixin<Record>;
  public setUser!: BelongsToSetAssociationMixin<Record, number>;
  public createUser!: BelongsToCreateAssociationMixin<Record>;

  public readonly user?: User;
}

Record.init({
  id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  date      : { type: Sequelize.DATE},
  distance  : { type: Sequelize.INTEGER},
  time      : { type: Sequelize.INTEGER},
}, {
  tableName: 'Records',
  sequelize: sequelize,
});