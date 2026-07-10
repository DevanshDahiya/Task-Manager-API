require("dotenv").config(); // load env vars first

const app = require("./app");
const connectToDB = require("./database/db");

const PORT = process.env.PORT || 3000;

connectToDB();

app.listen(PORT, () => {
    console.log(`Server is running to PORT ${PORT}`);
});