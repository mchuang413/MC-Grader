import express from 'express';
import fileUpload from 'express-fileupload';
import {autograde} from '../utils/ai.js';

const router = express.Router();
router.use(fileUpload());

router.post('/grade', async (req, res) => {
    const file = req.files.doc;
    console.log('File received:', file.name);
    const text = file.data.toString();
    const answer = await autograde(text);
    console.log(answer);
    res.send(answer);
});



export default router;
