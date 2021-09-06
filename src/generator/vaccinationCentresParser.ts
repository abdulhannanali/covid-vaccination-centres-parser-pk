import localDebug from './localDebug'

import {
    RawVaccinationCentre,
    RawVaccinationCentreKeys,
} from '../VaccinationCentre'

import { ParsedTable } from './vaccinationCentresTableParser'
import { ParsedTableEntry } from './tableParser'


const fieldsCache : Map<string, string> = new Map()

const centresParserDebug = localDebug('centresParser')

const fields = {
    'district': ["district"],
    'tehsil': ["tehsil"],
    'name': ["avc", "cvc", "mvc", "cvc\/mvc", "cvc\/ mvc name", "hf", "hf name"],
    'address': ["address", "adres"],
    'contact': ["contact no", "contact", "number", "contact number"],
    'designation': ["designated", "designated for", "designation"],
}



export function parseToVaccinationCentreArray (table: ParsedTable): RawVaccinationCentre[] {
    return table.tableEntries.map(
        tableEntry => resolveTableEntry(
            table.province,
            tableEntry
        )
    ).filter(x => x) as RawVaccinationCentre[]
}

function resolveTableEntry (province: string, tableEntry: ParsedTableEntry): RawVaccinationCentre | undefined {
    const newObject : ParsedTableEntry = {
        province,
    }

    for (const [key, value] of Object.entries(tableEntry)) {
        const resolvedField = resolveField(key)

        if (resolvedField === undefined) {
            centresParserDebug('Skipping as no resolved field is found')
            continue
        }

        newObject[resolvedField] = value
    }


    if (newObject.district && !newObject.district) {
        newObject.district = newObject.tehsil
    }

    if (newObject.tehsil && !newObject.tehsil) {
        newObject.tehsil = newObject.district
    }

    if (!newObject.designation) {
        newObject.designation = 'all'
    }

    const keysNotPresent = RawVaccinationCentreKeys.filter(key => {
        return !(key in newObject)
    })

    if (keysNotPresent.length) {
        localDebug('Following keys are not present in an entry so skipping ->' + JSON.stringify(keysNotPresent))
        return undefined
    }

    return newObject as RawVaccinationCentre
}


function resolveField (str: string): string | undefined {
    if (fieldsCache.has(str)) {
        centresParserDebug('Using cached value for ' + str)
        return fieldsCache.get(str)
    }

    for (const [field, fieldMatches] of Object.entries(fields)) {
        for (const fieldMatch of fieldMatches) {
            if (str.match(new RegExp(fieldMatch, 'i')) !== null) {
                fieldsCache.set(str, field)
                return field
            }
        }
    }

    centresParserDebug(`Not able to resolve to anything for ${str}`)
}
