import { Router } from 'express';
import type { Request, Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// POST: Retrieve weather data for a city and save to history
router.post('/', async (req: Request, res: Response) => {
  const { cityName } = req.body;

  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    await HistoryService.addCity(cityName);
    return res.json(weatherData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve weather data', details: error });
  }
});

// GET: Retrieve search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch search history', details: error });
  }
});

// DELETE: Remove a city from search history by ID
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'City ID is required' });
  }

  try {
    await HistoryService.removeCity(id);
    return res.json({ success: 'City removed from search history' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to remove city', details: error });
  }
});

export default router;