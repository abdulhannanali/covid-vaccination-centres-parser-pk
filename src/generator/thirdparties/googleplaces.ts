
import debug from 'debug'
import { Client, FindPlaceFromTextResponse, PlaceInputType, Place } from '@googlemaps/google-maps-services-js'
import { promisify } from 'util'
import { flatten } from 'ramda'

import { RawVaccinationCentre } from "../../VaccinationCentre";
import { PLACES_API_KEY } from '../constants';

const sleep = promisify(setTimeout)
const key = PLACES_API_KEY
const debugglpaces = debug('thirdparties:googleplaces')


/**
 * From 
 * https://developers.google.com/maps/documentation/places/web-service/search-find-place#fields
 */
const basicPlacesFields = [
    'geometry',
    'name',
    'place_id'
]

export async function fetchGooglePlacesResponse(rawVaccinationCentre: RawVaccinationCentre) {
    const client = new Client({})

    const inputOptions = [
        [rawVaccinationCentre.name, rawVaccinationCentre.tehsil, rawVaccinationCentre.district, 'Pakistan'],
    ]

    const responses: FindPlaceFromTextResponse[] = []

    for (const input of inputOptions) {
        debugglpaces('Delay of 3000ms before executing next request')
        await sleep(10000)

        try {
            const response = await client.findPlaceFromText({
                params: {
                    input: input.join(' '),
                    fields: basicPlacesFields,
                    key,
                    inputtype: PlaceInputType.textQuery
                },
                timeout: 3000,
            })            

            responses.push(response)
        } catch (error) {
            debugglpaces('Error occured ', error.toString())
        }
    }

    return acquireCandidates(responses)
}


/**
 * Acquires all the suitable candidates available
 *
 * @param responses 
 */
function acquireCandidates (responses: FindPlaceFromTextResponse[]): Place[] {
    return flatten(
        responses
            .map(response => response?.data?.candidates)
            .filter(candidates => candidates)
    ).filter(place => place?.place_id)
}
