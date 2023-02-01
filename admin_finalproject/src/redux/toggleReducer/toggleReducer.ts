import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tiviToggle: false,
    wifiToggle: false,
    parkingToggle: false,
    kitchenToggle: false,
    airToggle: false,
    washToggle: false,
    poolToggle: false,
    ironToggle: false,
};

const toggleReducer = createSlice({
    name: "toggleReducer",
    initialState,
    reducers: {
        setWifiToggle: (state, action) => {
            state.wifiToggle = action.payload;
        },
        setTiviToggle: (state, action) => {
            state.tiviToggle = action.payload;
        },
        setIronToggle: (state, action) => {
            state.ironToggle = action.payload;
        },
        setAirToggle: (state, action) => {
            state.airToggle = action.payload;
        },
        setWashToggle: (state, action) => {
            state.washToggle = action.payload;
        },
        setPoolToggle: (state, action) => {
            state.poolToggle = action.payload;
        },
        setParkingToggle: (state, action) => {
            state.parkingToggle = action.payload;
        },
        setKitchenToggle: (state, action) => {
            state.kitchenToggle = action.payload;
        },
    },
});

export const { setWifiToggle, setTiviToggle, setIronToggle, setAirToggle, setWashToggle, setPoolToggle, setParkingToggle, setKitchenToggle } = toggleReducer.actions;

export default toggleReducer.reducer;
