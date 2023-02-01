import { PositionModel } from './../../Models/PositionModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../configureStore';
import { http } from '../../util/config';

export type PositionState  = {
  destination: PositionModel[],
  pagination: PositionModel[]
}

const initialState: PositionState = {
  destination: [],
  pagination: []
}

const positionReducer = createSlice({
  name: 'positionReducer',
  initialState,
  reducers: {
    getDestinationAction: (state: PositionState, action: PayloadAction<PositionModel[]>) => {
      state.destination = action.payload
    },
    getDesPaginationAction: (state: PositionState, action: PayloadAction<PositionModel[]>) => {
      state.pagination = action.payload
    },
  }
});

export const {getDestinationAction, getDesPaginationAction} = positionReducer.actions

export default positionReducer.reducer

// action async
export const getDestinationApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get('/api/vi-tri')
      const content: PositionModel[] = result.data.content;
      const action: PayloadAction<PositionModel[]> = getDestinationAction(content)
      dispatch(action)
    } catch (error) {
      
    }
  } 
}

export const getDesPaginationApi = (pageIndex: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    const result = await http.get(`/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`)
    const content: PositionModel[] = result.data.content.data
    const action: PayloadAction<PositionModel[]> = getDesPaginationAction(content)
    dispatch(action)
  }
}

