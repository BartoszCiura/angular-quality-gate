import {Injectable} from '@angular/core';
import {SightseeingPoint} from '../models/sightseeing-point';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Country} from '../models/country';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SightsService {

  selectedSight: SightseeingPoint;

  constructor(private http: HttpClient) {
  }

  getSights(): Observable<SightseeingPoint[]> {
    return this.http.get<SightseeingPoint[]>(`${environment.apiUrl}/sights`).pipe(
      map(sights => {
        return sights.map(sight => {
          const country = new Country(
            sight.country.name,
            sight.country.iataCode
          );

          return new SightseeingPoint(
            sight.name,
            sight.longitude,
            sight.latitude,
            country,
            sight.description,
            sight.color,
            sight.id
          );
        });
      }),
    );
  }
}
