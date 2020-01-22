import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Starship, StarshipResponse} from '../../starships/starship-dto';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getStarships(page?: number): Observable<StarshipResponse> {
    return this.http.get<StarshipResponse>(`${environment.starWars.api}/starships${page ? '/?page=' + page : ''}`);
  }

  getStarshipById(id: number): Observable<Starship> {
    return this.http.get<Starship>(`${environment.starWars.api}/starships/${id}`);
  }
}
