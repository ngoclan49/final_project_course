import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  RoomModel,
  RoomModelComment,
  UserComment,
} from '../../Models/RoomModel';
import { http } from '../../util/config';
import { AppDispatch } from '../configureStore';
import { toast } from 'react-toastify';

export type RoomState = {
  rooms: RoomModel[];
  roomByPos: RoomModel[];
  roomPagination: RoomModel[];
  roomDetail: RoomModel;
  roomDetailComment: RoomModelComment[];
};

const initialState: RoomState = {
  rooms: [],
  roomByPos: [],
  roomPagination: [],
  roomDetail: {
    id: 0,
    tenPhong: '',
    khach: 0,
    phongNgu: 0,
    giuong: 0,
    phongTam: 0,
    moTa: '',
    giaTien: 0,
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    banUi: false,
    maViTri: 0,
    hinhAnh: '',
  },
  roomDetailComment: [],
};

const roomReducer = createSlice({
  name: 'roomReducer',
  initialState,
  reducers: {
    getRoomAction: (state: RoomState, action: PayloadAction<RoomModel[]>) => {
      state.rooms = action.payload;
    },
    getRoomByPosIdAction: (
      state: RoomState,
      action: PayloadAction<RoomModel[]>
    ) => {
      state.roomByPos = action.payload;
    },
    getRoomPaginationAction: (
      state: RoomState,
      action: PayloadAction<RoomModel[]>
    ) => {
      state.roomPagination = action.payload;
    },
    getRoomDetailPaginationAction: (
      state: RoomState,
      action: PayloadAction<RoomModel>
    ) => {
      state.roomDetail = action.payload;
    },
    getCommentDetailPaginationAction: (
      state: RoomState,
      action: PayloadAction<RoomModelComment[]>
    ) => {
      state.roomDetailComment = action.payload;
    },
  },
});

export const {
  getRoomAction,
  getRoomByPosIdAction,
  getRoomPaginationAction,
  getRoomDetailPaginationAction,
  getCommentDetailPaginationAction,
} = roomReducer.actions;

export default roomReducer.reducer;

// action async
export const getRoomApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get('/api/phong-thue');
      const content: RoomModel[] = result.data.content;
      const action: PayloadAction<RoomModel[]> = getRoomAction(content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRoomByPosIdApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    const result = await http.get(
      `/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`
    );
    const content: RoomModel[] = result.data.content;
    const action: PayloadAction<RoomModel[]> = getRoomByPosIdAction(content);
    dispatch(action);
  };
};

export const getRoomPagination = (pageIndex: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    const result = await http.get(
      `api/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
    const content: RoomModel[] = result.data.content.data;
    const action: PayloadAction<RoomModel[]> = getRoomPaginationAction(content);
    dispatch(action);
  };
};

export const getRoomDetailApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/api/phong-thue/${id}`);
      const content: RoomModel = result.data.content;
      const action: PayloadAction<RoomModel> =
        getRoomDetailPaginationAction(content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCommentDetailApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `/api/binh-luan/lay-binh-luan-theo-phong/${id}`
      );
      const content: RoomModelComment[] = result.data.content;
      const action: PayloadAction<RoomModelComment[]> =
        getCommentDetailPaginationAction(content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const postCommentUser = (user: UserComment) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await http.post('/api/binh-luan', user).then((response) => {
        dispatch(getCommentDetailApi(user.id));
      });
    } catch (error) {
      toast.error('Login fail. Try again');
    }
  };
};
