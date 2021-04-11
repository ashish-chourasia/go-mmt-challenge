import {
  Component,
  OnInit,
  HostListener,
  Inject,
  OnDestroy,
} from '@angular/core';
import {
  IBookingDetails,
  ICheckBox,
  IHotelCard,
  ILocationWiseHotel,
} from '../hotel-card/hotel-card.interface';
import { HotelService } from '../hotel-card/hotel-service.component';
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
declare var $: any; // Declaring $ as a variable so that we can use it to access jQuery
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
@Component({
  selector: 'app-guest-page',
  templateUrl: './guest-page.component.html',
  styleUrls: ['./guest-page.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate(300)]),
      transition(':leave', [animate(500)]),
    ]),
  ],
})
export class GuestPageComponent implements OnInit, OnDestroy {
  title = 'mmt-app';
  checked = false;
  indeterminate = false;

  public locationWiseData: ILocationWiseHotel;
  public popularFilters: ICheckBox[] = [];
  public starFilters: ICheckBox[] = [];
  public priceRange: number = 0;
  public hotels: IHotelCard[] = [];
  public filteredHotels: IHotelCard[] = [];
  public selectedHotel: IHotelCard;

  public totalCount: number;
  public filteredCount: number;

  public totalAmount: number;
  public validationErrorMsg: string = "";
  public validationSuccessMsg: string = "";

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  public startDate: Date;
  public endDate: Date;
  public minDate: Date;
  public maxDate: Date;

  public name: string = "Ashish Chourasia";
  public comments: string = "I'm planning a travel with family";

  // Subscription
  message: string;
  subscription: Subscription;

  // Booking
  public bookingList: IBookingDetails[] = [];
  public booking: IBookingDetails;

  constructor(
    private hotelService: HotelService,
    private data: AppService,
    @Inject(DOCUMENT) document,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getHotels();
    this.initializeCheckboxes();
    this.subscription = this.data.currentMessage.subscribe(
      (message) => (this.message = message)
    );

    this.resetForm();
  }

  ngOnDestroy() {}

  public endDateChange() {
    // if (this.startDate !== null && this.endDate !== null) {
    //   const numOfDays = this.calculateDiff(this.startDate, this.endDate);
    //   this.totalAmount = this.selectedHotel.details.pricePerNight * numOfDays;
    // }
    const checkin = this.booking.checkIn;
    const checkOut = this.booking.checkOut;
    if (checkin !== null && checkOut !== null) {
      const numOfDays = this.calculateDiff(checkin, checkOut);
      this.booking.amount = this.selectedHotel.details.pricePerNight * numOfDays;
      // this.totalAmount = this.selectedHotel.details.pricePerNight * numOfDays;
    }
  }

  public formSubmit() {
    this.booking.hotelName = this.selectedHotel.details.name;
    if (this.validateBooking(this.booking)) {
      this.bookingList.push(this.booking);
      // Calls service method
      this.data.makeMultipleBookings(this.bookingList);
    }
  }

  public calculateDiff(start: Date, end: Date) {
    let currentDate = end;
    let dateSent = start;

    return Math.floor(
      (Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ) -
        Date.UTC(
          dateSent.getFullYear(),
          dateSent.getMonth(),
          dateSent.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
  }

  public validateBooking(booking: IBookingDetails) : boolean {
    this.resetValidationMsg();
    if (booking.customerName === "") {
      this.validationErrorMsg = "Please enter the customer name";
      return false;
    }
    if (booking.checkIn === null || booking.checkOut === null) {
      this.validationErrorMsg = "Please enter dates of your booking";
      return false;
    }
    
    this.validationSuccessMsg = "Booking successful!";
    return true;
  }

  public resetValidationMsg() {
    this.validationErrorMsg = "";
    this.validationSuccessMsg = "";
  }

  public resetForm() {
   this.booking= {
      amount: 0,
      checkIn: undefined,
      checkOut: undefined,
      comments: "",
      customerName: "",
      hotelName: ""
    };
    this.resetValidationMsg();
  }

  public getHotels() {
    this.hotelService.getHotelData().subscribe((data: IHotelCard[]) => {
      this.hotels = data;
      this.totalCount = data.length;
      this.filteredCount = data.length;
    });
  }

  public goToHome() {
    this.router.navigateByUrl('');
  }

  public initializePopularFilters() {
    this.popularFilters = [
      {
        name: 'free-cancellation',
        isChecked: false,
        displayName: 'Free Cancellation',
      },
      {
        name: 'free-breakfast',
        isChecked: false,
        displayName: 'Free Breakfast',
      },
      {
        name: 'couple-friendly',
        isChecked: false,
        displayName: 'Couple Friendly',
      },
    ];
  }

  public initializeStarFilters() {
    this.starFilters = [
      { name: 'unrated', isChecked: false, displayName: 'Unrated' },
      { name: 'one-star', isChecked: false, displayName: '1 Star' },
      { name: 'two-star', isChecked: false, displayName: '2 Star' },
      { name: 'three-star', isChecked: false, displayName: '3 Star' },
      { name: 'four-star', isChecked: false, displayName: '4 Star' },
      { name: 'five-star', isChecked: false, displayName: '5 Star' },
    ];
  }

  public initializeCheckboxes() {
    this.initializePopularFilters();
    this.initializeStarFilters();
  }

  public onSelectHotel(hotel: IHotelCard) {
    this.selectedHotel = hotel;
  }

  public onRangeChange(value: number) {
    this.priceRange = value;
  }

  public onCheckBoxToggle(filter: ICheckBox, filterType: string) {
    // this.filterData(filter, filterType);
    console.log('Inside onCheckBoxToggle: ' + JSON.stringify(filter));
  }

  public filterData(filter: ICheckBox, filterType: string) {
    // this.getHotels();
    this.filteredHotels = [];

    switch (filterType) {
      case 'popularFilter':
        this.hotels = this.hotels.filter((hotel) =>
          hotel.details.facilities.forEach((facility) => {
            facility === filter.name;
          })
        );
        break;

      case 'starCategory':
        break;
      default:
        break;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 550) {
      let element = document.getElementById('navbar');
      element.classList.add('sticky');
    } else {
      let element = document.getElementById('navbar');
      element.classList.remove('sticky');
    }
  }
}
