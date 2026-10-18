import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, map, combineLatest } from 'rxjs';
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
    


  getCountryByAlphaCode(alphaCode: string): Observable<CountryObject> {
    const url =
      `${this.baseUrl}/codes.alpha_3/${encodeURIComponent(alphaCode)}` + 
      '?response_fields=names,codes.alpha_3,borders';

    return this.http.get<Country>(url, {
      headers: this.headers
    }).pipe(
      map(response => response.data.objects[0])
    );
  }

  getCountryNamesByCodeArray(countryCodes: string[]): Observable<CountryObject[]> {
    if ( !countryCodes || countryCodes.length === 0 ) return of ([]);

    const countriesRequests: Observable<CountryObject>[] = [];

    countryCodes.forEach( code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    })

    return combineLatest(countriesRequests);


   }
  
}
