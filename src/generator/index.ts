import { readFile } from 'fs/promises'
import { mkdirp, writeJSON } from 'fs-extra'
import { dirname } from 'path'

import localDebug from './localDebug'
import parse from './vaccinationCentresTableParser'
import expandVaccinationCentres from './expander'
import { readCacheFile, Cache } from './cache'
import getCities from './cities'


const debug = localDebug('index')


async function getRawVaccinationCentresFromFile (filePath: string) {
    const rawData = await readFile(filePath, 'utf-8')
    return parse(rawData)
}

/**
 * Gets the array of ExpandedVaccinationCentres
 * 
 */
export async function processAndWriteVaccinationCentres (
    sourceFilePath: string,
    outputFilePath: string,
    cacheFile?: string, 
    options?: {}
): Promise<void> {
    const rawVaccinationCentres = await getRawVaccinationCentresFromFile(sourceFilePath)
    debug(`Parsed out ${rawVaccinationCentres.length} from ${sourceFilePath}`)
    
    if (rawVaccinationCentres) {
        const cache: Cache | undefined = cacheFile !== undefined ? await readCacheFile(cacheFile) : undefined
        const vaccinationCentres = await expandVaccinationCentres(cache, rawVaccinationCentres) 
        const cities = getCities(vaccinationCentres)
        

        if (vaccinationCentres) {
            await mkdirp(dirname(outputFilePath))
            await writeJSON(outputFilePath, { cities, vaccinationCentres })
            console.log('Written to ' + outputFilePath)
        }
    }
}

export * from '../VaccinationCentre'