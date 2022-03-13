import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Missao } from '../classes/missao';

@Injectable({
  providedIn: 'root'
})
export class MissoesServiceService {

  public missoesUrl: string;
  public missaoUrl: string;

  constructor(private http: HttpClient) { 
    this.missoesUrl = 'http://162.214.113.100:8080/api/v1/missoes';
    this.missaoUrl = 'http://162.214.113.100:8080/api/v1/missao';
  }

  public findAll(): Observable<Missao[]>{
    return this.http.get<Missao[]>(this.missoesUrl);
  }

  public findMission(missao: number): Observable<Missao>{
    return this.http.get<Missao>(this.missoesUrl+"/"+missao);
  }

  public save(missao: Missao) {
    return this.http.post<Missao>(this.missaoUrl, missao);
  }

  public update(missao: Missao) {
    return this.http.put<Missao>(this.missaoUrl, missao);
  }

  public delete(missao: number) {
    let missaoDeleteUrl: string = this.missaoUrl+"/"+missao;
    return this.http.delete<Missao>(missaoDeleteUrl);
  }
}
