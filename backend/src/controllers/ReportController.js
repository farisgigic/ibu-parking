import Report from '../models/reports_model.js';
import Student from '../models/student_model.js';
const getAllReports = async (_, res) => {
    try {
        const reports = await Report.findAll({
          include: [
            {
              model: Student,
              as: 'student',
              attributes: ['email'],
            },
          ],
        });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error });
        console.error('Error fetching reports:', error);
    }
};

export const createReport = async (req, res) => {
  try {
    const { category, title, description, priority, studentId } = req.body;

    if (!category || !title || !description || !studentId) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const picture_url = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : null;

    const report = await Report.create({
      category,
      issue_title: title,
      description,
      priority,
      student_id: studentId,
      picture_url, 
    });

    res.json({ success: true, report });

  } catch (err) {
    console.error('Error creating report:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export default { getAllReports, createReport };