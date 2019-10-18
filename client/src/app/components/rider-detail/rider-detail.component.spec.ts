import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable, of } from 'rxjs';

import { TripFactory } from '../../testing/factories';
import { RiderDetailComponent } from './rider-detail.component';

describe('RiderDetailComponent', () => {
  let component: RiderDetailComponent;
  let fixture: ComponentFixture<RiderDetailComponent>;
  const trip = TripFactory.create();

  class MockActivatedRoute {
    data: Observable<Data> = of({
      trip
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ RiderDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(RiderDetailComponent);
    component = fixture.componentInstance;
  });

  it('should update data on initialization', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.trip).toEqual(trip);
    });
    component.ngOnInit();
  }));
});
