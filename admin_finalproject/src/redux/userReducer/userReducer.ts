import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginModel, UserModel } from '../../Models/UserModel';
import { ACCESS_TOKEN, getStorageJson, http, setStorage, setStorageJson, USER_LOGIN } from '../../util/config';
import { AppDispatch } from '../configStore';
import { history } from '../..';
import { toast } from 'react-toastify';
type UserState = {
    users: UserModel[],
    userLogin: LoginModel,
    userDetail: UserModel | null,
    userPag: UserModel[],
    userBySearch: UserModel[]
}

const initialState: UserState = {
    users: [],
    userLogin: getStorageJson(USER_LOGIN),
    userDetail: null,
    userPag: [],
    userBySearch: []
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        getAllUsersAction: (state: UserState, action: PayloadAction<UserModel[]>) => {
            state.users = action.payload
        },
        loginAction: (state: UserState, action: PayloadAction<UserModel>) => {
            state.userLogin = action.payload;
        },
        getUserByIdAction: (state: UserState, action: PayloadAction<UserModel>) => {
            state.userDetail = action.payload;
        },
        updateUserAction: (state: UserState, action: PayloadAction<UserModel>) => {
            const newUser = action.payload;
            state.userDetail = { ...state.userDetail, ...newUser };
        },
        getUserPagAction: (state: UserState, action: PayloadAction<UserModel[]>) => {
            state.userPag = action.payload;
        },
        createUserAction: (state: UserState, action: PayloadAction<UserModel>) => {
            const findUser = state.users.find(user => user.email === action.payload.email);
            if(findUser){
                toast.error('Email already exists')
            }
            state.users.push(action.payload);
            toast.success('Created');

        }, 
        deleteUserAction: (state: UserState, action: PayloadAction<number>) => {
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        getUserBySearchAction: (state: UserState, action: PayloadAction<UserModel[]>) => {
            state.userBySearch = action.payload;
        }
    }
});

export const { getAllUsersAction, loginAction, getUserByIdAction, updateUserAction, getUserPagAction, createUserAction, deleteUserAction, getUserBySearchAction } = userReducer.actions

export default userReducer.reducer

// async action 
export const getAllUsersApi = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await http.get('/api/users')
            const content: UserModel[] = res.data.content
            const action: PayloadAction<UserModel[]> = getAllUsersAction(content)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}

export const loginApi = (user: LoginModel) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.post('/api/auth/signin', user)
            const userLogin: UserModel = result.data.content.user
            setStorage(ACCESS_TOKEN, result.data.content.token);
            setStorageJson(USER_LOGIN, result.data.content.user);
            dispatch(loginAction(userLogin));
            toast.success('Login successful');
            if(userLogin.role === 'ADMIN'){
                history.push('/dashboard');
            }else{
                history.push('/profile');
            }

        } catch (error) {
            toast.error('Login fail. Try again')

        }

    }
}

export const getUserByIdApi = (userId: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.get(`/api/users/${userId}`)
            const content: UserModel = result.data.content
            const action: PayloadAction<UserModel> = getUserByIdAction(content)
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateUserApi = (userId: number, user: UserModel) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.put(`/api/users/${userId}`, user)
            const action: PayloadAction<UserModel> = updateUserAction(user)
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }
}

export const getUserPagApi = (pageIndex: number, pageSize: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.get(`/api/users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`)
            const content: UserModel[] = result.data.content.data
            const action: PayloadAction<UserModel[]> = getUserPagAction(content)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}

export const searchUserApi = (user: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.get(`/api/users/search/${user}`)
            const content: UserModel[] = result.data.content

            const action: PayloadAction<UserModel[]> = getUserBySearchAction(content)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }   
    }
}


export const createUserApi = (user: UserModel) => {
    return async (dispatch: AppDispatch) => {
        try {
            await http.post('/api/users/', user)
            const action: PayloadAction<UserModel> = createUserAction(user)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteUserApi = (userId: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            await http.delete(`/api/users?id=${userId}`)
            const action: PayloadAction<number> = deleteUserAction(userId)
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }
}