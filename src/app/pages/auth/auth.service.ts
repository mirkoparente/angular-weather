import { IAccessData } from './interfaces/access-data';
import { HttpClient } from '@angular/common/http';
import { IRegister } from './interfaces/register';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from './interfaces/login';
import { BehaviorSubject, map, tap } from 'rxjs';
import { IUser } from './interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'http://localhost:3000';
  registerUrl: string = this.apiUrl + '/register';
  loginUrl: string = this.apiUrl + '/login';

  private authSubject = new BehaviorSubject<null | IAccessData>(null); //null è il valore di default, quindi si parte con utente non loggato
  user$ = this.authSubject.asObservable(); //contiene dati sull'utente se è loggato
  isLoggedIn$ = this.user$.pipe(map((user) => !!user)); //serve per la verifica, capta la presenza(o meno) dello user e mi restituisce un bool (false se il subject riceve null)

  autoLogoutTimer: any; //riferimento al timer che slogga l'utente quando il jwt è scaduto

  constructor(
    private http: HttpClient, //per le chiamate http
    private router: Router //per i redirect
  ) {}

  login(data: ILogin) {
    return this.http.post<IAccessData>(this.loginUrl, data).pipe(
      tap((data) => {
        this.authSubject.next(data); //invio lo user al subject
        localStorage.setItem('accessData', JSON.stringify(data)); //salvo lo user per poterlo recuperare se si ricarica la pagina
      })
    );
  }

  logout() {
    this.authSubject.next(null); //comunico al behaviorsubject che il valore da propagare è null
    localStorage.removeItem('accessData'); //elimino i dati salvati in localstorage
    this.router.navigate(['/login']); //redirect al login
  }

  signUp(data: IRegister) {
    return this.http.post<IAccessData>(this.registerUrl, data);
  }


  getUser(){
    return this.http.get<IAccessData>(this.apiUrl + '/users');
  }
}
