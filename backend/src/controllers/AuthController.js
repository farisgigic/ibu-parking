import { authService } from '../services/AuthService.js';

const googleLoginCallback = async (req, res) => {
    try {
        const googlePayload = req.body;
        const student = await authService.handleGoogleLogin(googlePayload);

        res.status(200).json({
            message: "Student is successfully logged in.",
            student: student, 
        });

    } catch (error) {
        console.error("Error while logging.", error);
        if (error.message.includes('allowed just with IBU')) {
            return res.status(403).json({ message: error.message }); // 403 Forbidden
        }
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

export const authCtrl = {
    googleLoginCallback,
};