import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Property, PropertyUnit } from '../models/property.model';

@Injectable({
    providedIn: 'root'
})
export class PropertyService {

    private apiUrl =
        'http://localhost:5000/api/properties';

    constructor(
        private http: HttpClient
    ) { }

    getProperties() {

        return this.http.get<{
            success: boolean;
            data: Property[];
        }>(this.apiUrl);

    }

    getProperty(id: number) {

        return this.http.get<{
            success: boolean;
            data: Property & {
                units: PropertyUnit[];
            };
        }>(
            `${this.apiUrl}/${id}`
        );

    }

    createProperty(property: Property) {

        return this.http.post(
            this.apiUrl,
            property
        );

    }

    updateProperty(
        id: number,
        property: Property
    ) {

        return this.http.put(
            `${this.apiUrl}/${id}`,
            property
        );

    }

    deleteProperty(id: number) {

        return this.http.delete(
            `${this.apiUrl}/${id}`
        );

    }

    createUnit(
        propertyId: number,
        unit: PropertyUnit
    ) {

        return this.http.post(
            `${this.apiUrl}/${propertyId}/units`,
            unit
        );

    }

}