import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Lead
} from '../core/models/lead.model';

import {
  User
} from '../core/models/user.model';

import {
  LeadService
} from '../core/services/lead.service';

import {
  UserService
} from '../core/services/user.service';


import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-leads',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent
  ],

  templateUrl: './leads.component.html',

  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {


  // Leads
  leads: Lead[] = [];

  // Sales users
  salesUsers: User[] = [];


  // Search
  searchText = '';

  selectedStage = '';


  // Loading
  loading = false;


  // Error
  errorMessage = '';


  // Modal
  showForm = false;


  // Edit mode
  editingLeadId: number | null = null;


  // Form
  leadForm: Lead = this.getEmptyForm();


  // Stage list
  stages = [

    {
      value: 'NEW',
      label: 'New'
    },

    {
      value: 'CONTACTED',
      label: 'Contacted'
    },

    {
      value: 'SITE_VISIT',
      label: 'Site Visit'
    },

    {
      value: 'INTERESTED',
      label: 'Interested'
    },

    {
      value: 'NEGOTIATION',
      label: 'Negotiation'
    },

    {
      value: 'BOOKED',
      label: 'Booked'
    },

    {
      value: 'LOST',
      label: 'Lost'
    }

  ];


  constructor(

    private leadService: LeadService,

    private userService: UserService

  ) { }


  ngOnInit(): void {

    this.loadLeads();

    this.loadSalesUsers();

  }


  // Empty form
  getEmptyForm(): Lead {

    return {

      name: '',

      phone: '',

      email: '',

      source: '',

      stage: 'NEW',

      assigned_to: undefined,

      notes: '',

      follow_up_date: ''

    };

  }


  // Load leads
  loadLeads(): void {

    this.loading = true;

    this.errorMessage = '';


    this.leadService
      .getLeads(
        this.searchText,
        this.selectedStage
      )
      .subscribe({

        next: (response) => {

          this.leads =
            response.data || [];

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to load leads';

          this.loading = false;

        }

      });

  }


  // Load sales users
  loadSalesUsers(): void {

    this.userService
      .getSalesUsers()
      .subscribe({

        next: (response) => {

          this.salesUsers =
            response.data || [];

        },

        error: (error) => {

          console.error(error);

        }

      });

  }


  // Search
  searchLeads(): void {

    this.loadLeads();

  }


  // Stage filter
  filterStage(): void {

    this.loadLeads();

  }


  // Open create form
  openCreateForm(): void {

    this.editingLeadId = null;

    this.leadForm =
      this.getEmptyForm();

    this.showForm = true;

  }


  // Edit
  editLead(lead: Lead): void {

    this.editingLeadId =
      lead.id || null;

    this.leadForm = {

      id: lead.id,

      name: lead.name,

      phone: lead.phone,

      email: lead.email || '',

      source: lead.source || '',

      stage: lead.stage,

      assigned_to:
        lead.assigned_to,

      notes: lead.notes || '',

      follow_up_date:
        lead.follow_up_date || ''

    };

    this.showForm = true;

  }


  // Close form
  closeForm(): void {

    this.showForm = false;

    this.editingLeadId = null;

  }


  // Save
  saveLead(): void {


    // Validation
    if (!this.leadForm.name.trim()) {

      alert('Please enter lead name');

      return;

    }


    if (!this.leadForm.phone.trim()) {

      alert('Please enter phone number');

      return;

    }


    this.loading = true;


    // UPDATE
    if (this.editingLeadId) {

      this.leadService
        .updateLead(
          this.editingLeadId,
          this.leadForm
        )
        .subscribe({

          next: () => {

            alert(
              'Lead updated successfully'
            );

            this.closeForm();

            this.loadLeads();

          },

          error: (error) => {

            console.error(error);

            alert(
              error?.error?.message ||
              'Failed to update lead'
            );

            this.loading = false;

          }

        });

      return;

    }


    // CREATE
    this.leadService
      .createLead(this.leadForm)
      .subscribe({

        next: () => {

          alert(
            'Lead created successfully'
          );

          this.closeForm();

          this.loadLeads();

        },

        error: (error) => {

          console.error(error);

          alert(
            error?.error?.message ||
            'Failed to create lead'
          );

          this.loading = false;

        }

      });

  }


  // Delete
  deleteLead(lead: Lead): void {

    if (!lead.id) {
      return;
    }


    const confirmed =
      confirm(
        `Delete lead "${lead.name}"?`
      );


    if (!confirmed) {
      return;
    }


    this.leadService
      .deleteLead(lead.id)
      .subscribe({

        next: () => {

          alert(
            'Lead deleted successfully'
          );

          this.loadLeads();

        },

        error: (error) => {

          console.error(error);

          alert(
            error?.error?.message ||
            'Failed to delete lead'
          );

        }

      });

  }


  // Get stage label
  getStageLabel(
    stage: string
  ): string {

    const found =
      this.stages.find(
        x => x.value === stage
      );

    return found?.label || stage;

  }

}