import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Angabe } from './models/angabe.model';
import { Rezept } from './models/rezept.model';

@Injectable({
  providedIn: 'root'
})
export class RezeptService {

  constructor(private readonly http: HttpClient) { }

  public async queryAnlage(query: string) {
    return this.http.get<any>(`${environment.API_URL}/angabe`, {
      params: {
        q: query
      }
    }).toPromise()
  }

  public async getAll() {
    return this.http.get<Rezept[]>(`${environment.API_URL}/rezept`).toPromise();
  }

  public async create({ name, description, angaben, anleitung }: { name: string, description: string, angaben: Angabe[], anleitung: string }) {
    return this.http.post<Rezept>(`${environment.API_URL}/rezept`, {
      name,
      description,
      anleitung,
      angaben
    }).toPromise()
  }

  public async delete(id: string) {
    return this.http.delete(`${environment.API_URL}/rezept/${id}`).toPromise();
  }

  public async update({ name, description, id }: Rezept) {
    return this.http.put(`${environment.API_URL}/rezept/${id}`, {
      name,
      description
    }).toPromise();
  }

  public async getOne(id: string) {
    return this.http.get<Rezept>(`${environment.API_URL}/rezept/content/${id}`).toPromise();
  }
}
