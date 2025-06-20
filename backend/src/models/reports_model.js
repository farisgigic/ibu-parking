import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Report = sequelize.define('Report', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    category: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    priority: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    issue_title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    picture_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'reports',
    underscored: true,
    timestamps: false
});
Report.associate = (models) => {
    Report.belongsTo(models.Student, {
        foreignKey: 'student_id',
        as: 'student'
    });
}

export default Report;