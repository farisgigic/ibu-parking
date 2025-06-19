import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Reservation = sequelize.define('Reservation', {
  reservations_start_date: DataTypes.DATE,
  reservations_end_date: DataTypes.DATE,
  student_id: DataTypes.INTEGER,
  parking_slot_id: DataTypes.INTEGER
},
  {
    tableName: 'reservations',
    underscored: true,
    timestamps: false
  });

Reservation.associate = (models) => {
  Reservation.belongsTo(models.ParkingSlot, {
    foreignKey: 'parking_slot_id',
    as: 'slot'
  });

  Reservation.belongsTo(models.Student, {
    foreignKey: 'student_id',
    as: 'student'
  });
};



export default Reservation;
