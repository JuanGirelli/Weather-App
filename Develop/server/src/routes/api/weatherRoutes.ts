import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';




// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const { city } = req.body;


  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  // TODO: GET weather data from city name
  const weatherData = await WeatherService.getWeatherForCity(city);
  // TODO: save city to search history
  await HistoryService.addCity(city);

  return res.json(weatherData);
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  const cities = await HistoryService.getCities();
  res.json(cities);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, res) => {  // Suppress warning by renaming 'req' to '_req'
  const { id } = _req.params;

  if (!id) {
    return res.status(400).json({ error: 'City ID is required' });
  }

  await HistoryService.removeCity(id);
  return res.sendStatus(200);
});

export default router;
