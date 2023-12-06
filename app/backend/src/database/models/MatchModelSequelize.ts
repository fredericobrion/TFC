import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import TeamModelSequelize from './TeamModelSequelize';
import db from '.';

class MatchModelSequelize extends Model<
InferAttributes<MatchModelSequelize>,
InferCreationAttributes<MatchModelSequelize>
> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

MatchModelSequelize.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

// MatchModelSequelize.belongsTo(db.models.teams, {
//   as: 'homeTeam',
//   foreignKey: 'id',
// });
// MatchModelSequelize.belongsTo(db.models.teams, {
//   as: 'awayTeam',
//   foreignKey: 'id',
// });

MatchModelSequelize.hasMany(TeamModelSequelize, { foreignKey: 'id', as: 'homeTeam' });
MatchModelSequelize.hasMany(TeamModelSequelize, { foreignKey: 'id', as: 'awayTeam' });

TeamModelSequelize.belongsTo(MatchModelSequelize, { foreignKey: 'id', as: 'homeTeam' });
TeamModelSequelize.belongsTo(MatchModelSequelize, { foreignKey: 'id', as: 'awayTeam' });

export default MatchModelSequelize;
