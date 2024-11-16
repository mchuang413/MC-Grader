import express from 'express';
import cors from 'cors'
import gradeRouter from './routes/grade.js'; 
import dotenv from 'dotenv';
import path from 'path';

const app = express();

const __dirname = import.meta.dirname;  //thank you stack overflow

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

dotenv.config();
app.use(cors());

app.use('/grade', gradeRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Backend started on http://localhost:${port}`);
});