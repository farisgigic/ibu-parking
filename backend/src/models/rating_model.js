import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';


const Rating = sequelize.define('Rating', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    role: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'ratings',
    underscored: true,
    timestamps: false
});

export default Rating;