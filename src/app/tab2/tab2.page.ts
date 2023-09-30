import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  cityName: string = 'Mumbai'; // Replace with the desired city name
  weatherForecast: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ionViewDidEnter() {
    this.getWeatherForecast();
  }

  getWeatherForecast() {
    this.weatherService.getWeatherForecast(this.cityName).subscribe(
      (data: any) => {
        if (data.list && data.list.length > 0) {
          this.weatherForecast = data.list.map((item: any) => {
            return {
              date: new Date(item.dt * 1000),
              temperature: item.main.temp,
              description: item.weather[0].description,
              icon: item.weather[0].icon,
            };
          });
        }
      },
      (error) => {
        console.error('Error fetching weather forecast data:', error);
      }
    );
  }
}
