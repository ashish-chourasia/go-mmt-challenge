import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHotelCard } from './hotel-card.interface';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private dataURL =
    'https://60715f1d50aaea001728489a.mockapi.io/hotels/goa';

  private dataUrl2 = 'https://60715f1d50aaea001728489a.mockapi.io/hotels/hoteldata';

  private hotels: IHotelCard[] = [];

  constructor(private http: HttpClient) {
  }

  public getHotelData() {
    return this.http.get(this.dataUrl2);
  }

  // 
  // public getHotelFetchedData() {
  //   console.log("Inside getHotelFetchedData()"+this.hotels);
  //   return this.hotels;
  // }

  public getHotelDataObservable() : Observable<IHotelCard[]> {
    return this.http.get<IHotelCard[]>(this.dataUrl2);
  }

  // public saveHotel(hotel: IHotelCard) {
  //   this.hotels.push(hotel);
  // }
}
