import Administrator from "../models/admininstrator_model";

const getAllAdministrators = async (_, res) => {
    try {
        console.log("GET /administrators called");
        const administrators = await Administrator.findAll();
        res.status(200).json(administrators);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching administrators', error });
    }
}

export default { getAllAdministrators };