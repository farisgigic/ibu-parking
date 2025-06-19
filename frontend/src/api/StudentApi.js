import { API } from './Api';
export const studentApi = {
    getAllStudents: async () => {
        try {
            const response = await API.get('/students/all');
            return response.data;
        } catch (error) {
            console.error('Error fetching students:', error);
            throw error;
        }
    },
    getStudentById: async (id) => {
        try {
            const response = await API.get(`/students/student/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching student with ID ${id}:`, error);
            throw error;
        }
    },
    createStudent: async (studentData) => {
        try {
            const response = await API.post('/students', studentData);
            return response.data;
        } catch (error) {
            console.error('Error creating student:', error);
            throw error;
        }
    },
    getStudentByEmail: async (email) => {
        try {
            const response = await API.get(`/students/email/${email}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching student with email ${email}:`, error);
            throw error;
        }
    },
};
export default studentApi;