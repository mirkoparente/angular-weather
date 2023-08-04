import { City, Weather, Description } from './../../weather';
import { Component } from '@angular/core';
import { Data } from '@angular/router';
import { WeatherService } from 'src/app/weather.service';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../auth/interfaces/user';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  city!: string;
  weather!: Weather;
  dataweather: any;
  date!:number
  day:string = new Date().toDateString()
  icon!:string
  constructor(private weatherService: WeatherService,private authSvc:AuthService) {}

  logUser!:IUser

  ngOnInit(){
    this.authSvc.user$.subscribe(user=>{
      this.logUser=user?.user.nome as unknown as IUser
    })
    // this.weatherService.getIcon(this.icon).subscribe(icon=>{
    //   this.icon=this.icon
    //   console.log(icon);

    // })
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe((data) => {
      console.log(data);
      this.dataweather = data;
    });
  }
}
