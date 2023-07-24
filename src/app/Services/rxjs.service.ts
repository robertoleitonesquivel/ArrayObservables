import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {

  constructor(private http:HttpClient) { }


  public get(id:number):Observable<number>{
    return this.http.get<number>(`https://localhost:44320/WeatherForecast?id=${id}`)
  }
}
