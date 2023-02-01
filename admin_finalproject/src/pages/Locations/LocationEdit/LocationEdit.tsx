import { Typography } from '@mui/material'
import { City, Country, State } from 'country-state-city'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import TextField from '../../../components/TextField/TextField'
import InputFileImage from '../../../components/UploadImage/InputFileImage'
import { AppDispatch, RootState } from '../../../redux/configStore'
import { getAllCities, getAllCountries, getAllStates } from '../../../redux/countryReducer/countryReducer'
import { getLocationByIdApi, updateLocationApi } from '../../../redux/locationReducer/locationReducer'

type Props = {}

const LocationEdit = (props: Props) => {
    const dispatch: AppDispatch = useDispatch()
    const { locationDetail, locations } = useSelector((state: RootState) => state.locationReducer)

    const { id } = useParams()

    useEffect(() => {
        dispatch(getLocationByIdApi(Number(id)))
    }, [id])

    const { countries, cities, states } = useSelector((state: RootState) => state.countryReducer)

    const [country, setCountry] = useState<string>(locationDetail?.quocGia!);
    const [state, setState] = useState<string>(locationDetail?.tinhThanh!);
    const [city, setCity] = useState<string>(locationDetail?.tenViTri!);
    const [countryId, setCountryId] = useState<string>("");

    const [image, setImage] = useState(locationDetail?.hinhAnh!)

    useEffect(() => {
        dispatch(getAllCountries(Country.getAllCountries()));
    }, []);

    const handleCountry = (countryCode: string) => {
        const dt = State.getAllStates().filter(
            (x) => x.countryCode === countryCode
        );
        dispatch(getAllStates(dt));

        Country.getAllCountries()
            .filter((x) => x.isoCode === countryCode)
            .map((country) => {
                setCountry(country.name);
                setCountryId(country.isoCode);
            });
    };

    const handleState = (stateId: string) => {
        const dt = City.getAllCities().filter(
            (x) => x.stateCode === stateId && x.countryCode === countryId
        );
        dispatch(getAllCities(dt));

        states
            .filter((x) => x.isoCode === stateId)
            .map((state) => {
                setState(state.name);
            });
    };

    const handleCity = (cityName: string) => {
        cities
            .filter((city) => city.name.includes(cityName))
            .map((c) => setCity(c.name));
    };

    const formik = useFormik({
        initialValues: {
            id: locationDetail?.id!,
            quocGia: locationDetail?.quocGia!,
            tinhThanh: locationDetail?.tinhThanh!,
            tenViTri: locationDetail?.tenViTri!,
            hinhAnh: locationDetail?.hinhAnh!
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            try {
                values.quocGia = country;
                values.tinhThanh = state;
                values.tenViTri = city;
                values.hinhAnh = image
                console.log(values)
                dispatch(updateLocationApi(Number(id), values))
                toast.success('Created location successfully')
            } catch (error) {
                toast.error('Created location failed. Try again please!!')
            }
        },
    });


    useEffect(() => {
        setCountry(locationDetail?.quocGia!)
        setState(locationDetail?.tinhThanh!)
        setCity(locationDetail?.tenViTri!)
        setImage(locationDetail?.hinhAnh!)
    }, [locationDetail])

    return (
        <form className="location__created--form" onSubmit={formik.handleSubmit}>
            <div className="location__created--image">
                <InputFileImage image={image} setImage={setImage} />
                <button className="location__created--button" type="submit">Submit</button>
            </div>
            <div className="">
                <TextField
                    classWrapperStyle="location__created--inputWrap"
                    label="ID"
                    classStyle={"location__created--input location__created--edit"}
                    formikName="id"
                    inputType="number"
                    formikValue={formik.values.id}
                    handleChange={formik.handleChange}
                    formikError={formik.errors.id}
                    onBlur={formik.handleBlur}
                    placeHolder="Room id: 01"
                    disabled
                />
                <div className="location__created--select">
                    <div className="location__created--selectItem">
                        <Typography>Country</Typography>
                        <select value={country} id="ddlCountry" className='form-control select-class' onChange={(e) => {
                            handleCountry(e.target.value)
                        }}>
                            <option value=''>{country}</option>
                            {countries && countries !== undefined
                                ? countries.map((ctr, index) => {
                                    return (
                                        <option key={index} value={ctr.isoCode}>
                                            {ctr.name}
                                        </option>
                                    );
                                })
                                : "No Country"}
                        </select>
                    </div>
                    <div className="location__created--selectItem">
                        <Typography>State</Typography>
                        <select id="ddlCountry" className='form-control select-class' onChange={(e) => handleState(e.target.value)}>
                        <option value={''}>{state}</option>
                            {states && states !== undefined
                                ? states.map((ctr, index) => {
                                    return (
                                        <option key={index} value={ctr.isoCode}>
                                            {ctr.name}
                                        </option>
                                    );
                                })
                                : "No State"}
                        </select>
                    </div>
                    <div className="location__created--selectItem">
                        <Typography>City</Typography>
                        <select id="ddlCountry" className='form-control select-class' onChange={(e) => handleCity(e.target.value)}>
                        <option value={''}>{city}</option>

                            {cities && cities !== undefined
                                ? cities.map((ctr, index) => {
                                    return (
                                        <option key={index} value={ctr.name}>
                                            {ctr.name}
                                        </option>
                                    );
                                })
                                : "No City"}
                        </select>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default LocationEdit