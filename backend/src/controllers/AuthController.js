import { authService } from '../services/AuthService.js';

const googleLoginCallback = async (req, res) => {
    try {
        const googlePayload = req.body;

        // Servis sada vraća objekat studenta
        const student = await authService.handleGoogleLogin(googlePayload);

        // Ovde generišete JWT token kao i pre, ali sada sa podacima studenta
        // const token = generateJwtToken(student);

        res.status(200).json({
            message: "Student uspešno prijavljen.",
            student: student, // <-- PROMENA: Šaljemo student objekat
            // token: token
        });

    } catch (error) {
        console.error("Greška prilikom Google prijave:", error);
        // Šaljemo specifičnu grešku ako je prijava sa pogrešnog domena
        if (error.message.includes('dozvoljena samo sa IBU')) {
            return res.status(403).json({ message: error.message }); // 403 Forbidden
        }
        res.status(500).json({ message: "Došlo je do greške na serveru." });
    }
};

export const authCtrl = {
    googleLoginCallback,
};