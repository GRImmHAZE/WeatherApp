import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '853e9f6f22a1fcd30f34b7ce39a3c32d'; // Replace with your OpenWeatherMap API key
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getWeather(cityName: string): Observable<any> {
    const params = {
      q: cityName,
      appid: this.apiKey,
      units: 'metric', // You can change the units to 'imperial' for Fahrenheit
    };

    return this.http.get(`${this.apiUrl}/weather`, { params }).pipe(
      catchError((error) => {
        return throwError('An error occurred while fetching weather data.');
      })
    );
  }

  getWeatherForecast(cityName: string): Observable<any> {
    const params = {
      q: cityName,
      appid: this.apiKey,
      units: 'metric', // You can change the units to 'imperial' for Fahrenheit
    };

    return this.http.get(`${this.apiUrl}/forecast`, { params }).pipe(
      catchError((error) => {
        return throwError('An error occurred while fetching weather data.');
      })
    );
  }
}
