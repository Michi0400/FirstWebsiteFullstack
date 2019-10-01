import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angabe } from './models/angabe.model';
import { Rezept } from './models/rezept.model';

@Injectable({
  providedIn: 'root'
})
export class RezeptService {

  constructor(private readonly http: HttpClient) { }

  public async queryAnlage(query: string) {
    return this.http.get<any>(`http://34.89.137.75:4000/api/angabe`, {
      params: {
        q: query
      }
    }).toPromise()
  }

  public async getAll() {
    return this.http.get<Rezept[]>(`http://34.89.137.75:4000/api/rezept`).toPromise();
  }

  public async create({ name, description, angaben, anleitung }: { name: string, description: string, angaben: Angabe[], anleitung: string }) {
    return this.http.post<Rezept>(`http://34.89.137.75:4000/api/rezept`, {
      name,
      description,
      anleitung,
      angaben
    }).toPromise()
  }

  public async delete(id: string) {
    return this.http.delete(`http://34.89.137.75:4000/api/rezept/${id}`).toPromise();
  }

  public async update({ name, description, id }: Rezept) {
    return this.http.put(`http://34.89.137.75:4000/api/rezept/${id}`, {
      name,
      description
    }).toPromise();
  }

  public async getOne(id: string) {
    return this.http.get<Rezept>(`http://34.89.137.75:4000/api/rezept/content/${id}`).toPromise();
  }
}
