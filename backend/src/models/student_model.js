import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/sequelize.js';

const Student = sequelize.define('Student',
    {
      student_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
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
        allowNull: false,
        validate: { isEmail: true },
      },
      google_id : {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false, 
      },
      picture_url: {
        type : DataTypes.STRING,
        allowNull : true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'student'
      },
      login_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, 
      },
    },
    {
      tableName: 'students',
      underscored: true,
      timestamps: true, 
      hooks: {
        beforeCreate: async (student) => {
            if (student.password) {
                const salt = await bcrypt.genSalt(10);
                student.password = await bcrypt.hash(student.password, salt);
            }
        },
        beforeUpdate: async (student) => {
            if (student.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                student.password = await bcrypt.hash(student.password, salt);
            }
        }
      }
    }
  );

  Student.associate = (models) => {
    Student.belongsTo(models.Report, {
        foreignKey: 'student_id',
        as: 'reports'
    });
}
  
export default Student;