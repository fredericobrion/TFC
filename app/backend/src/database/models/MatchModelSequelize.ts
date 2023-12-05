import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
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

MatchModelSequelize.belongsToMany(db.models.teams, {
  as: 'homeTeam',
  through: db.models.teams,
  foreignKey: 'id',
  otherKey: 'homeTeamId',
});
MatchModelSequelize.belongsToMany(db.models.teams, {
  as: 'awayTeam',
  through: db.models.teams,
  foreignKey: 'id',
  otherKey: 'awayTeamId',
});

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

export default MatchModelSequelize;
