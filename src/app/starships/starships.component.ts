import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StarWarsService} from '../shared/services/star-wars.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Starship, StarshipResponse} from './starship-dto';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  pageIndex = 1;

  private defaultDistance = 1000000;

  constructor(
    private formBuilder: FormBuilder,
    private starWarsService: StarWarsService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      distance: this.formBuilder.control(this.defaultDistance),
      count: this.formBuilder.control(null),
      next: this.formBuilder.control(null),
      previous: this.formBuilder.control(null),
      results: this.formBuilder.control([])
    });

    this.loadData(true);
  }

  ngOnDestroy(): void {

  }

  /**
   * This method is fired when the button to find the stops required is clicked.
   * The routine reset the page index calling the function onPageChanged, passing as a parameter the value 1 (first page).
   */
  findStopsRequired(): void {
    this.onPageChanged(1);
  }

  /**
   * This method is responsible for reload the data when the page is changed.
   * @param $event The new page index.
   */
  onPageChanged($event: number): void {
    this.pageIndex = $event;
    this.loadData(this.form.get('distance').value > 0);
  }

  private loadData(calcStopsRequired?: boolean): void {
    this.starWarsService.getStarships(this.pageIndex)
      .pipe(untilDestroyed(this))
      .subscribe((starships: StarshipResponse) => {
        this.form.patchValue({...starships});
        if (calcStopsRequired) {
          this.form.get('results').setValue(
            starships.results.map((starship: Starship) => {
              starship.stopsRequired = this.getStopsRequired(starship);
              return starship;
            })
          );
        }
      })
    ;
  }

  private getStopsRequired(starship: Starship): number {
    // Only calculate the stops required if there is a value informed to the starship.
    if (starship.consumables) {
      const consumables = starship.consumables.split(' ');
      const amountOfTime: number = parseInt(consumables[0], 10);
      const period: Period = Period[consumables[1].toUpperCase()];

      // There is not pattern for the period of consumables.
      // Then it is necessary to convert the data in a common unit.
      // It was used hour because of the MGLT.
      const stopsRequired: number = (this.form.get('distance').value as number) /
        (parseInt(starship.MGLT, 10) * (this.getAmountOfHoursInPeriod(period) * amountOfTime));

      // Returns only the integer part
      return Math.trunc(stopsRequired);
    }

    return 0;
  }

  private getAmountOfHoursInPeriod(period: Period): number {
    const amountOfHoursPerDay = 24;

    switch (period) {
      case Period.DAY:
      case Period.DAYS:
        return amountOfHoursPerDay;
      case Period.WEEK:
      case Period.WEEKS:
        return amountOfHoursPerDay * 7;
      case Period.MONTH:
      case Period.MONTHS:
        return amountOfHoursPerDay * 30;
      case Period.YEAR:
      case Period.YEARS:
        return amountOfHoursPerDay * 365;
    }
  }
}

enum Period {
  DAY = 'DAY',
  DAYS = 'DAYS',
  WEEK = 'WEEK',
  WEEKS = 'WEEKS',
  MONTH = 'MONTH',
  MONTHS = 'MONTHS',
  YEAR = 'YEAR',
  YEARS = 'YEARS'
}
