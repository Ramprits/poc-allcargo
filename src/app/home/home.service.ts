import { Schedule, Country } from './schedule.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getSchedules(from = 'BE', to = 'SG'): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`/schedules?from=${from}&to=${to}`);
  }
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`/codes/countries`);
  }
}
