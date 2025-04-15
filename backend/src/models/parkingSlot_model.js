import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';


const ParkingSlot = sequelize.define('ParkingSlot',
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      slot_code: { 
        type: DataTypes.STRING,
        allowNull: false 
      },
      location: { 
        type: DataTypes.STRING,
        allowNull: false 
      },
      is_available: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
      },
      reserved_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reserved_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      section: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      tableName: 'parking_slots',
      timestamps: false,
    }
);


export default ParkingSlot;