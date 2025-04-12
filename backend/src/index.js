import config from "/src/config/config";
import sequelize from "/src/config/sequelize";
import app from "./express.js";
import dotenv from "dotenv";
dotenv.config();


const port1= process.env.PORT || 8787;
try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
} catch (err) {
    console.error('Unable to connect to the database:', err);  
}



app.listen(port1, err => {
    if ("this is error message", err) {
        console.error(err);
    } else {
        console.log(`Server is running on port ${port1}`);
    }
});