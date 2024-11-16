import express from 'express';
import fileUpload from 'express-fileupload';
import {autograde} from '../utils/ai.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();
router.use(fileUpload());

const __dirname = import.meta.dirname;
router.post('/', async (req, res) => {
    const {lab} = req.body;
    const file = req.files.doc;

    console.log('File received:', file.name);
    console.log('Lab recieved:', lab);

    const text = file.data.toString();
    const answer = await autograde(text, lab);
    console.log(answer);
    res.json(answer);
});

router.get('/labs', async (req, res) => {
    const labsDir = path.join(__dirname, '..', 'labs');
    const files = fs.readdirSync(labsDir);
    const labNames = [];
    for(const file of files){
        labNames.push(path.parse(file).name); //Remove .txt extension
    }
    res.send(labNames);
})


export default router;