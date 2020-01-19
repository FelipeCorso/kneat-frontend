import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Starship} from '../../starships/starship-dto';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getStarShips(): Observable<Array<Starship>> {
    return this.http.get<Array<Starship>>(`${environment.starWars.api}/starships`);
  }

  getStarShipById(id: number): Observable<Starship> {
    return this.http.get<Starship>(`${environment.starWars.api}/starships/${id}`);
  }
}
