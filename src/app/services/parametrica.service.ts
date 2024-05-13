import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Parametrica } from "../interfaces/parametrica";

@Injectable({
  providedIn: "root",
})
export class ParametricaService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint + "api/parametrica/";
  constructor(private http: HttpClient) {}

  getListBienes(): Observable<Parametrica[]> {
    return this.http.get<Parametrica[]>(`${this.apiUrl}bienes`);
  }
  getListUnidades(): Observable<Parametrica[]> {
    return this.http.get<Parametrica[]>(`${this.apiUrl}unidades`);
  }
  getListProveedores(): Observable<Parametrica[]> {
    return this.http.get<Parametrica[]>(`${this.apiUrl}proveedores`);
  }
}
