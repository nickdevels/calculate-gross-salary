import Express from 'express';
import config from './config';
import { calculateNetSalary } from './tax';

const app = Express();

app.use(Express.json());

app.post('/api/calculate-tax', (req, res) => {
  const grossSalary = Number(req.body.grossSalary);
  if (Number.isNaN(grossSalary) || grossSalary < 0) {
    return res.status(400).json({
      error: 'grossSalary has to be positive number',
    });
  }
  const result = calculateNetSalary(grossSalary);
  return res.json(result);
});

app.listen(config.PORT);
