import dayjs, { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';

dotenv.config();

interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

class Weather {
  constructor(
    public city: string,
    public date: Dayjs | string,
    public tempF: number,
    public windSpeed: number,
    public humidity: number,
    public icon: string,
    public iconDescription: string
  ) {}
}

class WeatherService {
  private readonly baseURL = process.env.API_BASE_URL || '';
  private readonly apiKey = process.env.API_KEY || '';
  private city: string = '';

  private async fetchData<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  private validateAPIConfig() {
    if (!this.baseURL || !this.apiKey) {
      throw new Error('API base URL or API key is missing');
    }
  }

  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`;
  }

  private buildWeatherQuery({ lat, lon }: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${this.apiKey}`;
  }

  private parseLocationData(locationData: Coordinates): Coordinates {
    if (!locationData) {
      throw new Error('City not found');
    }

    const { name, lat, lon, country, state } = locationData;
    return { name, lat, lon, country, state };
  }

  private parseCurrentWeather(data: any): Weather {
    return new Weather(
      this.city,
      dayjs.unix(data.dt).format('M/D/YYYY'),
      data.main.temp,
      data.wind.speed,
      data.main.humidity,
      data.weather[0].icon,
      data.weather[0].description || data.weather[0].main
    );
  }

  private buildForecast(data: any[]): Weather[] {
    const forecast: Weather[] = [];
    const middayData = data.filter((entry) => entry.dt_txt.includes('12:00:00'));

    for (const day of middayData) {
      forecast.push(
        new Weather(
          this.city,
          dayjs.unix(day.dt).format('M/D/YYYY'),
          day.main.temp,
          day.wind.speed,
          day.main.humidity,
          day.weather[0].icon,
          day.weather[0].description || day.weather[0].main
        )
      );
    }

    return forecast;
  }

  async getWeatherForCity(city: string): Promise<Weather[]> {
    try {
      this.city = city;
      this.validateAPIConfig();

      const geocodeQuery = this.buildGeocodeQuery();
      const locationData = await this.fetchData<Coordinates[]>(geocodeQuery);
      const coordinates = this.parseLocationData(locationData[0]);

      const weatherQuery = this.buildWeatherQuery(coordinates);
      const weatherData = await this.fetchData<any>(weatherQuery);

      const currentWeather = this.parseCurrentWeather(weatherData.list[0]);
      return [currentWeather, ...this.buildForecast(weatherData.list)];
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
}

export default new WeatherService();