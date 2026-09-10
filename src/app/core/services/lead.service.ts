import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Lead } from '../models/lead.model';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class LeadService {

    private apiUrl = `${environment.apiUrl}/leads`;

    // private apiUrl = 'http://localhost:5000/api/leads';


    constructor(
        private http: HttpClient
    ) { }


    getLeads(
        search?: string,
        stage?: string,
        assignedTo?: number
    ): Observable<any> {

        let params = new HttpParams();

        if (search) {
            params = params.set('search', search);
        }

        if (stage) {
            params = params.set('stage', stage);
        }

        if (assignedTo) {
            params = params.set(
                'assigned_to',
                assignedTo
            );
        }

        return this.http.get(
            this.apiUrl,
            { params }
        );
    }


    getLead(id: number): Observable<any> {

        return this.http.get(
            `${this.apiUrl}/${id}`
        );
    }


    createLead(lead: Lead): Observable<any> {

        return this.http.post(
            this.apiUrl,
            lead
        );
    }


    updateLead(
        id: number,
        lead: Lead
    ): Observable<any> {

        return this.http.put(
            `${this.apiUrl}/${id}`,
            lead
        );
    }


    deleteLead(id: number): Observable<any> {

        return this.http.delete(
            `${this.apiUrl}/${id}`
        );
    }
}