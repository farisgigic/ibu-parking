import { API } from './Api';

export const ratingsApi = {
    getAllRatings: async () => {
        try {
            const response = await API.get('/ratings/all');
            return response.data;
            console.log('Fetched all ratings:', response.data);
        } catch (error) {
            console.error('Error fetching ratings:', error);
            throw error;
        }
    },
    getRatingById: async (id) => {
        try {
            const response = await API.get(`/ratings/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching rating with ID ${id}:`, error);
            throw error;
        }
    },
    createRating: async (ratingData) => {
        try {
            const response = await API.post('/ratings', ratingData);
            return response.data;
        } catch (error) {
            console.error('Error creating rating:', error);
            throw error;
        }
    }
};   
export default ratingsApi;