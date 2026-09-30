import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountryService {
    
    private baseUrl = 'https://api.restcountries.com/countries/v5';
    private http = inject(HttpClient);

    private _regions = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',

    ];
    
    get regions(): string [] {
        return [...this._regions];
    }

   getCountriesByRegion( region: string ): Observable<Country[]> {
    if ( !region ) return of([]); 

    console.log( {region} );

    const url = `${ this.baseUrl }/region/${ region }?region=Americas`;
    return this.http.get<Country[]>(url);

   }

   getCountryByAlphaCode( alphaCode: string ): Observable<Country> {

    const url = `${ this.baseUrl }/alpha/${ alphaCode }?region=Americas`;
    return this.http.get<Country>(url);
   } 

   getCountryBorderByCodes( borders: string[]) {
    // TODO: por hacer
   }


   }

