import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocationModel } from '../../Models/LocationModel';
import { http } from '../../util/config';
import { AppDispatch } from '../configStore';

type LocationState = {
    locations: LocationModel[],
    locationPag: LocationModel[],
    locationDetail: LocationModel | null
}

const initialState: LocationState = {
    locations: [],
    locationDetail: null,
    locationPag: []
}

const locationReducer = createSlice({
    name: 'locationReducer',
    initialState,
    reducers: {
        getAllLocationAction: (state: LocationState, action: PayloadAction<LocationModel[]>) => {
            state.locations = action.payload
        },
        getLocationByIdAction: (state: LocationState, action: PayloadAction<LocationModel>) => {
            state.locationDetail = action.payload
        },
        getLocationPagAction: (state: LocationState, action: PayloadAction<LocationModel[]>) => {
            state.locationPag = action.payload
        },
        createLocationAction: (state: LocationState, action: PayloadAction<LocationModel>) => {
            state.locations.push(action.payload)
        },
        deleteLocationAction: (state: LocationState, action: PayloadAction<number>) => {
            state.locations = state.locations.filter(location => location.id !== action.payload)
        },
        updateLocationAction: (state: LocationState, action: PayloadAction<LocationModel>) => {
            const newLocation = action.payload;
            let findLocation = state.locations?.findIndex(
                (location) => location.id === newLocation.id
            );

            if(findLocation) {
                state.locations.splice(findLocation, 1, newLocation)
            }
        }
    }
});

export const { getAllLocationAction, getLocationByIdAction, getLocationPagAction, createLocationAction, deleteLocationAction, updateLocationAction } = locationReducer.actions

export default locationReducer.reducer

// async action
export const getAllLocationApi = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await http.get('/api/vi-tri')
            const content: LocationModel[] = res.data.content
            const action: PayloadAction<LocationModel[]> = getAllLocationAction(content)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}

export const getLocationByIdApi = (locationId: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await http.get(`/api/vi-tri/${locationId}/`)
            const content: LocationModel = res.data.content
            const action: PayloadAction<LocationModel> = getLocationByIdAction(content)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}

export const getLocationPagApi = (pageIndex: number, pageSize: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await http.get(`/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`)
            const content: LocationModel[] = res.data.content.data
            const action: PayloadAction<LocationModel[]> = getLocationPagAction(content)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}

export const createLocationApi = (location: LocationModel) => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await http.post('/api/vi-tri', location)
            const content: LocationModel = res.data.content
            const action: PayloadAction<LocationModel> = createLocationAction(content)
            dispatch(action)
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteLocationApi = (locationId: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            await http.delete(`/api/vi-tri/${locationId}`)
            const action: PayloadAction<number> = deleteLocationAction(locationId)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateLocationApi = (locationId: number, location: LocationModel) => {
    return async (dispatch: AppDispatch) => {
        try {
            await http.put(`/api/vi-tri/${locationId}`, location)
            const action: PayloadAction<LocationModel> = updateLocationAction(location)
            dispatch(action)
        } catch (error) {

        }
    }
}