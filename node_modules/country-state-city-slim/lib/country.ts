import countryList from '../assets/country.json';
import { findEntryByCode } from '../utils';
import { ICountry } from './interface';

// Get a country by isoCode.
function getCountryByCode(isoCode: string): ICountry {
	return findEntryByCode(countryList, isoCode?.toUpperCase());
}

// Get a list of all countries.
function getAllCountries(): ICountry[] {
	return countryList;
}

// Check if a country is part of the European Union (by country code)
function isEuropeanUnion(isoCode: string): boolean {
	return getCountryByCode(isoCode?.toUpperCase())?.internationalOrganization == "EU";
}

export default {
	getCountryByCode,
	getAllCountries,
	isEuropeanUnion
};