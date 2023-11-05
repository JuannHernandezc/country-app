import {Component, OnInit} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit{

  public country ?: Country

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ( { id } ) => this.countriesService.searchCountryByAlphaCode( id )),
        tap( console.log )
      )
      .subscribe(( country ) => {
        if( !country ) return this.router.navigateByUrl('');
        return this.country = country;
      })
  }
}
