import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";


//Files

import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import genreRoutes from "./routes/GenreRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
//Configuration

dotenv.config()
connectDB()

const app = express();

//Middlewares

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const PORT = process.env.PORT || 10000

//Routes
 app.use('/api/v1/users', userRoutes);
 app.use('/api/v1/genre', genreRoutes);
 app.use('/api/v1/movies', moviesRoutes);
 app.use('/api/v1/upload', uploadRoutes);

 const __dirname = path.resolve();
 app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

 // Serve React.js static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Route all other requests to the React.js app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})