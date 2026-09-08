export interface Lead {
    id?: number;

    name: string;

    phone: string;

    email?: string;

    source?: string;

    stage:
    | 'NEW'
    | 'CONTACTED'
    | 'SITE_VISIT'
    | 'INTERESTED'
    | 'NEGOTIATION'
    | 'BOOKED'
    | 'LOST';

    assigned_to?: number;

    assigned_user_name?: string;

    notes?: string;

    follow_up_date?: string;

    created_at?: string;

    updated_at?: string;
}