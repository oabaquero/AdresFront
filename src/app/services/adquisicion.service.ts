import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Adquisicion } from "../interfaces/adquisicion";
import { environment } from "../../environments/environment";
import { Historico } from "../interfaces/historico";

@Injectable({
  providedIn: "root",
})
export class AdquisicionService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint + "api/adquisicion/";
  constructor(private http: HttpClient) {}

  getList(): Observable<Adquisicion[]> {
    return this.http.get<Adquisicion[]>(`${this.apiUrl}`);
  }

  add(model: Adquisicion): Observable<Adquisicion> {
    return this.http.post<Adquisicion>(`${this.apiUrl}`, model);
  }

  update(adquisicionId: number, model: Adquisicion): Observable<Adquisicion> {
    return this.http.put<Adquisicion>(`${this.apiUrl}${adquisicionId}`, model);
  }

  delete(adquisicionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${adquisicionId}`);
  }
  getListHistorico(adquisicionId: number): Observable<Historico[]> {
    return this.http.get<Historico[]>(
      `${this.apiUrl}historico/${adquisicionId}`
    );
  }
}
