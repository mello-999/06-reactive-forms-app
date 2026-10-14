import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Country, CountryObject } from '../interfaces/country.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CountryService {

  private baseUrl = 'https://api.restcountries.com/countries/v5';
  private http = inject(HttpClient);

  private headers = new HttpHeaders({
    Authorization: `Bearer ${environment.apiKey}`
  });

  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<CountryObject[]> {
    if (!region) return of([]);

    const url =
      `${this.baseUrl}?region=${encodeURIComponent(region)}` +
      '&response_fields=names,codes.alpha_3,borders&limit=100';

    return this.http
    .get<Country>(url,{ headers: this.headers })
    .pipe(
        map(response => response.data.objects)
    );
      
    
  }
    


  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url =
      `${this.baseUrl}/codes.alpha_3/${encodeURIComponent(alphaCode)}`;

    return this.http.get<Country>(url, {
      headers: this.headers
    });
  }

  getCountryBorderByCodes(borders: string[]) {
    // TODO: por hacer
  }
}