export interface Booking {
    id?: number;

    lead_id: number;
    lead_name?: string;
    lead_phone?: string;

    unit_id: number;
    unit_number?: string;

    property_id?: number;
    property_name?: string;

    booking_date: string;

    amount: number;

    status?: 'CONFIRMED' | 'CANCELLED';

    created_by?: number;
    created_by_name?: string;
}