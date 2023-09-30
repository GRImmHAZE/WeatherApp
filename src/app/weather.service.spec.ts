import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { HttpClientModule } from '@angular/common/http';


describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve weather data', () => {
    const cityName = 'Pune';
    const dummyWeatherData = {
      main: { temp: 22 },
      weather: [{ description: 'Clear' }],
    };

    service.getWeather(cityName).subscribe((data) => {
      expect(data).toEqual(dummyWeatherData);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes(service['apiUrl'])
    );

    expect(req.request.method).toBe('GET');

    req.flush(dummyWeatherData);
  });
});
