import Student from '../models/student_model.js'; // <-- PROMENA: Uvozimo Student model

const handleGoogleLogin = async (payload) => {
    const { email, sub, given_name, family_name, hd } = payload;

    // Provera da li je studentski domen (host domain) ispravan
    if (hd !== 'stu.ibu.edu.ba') {
        throw new Error('Prijava je dozvoljena samo sa IBU studentskim nalozima.');
    }

    // Koristimo Sequelize `findOrCreate` na Student modelu
    const [student, created] = await Student.findOrCreate({
        where: { email: email },
        defaults: {
            google_id: sub,
            first_name: given_name,
            last_name: family_name,
            email: email, // osiguravamo da email bude sačuvan
            // login_count se automatski postavlja na 1 zbog defaultValue u modelu
        }
    });

    // Ako student NIJE novokreiran (created === false), znači da već postoji.
    // U tom slučaju, uvećavamo mu `login_count`.
    if (!created) {
        await student.increment('login_count');
    }

    // Vraćamo finalni objekat studenta nakon što ga ponovo učitamo sa svežim podacima
    await student.reload();
    return student;
};

export const authService = {
    handleGoogleLogin,
};