import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StarshipsComponent} from './starships.component';
import {StarWarsService} from '../shared/services/star-wars.service';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

describe('StarshipsComponent', () => {
  let component: StarshipsComponent;
  let fixture: ComponentFixture<StarshipsComponent>;
  let starWarsService: StarWarsService;
  let spy: any;
  const yWingData = {
    results: [{
      consumables: '1 week',
      MGLT: '80',
    }]
  };
  const millenniumFalconData = {
    results: [{
      consumables: '2 months',
      MGLT: '75',
    }]
  };
  const rebelTransportData = {
    results: [{
      consumables: '6 months',
      MGLT: '20',
    }]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StarshipsComponent],
      providers: [
        StarWarsService,
        HttpClient
      ],
      imports: [
        NgZorroAntdModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipsComponent);
    component = fixture.componentInstance;
    starWarsService = TestBed.get(StarWarsService);
    fixture.detectChanges();
  });

  afterEach(() => {
    starWarsService = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Given a 1000000 MGLT, the amount of stops required for Y-wing should be 74', () => {
    spy = spyOn(starWarsService, 'getStarships').and.returnValue(of(yWingData));
    component.form.get('distance').setValue(1000000);
    component.findStopsRequired();
    expect(component.form.get('results').value[0]).toBe(74);
  });

  it('Given a 1000000 MGLT, the amount of stops required for Millennium Falcon should be 9', () => {
    spy = spyOn(starWarsService, 'getStarships').and.returnValue(of(millenniumFalconData));
    component.form.get('distance').setValue(1000000);
    component.findStopsRequired();
    expect(component.form.get('results').value[0]).toBe(9);
  });

  it('Given a 1000000 MGLT, the amount of stops required for Rebel Transport should be 11', () => {
    spy = spyOn(starWarsService, 'getStarships').and.returnValue(of(rebelTransportData));
    component.form.get('distance').setValue(1000000);
    component.findStopsRequired();
    expect(component.form.get('results').value[0]).toBe(11);
  });
});
