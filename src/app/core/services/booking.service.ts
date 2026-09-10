import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Booking } from '../models/booking.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    private apiUrl = `${environment.apiUrl}/bookings`;

    // private apiUrl =
    //     'http://localhost:5000/api/bookings';

    constructor(
        private http: HttpClient
    ) { }

    getBookings() {

        return this.http.get<{
            success: boolean;
            data: Booking[];
        }>(this.apiUrl);

    }

    createBooking(booking: Booking) {

        return this.http.post(
            this.apiUrl,
            booking
        );

    }

    cancelBooking(id: number) {

        return this.http.put(
            `${this.apiUrl}/${id}/cancel`,
            {}
        );

    }

}