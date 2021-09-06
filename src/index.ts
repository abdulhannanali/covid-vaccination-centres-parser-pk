import store from '../store/1.0.3.json' 

import { uniqBy } from 'ramda'
import { VaccinationCentre } from './VaccinationCentre'
import { VaccinationCity } from './VaccinationCity'


export type FilterData = {
    districts: string[];
    tehsils: string[];
    provinces: string[];
    designations: string[];
}

const currentVersion = '1.0.3'

export function getAllVaccinationCentres () {
    return store.vaccinationCentres as VaccinationCentre[]
}

export function getAllVaccinationCities () {
    return store.cities as VaccinationCity[]
}

export function getFilterData (): FilterData {
    const districts = uniqBy(x => x, store.vaccinationCentres.map(
        centre => centre.baseVaccinationCentre.district
    ))

    const tehsils = uniqBy(x => x, store.vaccinationCentres.map(centre => (
        centre.baseVaccinationCentre.tehsil
    )))

    const provinces = uniqBy(x => x, store.vaccinationCentres.map(centre  => (
        centre.baseVaccinationCentre.province
    )))

    const designations = uniqBy(x => x, store.vaccinationCentres.map(centre => (
        centre.baseVaccinationCentre.designation
    )))


    return {
        districts,
        provinces,
        tehsils,
        designations
    }
}

export function getCurrentVersion () {
    return currentVersion
}
 