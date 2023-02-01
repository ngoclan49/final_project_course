import { Stack, Switch, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/configStore'
import { setAirToggle, setIronToggle, setKitchenToggle, setParkingToggle, setPoolToggle, setTiviToggle, setWashToggle, setWifiToggle } from '../../../redux/toggleReducer/toggleReducer'

type Props = {}

const FormToggle = (props: Props) => {
    const dispatch: AppDispatch = useDispatch()
    const { wifiToggle, tiviToggle, airToggle, washToggle, kitchenToggle, ironToggle, poolToggle, parkingToggle } = useSelector((state: RootState) => state.toggleReducer)
    
    return (
        <div className="body-right newRoomItem-toggle">
            <div className="newRoomItem ">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Television</Typography>
                    <Switch
                        checked={tiviToggle}
                        name="tivi"
                        onChange={() => dispatch(setTiviToggle(!tiviToggle))}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </Stack>
            </div>
            <div className="newRoomItem ">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Wifi</Typography>
                    <Switch
                        checked={wifiToggle}
                        name="wifi"
                        onChange={() => dispatch(setWifiToggle(!wifiToggle))}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </Stack>
            </div>
            <div className="newRoomItem ">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Parking</Typography>
                    <Switch
                        checked={parkingToggle}
                        name="doXe"
                        onChange={() => dispatch(setParkingToggle(!parkingToggle))}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </Stack>
            </div>
            <div className="newRoomItem ">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>A kitchen</Typography>
                    <Switch
                        checked={kitchenToggle}
                        name="bep"
                        onChange={() => dispatch(setKitchenToggle(!kitchenToggle))}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </Stack>
            </div>
            <div className="newRoomItem ">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Pool</Typography>
                    <Switch
                        checked={poolToggle}
                        name="hoBoi"
                        onChange={() => dispatch(setPoolToggle(!poolToggle))}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </Stack>
            </div>
            <div className="newRoomItem ">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Flat iron</Typography>
                    <Switch
                        checked={ironToggle}
                        name="banLa"
                        onChange={() => dispatch(setIronToggle(!ironToggle))}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </Stack>
            </div>
            <div className="newRoomItem ">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Air condition</Typography>
                    <Switch
                        checked={airToggle}
                        name="dieuHoa"
                        onChange={() => dispatch(setAirToggle(!airToggle))}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </Stack>
            </div>
            <div className="newRoomItem ">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Washing machine</Typography>
                    <Switch
                        checked={washToggle}
                        name="mayGiat"
                        onChange={() => dispatch(setWashToggle(!washToggle))}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </Stack>
            </div>
        </div>
    );
}

export default FormToggle