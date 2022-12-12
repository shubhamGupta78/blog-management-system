import stateList from '../assets/state.json';
import { findEntryByCode, compare } from '../utils';
import { IState } from './interface';

// Get a list of all states.
export function getAllStates(): IState[] {
	return stateList;
}

// Get a list of states belonging to a specific country.
export function getStatesOfCountry(countryCode: string): IState[] {
	if (!countryCode) return [];
	const states = stateList.filter((value) => {
		return value.countryCode === countryCode?.toUpperCase();
	});
	return states.sort(compare);
}

// to be deprecate
export function getStateByCode(isoCode: string): IState {
	return findEntryByCode(stateList, isoCode?.toUpperCase());
}

export default {
	getAllStates,
	getStatesOfCountry,
	getStateByCode,
};