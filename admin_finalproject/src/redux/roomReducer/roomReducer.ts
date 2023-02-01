import { getStorageJson, ROOM_DETAIL, setStorageJson } from './../../util/config';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http } from '../../util/config';
import { AppDispatch } from '../configStore';
import { RoomModel } from '../../Models/RoomModel';

type RoomState = {
    rooms: RoomModel[],
    roomPaginate: RoomModel[],
    roomDetail: RoomModel | null,
}

const initialState: RoomState = {
    rooms: [],
    roomPaginate: [],
    roomDetail: null,
}

const roomReducer = createSlice({
    name: 'roomReducer',
    initialState,
    reducers: {
        getRoomListAction: (state: RoomState, action: PayloadAction<RoomModel[]>) => {
            state.rooms = action.payload
        },
        getRoomPagAction: (state: RoomState, action: PayloadAction<RoomModel[]>) => {
            state.roomPaginate = action.payload
        },
        getRoomByIdAction: (state: RoomState, action: PayloadAction<RoomModel>) => {
            state.roomDetail = action.payload
        },
        createRoomAction: (state: RoomState, action: PayloadAction<RoomModel>) => {
            state.rooms.push(action.payload)
        },
        deleteRoomByIdAction: (state: RoomState, action: PayloadAction<number>) => {
            state.rooms = state.rooms.filter(room => room.id !== action.payload)
        },

    }
});

export const { getRoomListAction, getRoomPagAction, getRoomByIdAction, createRoomAction, deleteRoomByIdAction } = roomReducer.actions

export default roomReducer.reducer

// action async 
export const getRoomListApi = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await http.get('/api/phong-thue')
            const content: RoomModel[] = res.data.content
            const action: PayloadAction<RoomModel[]> = getRoomListAction(content)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}

export const getRoomPagApi = (pageIndex: number, pageSize: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await http.get(`/api/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`)
            const content: RoomModel[] = res.data.content.data
            const action: PayloadAction<RoomModel[]> = getRoomPagAction(content)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}

export const getRoomByIdApi = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.get(`/api/phong-thue/${id}`)
            const content: RoomModel = result.data.content
            const action: PayloadAction<RoomModel> = getRoomByIdAction(content)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }

    }
}

export const uploadRoomImageApi = (roomId: number, image: File) => {
    const formData = new FormData();

    console.log(formData);
    formData.append("formFile", image, image.name);

    console.log(formData.get('formFile'))
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.post(`/api/phong-thue/upload-hinh-phong?maPhong=${roomId}`, formData.get('formFile'))
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteRoomByIdApi = (roomId: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            await http.delete(`/api/phong-thue/${roomId}`)
            const action: PayloadAction<number> = deleteRoomByIdAction(roomId)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}

export const createRoomApi = (room: RoomModel) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.post('/api/phong-thue', room)
            const content: RoomModel = result.data.content
            const action: PayloadAction<RoomModel> = createRoomAction(content)
            dispatch(action)
        } catch (error) {
            console.log(error);
        }

    }
}

export const updateRoomApi = (roomId: number, room: RoomModel) => {
    return async (dispatch: AppDispatch) => {
        await http.put(`/api/phong-thue/${roomId}`, room)
    }
}