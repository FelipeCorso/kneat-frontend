import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StarWarsService} from '../shared/services/star-wars.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Starship} from './starship-dto';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private starWarsService: StarWarsService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      distance: this.formBuilder.control(null),
      starships: this.formBuilder.control([])
    });

    this.form.get('distance').valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((distance: number) => {
        // Only calculate the stops required if the value was informed
        this.loadData(distance > 0);
      });

    this.loadData();
  }

  private loadData(calcStopsRequired?: boolean): void {
    this.starWarsService.getStarShips()
      .pipe(untilDestroyed(this))
      .subscribe((starships: Array<Starship>) => {
        if (calcStopsRequired) {
          this.form.get('starships').setValue(
            starships.map((starship: Starship) => {
              starship.stopsRequired = this.getStopsRequired(starship);
              return starship;
            })
          );
        } else {
          this.form.get('starships').setValue(starships);
        }
      })
    ;
  }

  private getStopsRequired(starship: Starship): number {
    // Only calculate the stops required if there is a value informed to the starship.
    if (starship.consumables) {
      const consumables = starship.consumables.split(' ');
      const amountOfTime: number = parseInt(consumables[0]);
      const period: Period = Period[consumables[1].toUpperCase()];

      // There is not pattern for the period of consumables.
      // Then it is necessary to convert the data in a common unit.
      // It was used hour because of the MGLT.
      return this.form.get('distance').value /
        (starship.MGLT * (this.getAmountOfHoursInPeriod(period) * amountOfTime));
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
