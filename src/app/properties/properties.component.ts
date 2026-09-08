import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Property,
  PropertyUnit
} from '../core/models/property.model';

import { PropertyService } from '../core/services/property.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent
  ],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent implements OnInit {

  properties: Property[] = [];

  units: PropertyUnit[] = [];

  selectedProperty: Property | null = null;

  loading = false;

  errorMessage = '';

  showPropertyForm = false;

  showUnitForm = false;

  editingProperty: Property | null = null;

  propertyForm: Property = {
    name: '',
    location: '',
    description: ''
  };

  unitForm: PropertyUnit = {
    property_id: 0,
    unit_number: '',
    price: 0,
    type: '2BHK',
    availability: 'AVAILABLE'
  };

  constructor(
    private propertyService: PropertyService
  ) { }

  ngOnInit(): void {

    this.loadProperties();

  }

  loadProperties(): void {

    this.loading = true;

    this.propertyService
      .getProperties()
      .subscribe({

        next: (response) => {

          this.properties = response.data;

          this.loading = false;

        },

        error: () => {

          this.errorMessage =
            'Failed to load properties';

          this.loading = false;

        }

      });

  }

  openAddProperty(): void {

    this.editingProperty = null;

    this.propertyForm = {
      name: '',
      location: '',
      description: ''
    };

    this.showPropertyForm = true;

  }

  editProperty(property: Property): void {

    this.editingProperty = property;

    this.propertyForm = {
      ...property
    };

    this.showPropertyForm = true;

  }

  saveProperty(): void {

    if (!this.propertyForm.name.trim()) {
      return;
    }

    if (this.editingProperty?.id) {

      this.propertyService
        .updateProperty(
          this.editingProperty.id,
          this.propertyForm
        )
        .subscribe({

          next: () => {

            this.showPropertyForm = false;

            this.loadProperties();

          }

        });

    } else {

      this.propertyService
        .createProperty(this.propertyForm)
        .subscribe({

          next: () => {

            this.showPropertyForm = false;

            this.loadProperties();

          }

        });

    }

  }

  deleteProperty(property: Property): void {

    if (!property.id) {
      return;
    }

    if (!confirm(
      `Delete ${property.name}?`
    )) {
      return;
    }

    this.propertyService
      .deleteProperty(property.id)
      .subscribe({

        next: () => {
          this.loadProperties();
        }

      });

  }

  viewUnits(property: Property): void {

    if (!property.id) {
      return;
    }

    this.selectedProperty = property;

    this.propertyService
      .getProperty(property.id)
      .subscribe({

        next: (response) => {

          this.units = response.data.units;

        }

      });

  }

  openAddUnit(property: Property): void {

    if (!property.id) {
      return;
    }

    this.selectedProperty = property;

    this.unitForm = {
      property_id: property.id,
      unit_number: '',
      price: 0,
      type: '2BHK',
      availability: 'AVAILABLE'
    };

    this.showUnitForm = true;

  }

  saveUnit(): void {

    if (!this.selectedProperty?.id) {
      return;
    }

    this.propertyService
      .createUnit(
        this.selectedProperty.id,
        this.unitForm
      )
      .subscribe({

        next: () => {

          this.showUnitForm = false;

          this.viewUnits(
            this.selectedProperty!
          );

          this.loadProperties();

        },

        error: (error) => {

          this.errorMessage =
            error.error?.message ||
            'Failed to create unit';

        }

      });

  }

}