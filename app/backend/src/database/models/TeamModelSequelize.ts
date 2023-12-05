import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class TeamModelSequelize extends Model<
InferAttributes<TeamModelSequelize>,
InferCreationAttributes<TeamModelSequelize>
> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

TeamModelSequelize.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

export default TeamModelSequelize;
