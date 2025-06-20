import { API } from './Api';

export const reportsApi = {
    getAllReports: async () => {
        try {
            const response = await API.get('/reports/all-reports');
            return response.data;
        } catch (error) {
            console.error('Error fetching reports:', error);
            throw error;
        }
    },

    createReport: async (reportData) => {
        try {
            const response = await API.post('/reports/create-report', reportData);
            return response.data;
        } catch (error) {
            console.error('Error creating report:', error);
            throw error;
        }
    }
};
export default reportsApi;