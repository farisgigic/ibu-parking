import Notification from "../models/notifications_model";

const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error creating notification', error });
    }
}
const getAllNotifications = async (_, res) => {
    try {
        const notifications = await Notification.findAll();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
}
export default { createNotification, getAllNotifications };