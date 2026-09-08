export interface Property {
    id?: number;
    name: string;
    location: string;
    description: string;
    total_units?: number;
    available_units?: number;
}

export interface PropertyUnit {
    id?: number;
    property_id: number;
    unit_number: string;
    price: number;
    type: '1BHK' | '2BHK' | '3BHK' | '4BHK';
    availability: 'AVAILABLE' | 'BOOKED';
}