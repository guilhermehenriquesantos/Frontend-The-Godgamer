import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fase } from '../classes/fase';

@Injectable({
  providedIn: 'root'
})
export class FasesService {

  private fasesUrl: string;
  private faseUrl: string;

  constructor(private http: HttpClient) { 
    this.fasesUrl = 'http://162.214.113.100:8080/api/v1/fases';
    this.faseUrl = 'http://162.214.113.100:8080/api/v1/fase';
  }

  public findAll(): Observable<Fase[]>{
    return this.http.get<Fase[]>(this.fasesUrl);
  }

  public findPhase(fase: number): Observable<Fase>{
    return this.http.get<Fase>(this.fasesUrl+"/"+fase);
  }

  public save(fase: Fase) {
    return this.http.post<Fase>(this.faseUrl, fase);
  }

  public update(fase: Fase) {
    return this.http.put<Fase>(this.faseUrl, fase);
  }

  public delete(fase: number) {
    let faseDeleteUrl: string = this.faseUrl+"/"+fase;
    return this.http.delete<Fase>(faseDeleteUrl);
  }
}
