const mongoose = require("mongoose");

const isConnected = () => {
return mongoose.connection.readyState === 1;
};

const connectDB = async () => {
if (isConnected()) return;

mongoose.connection.on("connected", () => {
    console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
    console.log("DB error: ", err);
});
mongoose.connection.on("disconnected", () => {
    console.log("DB disconnected");
});
try {
    await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
} catch (err) {
    console.error(err.message);
    process.exit(1);
}
};

module.exports = connectDB;
