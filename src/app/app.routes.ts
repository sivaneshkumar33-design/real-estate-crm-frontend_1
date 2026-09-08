import { Routes } from '@angular/router';

import { LoginComponent }
    from './login/login.component';

import { DashboardComponent }
    from './dashboard/dashboard.component';

import { LeadsComponent }
    from './leads/leads.component';

import { PropertiesComponent }
    from './properties/properties.component';

import { BookingsComponent }
    from './bookings/bookings.component';

import { authGuard }
    from './core/guards/auth.guard';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },

    {
        path: 'leads',
        component: LeadsComponent,
        canActivate: [authGuard]
    },

    {
        path: 'properties',
        component: PropertiesComponent,
        canActivate: [authGuard]
    },

    {
        path: 'bookings',
        component: BookingsComponent,
        canActivate: [authGuard]
    },

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: '**',
        redirectTo: 'login'
    }

];