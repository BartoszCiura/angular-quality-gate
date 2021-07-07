import {Injectable} from '@angular/core';
import {SightseeingPoint} from '../../../models/sightseeing-point';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SightDetailService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getSightseeingPoint(id: string): Observable<SightseeingPoint> {
    return this.http.get<SightseeingPoint>(`${environment.apiUrl}/sights/${id}`);
  }


  addSightseeingPointToJSON(sight: SightseeingPoint): Observable<SightseeingPoint> {
    return this.http.post<SightseeingPoint>(`${environment.apiUrl}/sights`, sight, this.httpOptions);
  }

  editSightseeingPoint(id: string, value: SightseeingPoint): Observable<any> {
    return this.http.put(`${environment.apiUrl}/sights/${id}`, value, this.httpOptions);
  }
}


