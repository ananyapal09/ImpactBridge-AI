const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.MONGO_URI);

const connectDB = require("./src/config/db");
const app = require("./src/app");

// Connect Database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});