import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empty, City, List, Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  city!:string
  country!:string
  date:number=new Date().getTime()
  icon!:string
  apikey='83cb0202e5429db59ca13ca862b10df3'
  constructor(
    private http: HttpClient
  ) { }


  getWeather(city:string):Observable<List>{
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${this.country}&appid=${this.apikey}&units=metric&lang=it&dt=${this.date}`) as Observable<List>;
  }

  // getIcon(icon:string):Observable<Weather>{
  //   return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${this.apikey}&units=metric&lang=it&dt=${this.date}`) as Observable<Weather>;
  // }
}
