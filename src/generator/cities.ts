import { createHash } from "crypto";
import { VaccinationCentre } from "../VaccinationCentre";
import { VaccinationCity } from "../VaccinationCity";

export default function getCities (vaccinationCentres: VaccinationCentre[]): VaccinationCity[] {
    const cities: { [id: string]: VaccinationCity } = {}

    vaccinationCentres.reduce((acc, centre) => {
        const cityHash = getCityHash(centre)

        const city: VaccinationCity = acc[cityHash] || {
            id: cityHash,
            district: centre.baseVaccinationCentre.district,
            tehsil: centre.baseVaccinationCentre.tehsil,
            province: centre.baseVaccinationCentre.province,
            vaccinationCentresCount: 0
        }

        city.vaccinationCentresCount++
        acc[cityHash] = city
        return acc
    }, cities)

    return Object.values(cities)
}

function getCityHash(vaccinationCentre: VaccinationCentre): string {
    return createHash('sha256')
        .update(vaccinationCentre.baseVaccinationCentre.district)
        .update(vaccinationCentre.baseVaccinationCentre.tehsil)
        .digest('base64')

}