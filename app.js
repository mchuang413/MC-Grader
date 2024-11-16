import express from 'express';
import cors from 'cors'
import gradeRouter from './routes/upload.js'; 
import dotenv from 'dotenv';
import path from 'path';

const app = express();

app.use(express.static(path.join(process.cwd(), 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

dotenv.config();
app.use(cors());

app.use('/upload', gradeRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Backend started on http://localhost:${port}`);
});