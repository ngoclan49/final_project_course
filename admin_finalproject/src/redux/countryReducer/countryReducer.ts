import { countries } from './../../assets/data/country';
import { ICity, ICountry, IState } from 'country-state-city';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CountryState = {
    countries: ICountry[],
    states: IState[],
    cities: ICity[],
}

const initialState: CountryState = {
    countries: [],
    states: [],
    cities: []
}

const countryReducer = createSlice({
  name: 'countryReducer',
  initialState,
  reducers: {
    getAllCountries: (state: CountryState, action: PayloadAction<ICountry[]>) => {
        state.countries = action.payload
    },
    getAllStates: (state: CountryState, action: PayloadAction<IState[]>) => {
        state.states = action.payload
    },
    getAllCities: (state: CountryState, action: PayloadAction<ICity[]>) => {
        state.cities = action.payload
    },
  }
});

export const { getAllCountries, getAllStates, getAllCities } = countryReducer.actions

export default countryReducer.reducer