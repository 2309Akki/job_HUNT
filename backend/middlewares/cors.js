 export const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',  // Allow your frontend
    credentials: true,                // Allow cookies & auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']
}));
