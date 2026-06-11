import express from 'express';
import path from 'path';
import { generateQuestions } from './questions';

const app = express();
const PORT = 5001;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/questions', (req, res) => {
  const countParam = req.query.count;
  let count = 50;
  if (countParam) {
    const parsed = parseInt(countParam as string, 10);
    if ([20, 50, 100].includes(parsed)) {
      count = parsed;
    }
  }
  const questions = generateQuestions(count);
  res.json({ questions, total: count });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Game server running at http://localhost:${PORT}`);
});
