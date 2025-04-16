import express, { Response, Request } from 'express';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";
import DiaryService from '../services/diaryService';
import { newDiaryParser, errorMiddleware } from '../middlewares/middlewares';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(DiaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res: Response<NonSensitiveDiaryEntry>) => {
  const diary = DiaryService.findById(+req.params.id);
  if (diary){
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});


router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
  
  const addedEntry = DiaryService.addDiary(req.body);

  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;