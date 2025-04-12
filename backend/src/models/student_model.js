import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/sequelize.js';

const Student = sequelize.define('Student',
    {
      student_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      first_name: { 
        type: DataTypes.STRING,
        allowNull: false 
      },
      last_name: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true },
      },
      google_id : {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      picture_url: {
        type : DataTypes.STRING,
        allowNull : true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'students',
      timestamps: false,
      hooks: {
        beforeCreate: async (student) => {
          student.password = await bcrypt.hash(student.password, 10);
        },
        beforeUpdate: async (student) => {
          if (student.changed('password')) {
            student.password = await bcrypt.hash(student.password, 10);
          }
        },
      }
    }
  );
  
export default Student;