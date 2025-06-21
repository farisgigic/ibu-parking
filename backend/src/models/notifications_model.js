import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    priority: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    icon: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    tableName: 'notifications',
    underscored: true,
    timestamps: false
});
export default Notification;