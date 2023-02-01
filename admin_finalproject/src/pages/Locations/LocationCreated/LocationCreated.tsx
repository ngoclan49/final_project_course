import React, { useEffect, useState } from "react";
import {
  Country,
  State,
  City,
} from "country-state-city";
import './locationCreated.css'
import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { getAllCities, getAllCountries, getAllStates } from "../../../redux/countryReducer/countryReducer";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import InputFileImage from "../../../components/UploadImage/InputFileImage";
import upload from '../../../assets/images/upload.png'
import { motion } from "framer-motion";
import { LocationModel } from "../../../Models/LocationModel";
import { createLocationApi } from "../../../redux/locationReducer/locationReducer";

const LocationCreated = () => {
  const dispatch: AppDispatch = useDispatch()
  const { countries, cities, states } = useSelector((state: RootState) => state.countryReducer)

  const [country, setCountry] = useState<string>("Select Country");
  const [state, setState] = useState<string>("Select State");
  const [city, setCity] = useState<string>("Select City");
  const [countryId, setCountryId] = useState<string>("");

  const [image, setImage] = useState(upload)

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

  const formik = useFormik<LocationModel>({
    initialValues: {
      id: 0,
      quocGia: "",
      tinhThanh: "",
      tenViTri: "",
      hinhAnh: ""
    },
    onSubmit: (values) => {
      try {
        values.quocGia = country;
        values.tinhThanh = state;
        values.tenViTri = city;
        values.hinhAnh = image
        console.log('click');
        dispatch(createLocationApi(values))
        toast.success('Created location successfully')
      } catch (error) {
        toast.error('Created location failed. Try again please!!')
      }
    },
  });
  return (  
    <form className="location__created--form" onSubmit={formik.handleSubmit}>
      <div className="location__created--image">
        <InputFileImage image={image} setImage={setImage} />
        <motion.button whileTap={{scale: 1.1}} type='submit' className="location__created--button">Submit</motion.button>
      </div>
      <div className="">
        <div className="location__created--select">
          <div className="location__created--selectItem">
            <Typography>Country</Typography>
            <select id="ddlCountry" className='form-control select-class' onChange={(e) => handleCountry(e.target.value)}>
              <option value="0">Select Country</option>
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
            {formik.errors.quocGia ? <span className="error">{formik.errors.quocGia}</span>  : ''}
          </div>
          <div className="location__created--selectItem">
            <Typography>State</Typography>
            <select id="ddlCountry" className='form-control select-class' onChange={(e) => handleState(e.target.value)}>
              <option value="0">Select State</option>
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
            {formik.errors.tinhThanh ? <span className="error">{formik.errors.tinhThanh}</span>  : ''}

          </div>
          <div className="location__created--selectItem">
          <Typography>City</Typography>
            <select id="ddlCountry" className='form-control select-class' onChange={(e) => handleCity(e.target.value)}>
              <option value="0">Select City</option>
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
            {formik.errors.tenViTri ? <span className="error">{formik.errors.tenViTri}</span>  : ''}

          </div>
        </div>
      </div>
    </form>
  );
};

export default LocationCreated;
