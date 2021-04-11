export interface IHotelCard {
    hotelId: number;
    details: {
        name: string,
        imageUrl: string,
        starRatedHotel: boolean,
        starCategory: number,
        userRating: number,
        pricePerNight: number,
        facilities: string[],
        mmtAssured: boolean
    }
}

export interface ILocationWiseHotel {
    locationDetails: {
        name: string,
        country: string
    },
    hotels: IHotelCard
}

export interface ICheckBox {
    isChecked: boolean;
    name: string;
    displayName: string;
}

export interface IBookingDetails {
    customerName: string;
    hotelName: string;
    amount: number;
    comments: string;
    checkIn: Date;
    checkOut: Date;
}