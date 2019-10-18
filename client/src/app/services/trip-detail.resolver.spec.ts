import { ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Trip } from '../services/trip.service';
import { TripDetailResolver } from './trip-detail.resolver';
import { TripFactory } from '../testing/factories';

describe('TripDetailResolver', () => {
  it('should resolve a trip', () => {
    const tripMock: Trip = TripFactory.create();
    const tripServiceMock: any = {
      getTrip: (id: string): Observable<Trip> => {
        return new Observable<Trip>(observer => {
          observer.next(tripMock);
          observer.complete();
        });
      }
    };
    const tripDetailResolver: TripDetailResolver = new TripDetailResolver(tripServiceMock);
    const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    route.params = {id: tripMock.id};
    tripDetailResolver.resolve(route, null).subscribe(trip => {
      expect(trip).toBe(tripMock);
    });
  });
});
