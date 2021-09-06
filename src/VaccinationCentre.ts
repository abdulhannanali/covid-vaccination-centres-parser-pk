import { Place } from '@googlemaps/google-maps-services-js'

export const VaccineDesignations = {
    all: 'all',
    citizens: 'citizens',
    healthCareWorkers: 'healthCareWorkers'
}

export interface CustomFields {}

export interface VaccinationCentre {
    id: string;
    dateCreated: number;
    lastUpdated: number;
    baseVaccinationCentre: RawVaccinationCentre;
    googlePlacesResponse: Place[];
    customFields?: CustomFields; 
}

export interface RawVaccinationCentre {
    district?: string;
    province?: string;
    tehsil?: string;
    address?: string;
    contact?: string;
    name?: string;
    designation?: string;
}

export const RawVaccinationCentreKeys = [
    'district',
    'tehsil',
    'address',
    'contact',
    'name',
    'designation'
]

export { Place } from '@googlemaps/google-maps-services-js'