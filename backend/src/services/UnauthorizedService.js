import Unauthorized from '../models/unauthorized_model.js';

export const logUnauthorizedAttempt = async (email) => {
    return await Unauthorized.create({ email });
};
