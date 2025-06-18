import Student from '../models/student_model.js'; 
import Administrator from '../models/admininstrator_model.js';
const handleGoogleLogin = async (payload) => {
    const { email, sub, given_name, family_name, hd, picture } = payload;
    const admin = Administrator.findOne({ where: { email } });

    if (hd !== 'stu.ibu.edu.ba' && !admin) {
        throw new Error('Prijava je dozvoljena samo sa IBU studentskim nalozima.');
    }
    // console.log(picture);
    // Koristimo Sequelize `findOrCreate` na Student modelu
    const [student, created] = await Student.findOrCreate({
        where: { email: email },
        defaults: {
            google_id: sub,
            first_name: given_name,
            last_name: family_name,
            email: email, 
            picture_url: picture,
            role: 'student',
        }
    });

    // Ako student NIJE novokreiran (created === false), znači da već postoji.
    // U tom slučaju, uvećavamo mu `login_count`.
    if (!created) {
        await student.increment('login_count');
    }

    await student.reload();
    return student;
};

export const authService = {
    handleGoogleLogin,
};