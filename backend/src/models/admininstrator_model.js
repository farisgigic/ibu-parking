import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Administrator = sequelize.define('Administrator',
    {
      admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false    
        },
        email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },
      google_id: {
        type: DataTypes.STRING,   
        allowNull: false,
        unique: true,
        },
        picture_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,       
        defaultValue: DataTypes.NOW,
        },
        login_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'administrators',
      underscored: true,   
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      hooks: {
        beforeCreate: (administrator) => {
          administrator.login_count = 1; // Initialize login count to 1 on creation
        },
        beforeUpdate: (administrator) => {
          if (administrator.changed('login_count')) {
            administrator.login_count += 1; // Increment login count on update
          }
        }
      }
    }
);

export default Administrator;
        