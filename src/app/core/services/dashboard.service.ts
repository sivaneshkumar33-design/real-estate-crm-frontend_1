import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private apiUrl = `${environment.apiUrl}/dashboard`;

    // private apiUrl =
    //     'http://localhost:5000/api/dashboard';

    constructor(
        private http: HttpClient
    ) { }

    getDashboard() {

        return this.http.get<{
            success: boolean;

            data: {
                leads: {
                    total_leads: number;
                    new_leads: number;
                    site_visits: number;
                    booked_leads: number;
                };

                bookings: {
                    total_bookings: number;
                    total_amount: number;
                };

                followUps: {
                    upcoming_followups: number;
                };
            };
        }>(this.apiUrl);

    }
}