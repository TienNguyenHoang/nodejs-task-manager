import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/index.js';
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use('/api', routes);

// middleware cho route không tồn tại
app.use(notFoundMiddleware);

app.use(errorMiddleware);

connectDB();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
