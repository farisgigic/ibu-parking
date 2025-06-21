import sequelize from '../config/sequelize.js';

import ParkingSlot from './parkingSlot_model.js';
import Reservation from './reservations_model.js';
import Student from './student_model.js';
import Report from './reports_model.js';
const models = {
  sequelize,
  ParkingSlot,
  Reservation,
  Student, 
  Report
};

// Ako modeli imaju definisane "associate" metode, pozovi ih
Object.values(models).forEach((model) => {
  if (model?.associate) {
    model.associate(models);
  }
});

// Individualni exporti ako želiš da ih importuješ direktno
export {
  sequelize,
  ParkingSlot,
  Reservation,
  Student,
  Report
};

export default models;
