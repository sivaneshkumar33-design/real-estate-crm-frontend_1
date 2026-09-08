import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { DashboardService } from '../core/services/dashboard.service';

import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  user: any;

  loading = true;

  errorMessage = '';

  stats = {
    totalLeads: 0,
    newLeads: 0,
    siteVisits: 0,
    bookings: 0,
    followUps: 0,
    totalAmount: 0
  };

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router
  ) {

    this.user = this.authService.getUser();

  }

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.loading = true;

    this.dashboardService
      .getDashboard()
      .subscribe({

        next: (response) => {

          const data = response.data;

          this.stats.totalLeads =
            Number(data.leads.total_leads || 0);

          this.stats.newLeads =
            Number(data.leads.new_leads || 0);

          this.stats.siteVisits =
            Number(data.leads.site_visits || 0);

          this.stats.bookings =
            Number(data.bookings.total_bookings || 0);

          this.stats.followUps =
            Number(
              data.followUps.upcoming_followups || 0
            );

          this.stats.totalAmount =
            Number(
              data.bookings.total_amount || 0
            );

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to load dashboard';

          this.loading = false;

        }

      });

  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}