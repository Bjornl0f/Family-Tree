import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import peopleRoute from './routes/peopleRoute.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
app.use(cors({
    origin: 'http://localhost:5173', // replace with your actual front-end domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true, // enable credentials (cookies, authorization headers, etc.)
  }));

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Family Tree');
});

app.use('/people', peopleRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });