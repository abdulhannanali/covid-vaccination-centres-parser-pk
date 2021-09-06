import { readJSON } from "fs-extra";
import { stat } from "fs/promises";
import { join } from "path";
import { equals } from 'ramda'
import { RELATIVE_STORAGE_DIRECTORY } from "./constants";
import { VaccinationCentre, RawVaccinationCentre } from "../VaccinationCentre";


export interface Cache {
    getExtendedVaccinationCentre: (rawVaccinationCentre: RawVaccinationCentre) => VaccinationCentre | undefined
}

/**
 * Reads a cache file so it's contents can be used
 * @param filename 
 */
export async function readCacheFile(filename: string): Promise<Cache> {
    const fullPath = join(RELATIVE_STORAGE_DIRECTORY, filename)
    let cachedCentres: VaccinationCentre[]

    if (await stat(fullPath)) {
        cachedCentres = await readJSON(fullPath)
    }


    function getExtendedVaccinationCentre(rawVaccinationCentre: RawVaccinationCentre): VaccinationCentre | undefined {
        if (!Array.isArray(cachedCentres)) {
            return undefined
        }


        return cachedCentres.find(centre => equals(centre.baseVaccinationCentre, rawVaccinationCentre))
    }

    return {
        getExtendedVaccinationCentre
    }
}



