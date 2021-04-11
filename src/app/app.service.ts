import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBookingDetails, IHotelCard } from './hotel-card/hotel-card.interface';

@Injectable()
export class AppService {

  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  makeBooking(hotel: IHotelCard) {
    this.messageSource.next(hotel);
  }

  makeMultipleBookings(bookings: IBookingDetails[]) {
    this.messageSource.next(bookings);
  }

}