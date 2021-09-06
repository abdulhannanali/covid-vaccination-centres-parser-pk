/**
 * This file takes in raw vaccination centre and expands on them
 * with the help of cache and multiple other clients
 */

import { nanoid } from 'nanoid'


import localDebug from './localDebug'
import { Cache } from './cache'
import { fetchGooglePlacesResponse } from './thirdparties/googleplaces';
import { RawVaccinationCentre, VaccinationCentre } from "../VaccinationCentre";

const debug = localDebug('expander')

export default async function expandVaccinationCentres (
    cache: Cache | undefined,
    rawVaccinationCentres: RawVaccinationCentre[]
) {
    async function expandVaccinationCentre (rawVaccinationCentre: RawVaccinationCentre): Promise<VaccinationCentre> {
        const cachedEntry = cache && cache.getExtendedVaccinationCentre(rawVaccinationCentre)
    
        if (cachedEntry) {
            debug('Using cached entry for this')
            return cachedEntry
        }

        debug('Not using cached entry')
    
    
        const id = nanoid()
        const googleData = await fetchGooglePlacesResponse(rawVaccinationCentre)   
    
        return {
            id,
            baseVaccinationCentre: rawVaccinationCentre,
            lastUpdated: Date.now(),
            dateCreated: Date.now(),
            googlePlacesResponse: googleData
        }
    }

    const allVaccinationCentres: VaccinationCentre[] = []

    for (const rawVaccinationCentre of rawVaccinationCentres) {
        allVaccinationCentres.push(await expandVaccinationCentre(rawVaccinationCentre))
    }       

    return allVaccinationCentres
}




