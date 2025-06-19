import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';


const ParkingSlot = sequelize.define('ParkingSlot', {
    slot_code: DataTypes.STRING,
    location: DataTypes.STRING,
    is_available: DataTypes.BOOLEAN,
    reserved_by: DataTypes.INTEGER,
    reserved_at: DataTypes.DATE,
    section: DataTypes.STRING,
    type: DataTypes.STRING,
    is_locked: DataTypes.BOOLEAN,
    reservation_start_date: DataTypes.DATE,
    reservation_end_date: DataTypes.DATE
  },
{
    tableName: 'parking_slots',
    underscored: true,
    timestamps: false
});

  ParkingSlot.associate = (models) => {
    ParkingSlot.hasMany(models.Reservation, {
      foreignKey: 'parking_slot_id',
      as: 'reservations'
    });
  };

  export default ParkingSlot;
