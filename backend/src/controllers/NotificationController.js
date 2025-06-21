import Notification from "../models/notifications_model";
import logger from "../services/loggerService";
const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(201).json(notification);
        logger.info(`Notification created: ${notification.id}`);
    } catch (error) {
        res.status(500).json({ message: 'Error creating notification', error });
    }
}

const getAllNotifications = async (req, res) => {
    try {
        // Get page and limit from query params, with default values
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5; // Default to 5 notifications per page

        // Calculate the offset for the database query
        const offset = (page - 1) * limit;

        // Use findAndCountAll to get a slice of notifications and the total count
        const { count, rows } = await Notification.findAndCountAll({
            limit: limit,
            offset: offset,
             order: [['date', 'DESC']]
        });

        // Calculate total pages
        const totalPages = Math.ceil(count / limit);

        // Send a structured response with pagination info
        res.status(200).json({
            totalItems: count,
            totalPages: totalPages,
            currentPage: page,
            notifications: rows
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
}

export default { createNotification, getAllNotifications };