const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const authRouter = require('./routes/authRoute')

// 1) MIDDLEWARE
app.use(cors());
app.use(express.json());

// 2) ROUTE
app.use('/api/auth', authRouter);

// 3) MONGO DB CONNECTION
mongoose.connect('mongodb+srv://pasimred05:54GmEDzYnUJY8z2I@authenticationapp.qkrxo.mongodb.net/?retryWrites=true&w=majority&appName=AuthenticationApp')
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB: ', error));

// 4) GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status, // fixed the typo from 'ststus' to 'status'
        message: err.message,
    });
});

// 5) SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})

