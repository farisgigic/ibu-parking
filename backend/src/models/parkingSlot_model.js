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
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'available', // can be 'available', 'reserved', or 'locked'
      },
      is_locked: {
        type: DataTypes.BOOLEAN,
        // defaultValue: false, // Indicates if the slot is locked
      },
      reservation_start_date: {
        type: DataTypes.DATE,
        allowNull: true, // Allows null if not reserved
      },
      reservation_end_date: {
        type: DataTypes.DATE,
        allowNull: true, // Allows null if not reserved
      }
    },
    {
      tableName: 'parking_slots',
      timestamps: false,
    }
);


export default ParkingSlot;