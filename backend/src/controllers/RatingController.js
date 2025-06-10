import Rating from '../models/rating_model.js';

const createRating = async (req, res) => {
    try {
        const rating = await Rating.create(req.body);
        res.status(201).json(rating);
    } catch (error) {
        res.status(500).json({ message: 'Error creating rating', error });
    }
}
const getAllRatings = async (_, res) => {
    try {
        console.log("GET /ratings called");
        const ratings = await Rating.findAll();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ratings', error });
    }
}
const getRatingById = async (req, res) => {
    try {
        const { id } = req.params;
        const rating = await Rating.findByPk(id);
        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }
        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rating', error });
    }
}
export default { createRating, getAllRatings, getRatingById };