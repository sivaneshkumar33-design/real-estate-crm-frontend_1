import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Booking } from '../core/models/booking.model';
import { Lead } from '../core/models/lead.model';
import { PropertyUnit } from '../core/models/property.model';

import { BookingService } from '../core/services/booking.service';
import { LeadService } from '../core/services/lead.service';
import { PropertyService } from '../core/services/property.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {

  bookings: Booking[] = [];

  leads: Lead[] = [];

  units: PropertyUnit[] = [];

  loading = false;

  errorMessage = '';

  successMessage = '';

  showForm = false;

  bookingForm: Booking = {
    lead_id: 0,
    unit_id: 0,
    booking_date: '',
    amount: 0
  };

  constructor(
    private bookingService: BookingService,
    private leadService: LeadService,
    private propertyService: PropertyService
  ) { }

  ngOnInit(): void {

    this.loadBookings();

    this.loadLeads();

    this.loadAvailableUnits();

  }

  loadBookings(): void {

    this.loading = true;

    this.bookingService
      .getBookings()
      .subscribe({

        next: (response) => {

          this.bookings = response.data;

          this.loading = false;

        },

        error: () => {

          this.errorMessage =
            'Failed to load bookings';

          this.loading = false;

        }

      });

  }

  loadLeads(): void {

    this.leadService
      .getLeads()
      .subscribe({

        next: (response) => {

          this.leads =
            response.data.filter(
              (lead: { status: string; }) =>
                lead.status !== 'LOST'
            );

        }

      });

  }

  loadAvailableUnits(): void {

    this.propertyService
      .getProperties()
      .subscribe({

        next: (response) => {

          const properties = response.data;

          this.units = [];

          properties.forEach(property => {

            if (!property.id) {
              return;
            }

            this.propertyService
              .getProperty(property.id!)
              .subscribe({

                next: (propertyResponse) => {

                  const available =
                    propertyResponse.data.units
                      .filter(
                        unit =>
                          unit.availability === 'AVAILABLE'
                      );

                  this.units.push(...available);

                }

              });

          });

        }

      });

  }

  openBookingForm(): void {

    this.successMessage = '';

    this.errorMessage = '';

    this.bookingForm = {
      lead_id: 0,
      unit_id: 0,
      booking_date: '',
      amount: 0
    };

    this.showForm = true;

  }

  createBooking(): void {

    if (
      !this.bookingForm.lead_id ||
      !this.bookingForm.unit_id ||
      !this.bookingForm.booking_date
    ) {

      this.errorMessage =
        'Please fill all required fields';

      return;

    }

    this.loading = true;

    this.errorMessage = '';

    this.bookingService
      .createBooking(this.bookingForm)
      .subscribe({

        next: (response: any) => {

          this.loading = false;

          this.showForm = false;

          this.successMessage =
            response.message;

          this.loadBookings();

          this.loadAvailableUnits();

        },

        error: (error) => {

          this.loading = false;

          this.errorMessage =
            error.error?.message ||
            'Booking failed';

        }

      });

  }

  cancelBooking(booking: Booking): void {

    if (!booking.id) {
      return;
    }

    if (!confirm(
      'Cancel this booking?'
    )) {
      return;
    }

    this.bookingService
      .cancelBooking(booking.id)
      .subscribe({

        next: (response: any) => {

          this.successMessage =
            response.message;

          this.loadBookings();

          this.loadAvailableUnits();

        },

        error: (error) => {

          this.errorMessage =
            error.error?.message ||
            'Failed to cancel booking';

        }

      });

  }

}