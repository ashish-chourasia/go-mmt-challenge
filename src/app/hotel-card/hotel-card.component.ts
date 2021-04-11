import { Component, Input, OnInit } from '@angular/core';
import { IHotelCard } from './hotel-card.interface';
import { HotelService } from './hotel-service.component';

@Component({
  selector: 'hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {
  @Input() cardData: IHotelCard;
  public card: IHotelCard;
  
  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    if (this.cardData) {
      this.card = this.cardData;
    }
  }
}
