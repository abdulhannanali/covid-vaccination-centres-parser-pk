import { resolve } from 'path/posix'
import { processAndWriteVaccinationCentres } from './generator/index'

async function generate () {    
    await processAndWriteVaccinationCentres(
        resolve(__dirname, '../../trackedRawDataHistory/1.0.0/1.0.0.html'),
        resolve(__dirname, '../../store/', '1.0.9.json')
    )
}

generate()
