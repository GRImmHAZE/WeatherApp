import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  cityName: string = '';
  weatherData: any;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) { }

  searchWeather() {
    this.errorMessage = ''; // Reset error message on new request

    this.weatherService.getWeather(this.cityName).subscribe(
      (data: any) => {
        this.weatherData = {
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        };
      },
      (error) => {
        this.errorMessage = error;
        console.error('Error fetching weather data:', error);
      }
    );
  }

}
