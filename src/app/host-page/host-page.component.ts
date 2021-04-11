import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { IHotelCard } from '../hotel-card/hotel-card.interface';

@Component({
  selector: 'app-host-page',
  templateUrl: './host-page.component.html',
  styleUrls: ['./host-page.component.scss'],
})
export class HostPageComponent implements OnInit {
  bookings: IHotelCard[] = [];
  subscription: Subscription;
  constructor(private router: Router, private data: AppService) {}

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe((hotelBookings: IHotelCard[]) => {
      this.bookings = hotelBookings;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  public goToHome() {
    this.router.navigateByUrl('');
  }

  public onAcceptClick(index: number) {
    this.bookings.splice(index, 1);
  }
  public onRejectClick(index: number) {
    this.bookings.splice(index, 1);
  }
}
