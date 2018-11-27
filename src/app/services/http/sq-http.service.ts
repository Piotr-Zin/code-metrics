import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SqHttpService {
  private apiUrl = environment.sonarQubeApiUrl;

  private getRequestColor = '#18d291';
  private getRequestBgColor = '#fff';

  constructor(private http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  get<T>(
    url: string,
    params?:
      | HttpParams
      | {
          [param: string]: string | string[];
        }
  ) {
    const headers = this.createHeaders();
    const u = this.apiUrl + url;
    return this.http.get<T>(u, { headers, params }).pipe(
      tap(r => {
        console.log(
          `%cHttp %c(GET) => ${u}`,
          'font-weight: bold',
          `color: ${this.getRequestColor}; background: ${this.getRequestBgColor}; font-weight: bold`
        );
        console.table(r);
      })
    );
  }
}
