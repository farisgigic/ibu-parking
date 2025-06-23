import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Unauthorized = sequelize.define('Unauthorized',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { isEmail: true }
      },
    },
    {
      tableName: 'unauthorized',
      underscored: true,   
      timestamps: false,
    }
);

export default Unauthorized;
        