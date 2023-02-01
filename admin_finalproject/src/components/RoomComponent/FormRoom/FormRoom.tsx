import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { FormikErrors } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoomModel } from "../../../Models/RoomModel";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { getAllLocationApi } from "../../../redux/locationReducer/locationReducer";
import TextField from "../../TextField/TextField";

type Props = {
  values: RoomModel;
  onChange: <Value>(field: Value | React.ChangeEvent<any>) => void;
  onBlur: <Value>(field: Value | React.ChangeEvent<any>) => void;
  errors: FormikErrors<RoomModel>;
  country: string;
  setCountry: (value: string) => void;
};

const FormRoom = ({ values, onChange, onBlur, errors, country, setCountry }: Props) => {
  const { locations } = useSelector((state: RootState) => state.locationReducer);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLocationApi());
  }, []);


  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);

  };
  return (
    <div className="body-left">
      <TextField
        classWrapperStyle={"newRoomItem"}
        label="Room ID"
        classStyle={"roomCreateInput"}
        formikName="id"
        inputType="number"
        formikValue={values.id}
        handleChange={onChange}
        formikError={errors.id}
        onBlur={onBlur}
        placeHolder="Room id: 01"

      />
      <TextField
        classWrapperStyle={"newRoomItem"}
        label="Room Name"
        classStyle={"roomCreateInput"}
        formikName="tenPhong"
        inputType="text"
        formikValue={values.tenPhong}
        handleChange={onChange}
        formikError={errors.tenPhong}
        onBlur={onBlur}
        placeHolder="Enter name of room..."
      />
      <div className="newRoomItem-price">
        <TextField
          classWrapperStyle={"newRoomItem"}
          label="Number of Guest"
          classStyle={"roomCreateInput"}
          formikName="khach"
          inputType="number"
          formikValue={values.khach}
          handleChange={onChange}
          formikError={errors.khach}
          onBlur={onBlur}
        />
        <TextField
          classWrapperStyle={"newRoomItem"}
          label="Price"
          classStyle={"roomCreateInput"}
          formikName="giaTien"
          inputType="number"
          formikValue={values.giaTien}
          handleChange={onChange}
          formikError={errors.giaTien}
          onBlur={onBlur}
          placeHolder="$123..."
        />
        <div className="newRoomItem">
          <FormControl fullWidth sx={{ minWidth: 160 }}>
            <Typography>Country</Typography>
            <Select
              value={country as unknown as string}
              onChange={handleChange}
              inputProps={{ "aria-label": "Without label" }}
            >
              {locations.map((position) => (
                <MenuItem key={position.id} value={position.id}>
                  {position.tenViTri}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="roomCreateInput-rooms">
        <TextField
          classWrapperStyle={"newRoomItem"}
          label="Bathroom"
          classStyle={"roomCreateInput"}
          formikName="phongTam"
          inputType="number"
          formikValue={values.phongTam}
          handleChange={onChange}
          onBlur={onBlur}
          placeHolder="Bathroom: 0"
        />
        <TextField
          classWrapperStyle={"newRoomItem"}
          label="Bedroom"
          classStyle={"roomCreateInput"}
          formikName="phongNgu"
          inputType="number"
          formikValue={values.phongNgu}
          handleChange={onChange}
          onBlur={onBlur}
          placeHolder="Bedroom: 2"
        />
        <TextField
          classWrapperStyle={"newRoomItem"}
          label="Bed"
          classStyle={"roomCreateInput"}
          formikName="giuong"
          inputType="number"
          formikValue={values.giuong}
          handleChange={onChange}
          onBlur={onBlur}
          placeHolder="Bed: 1"
        />
      </div>
      <div className="newRoomItem">
        <label htmlFor="">Description</label>
        <textarea placeholder="Description..." name="moTa" onChange={onChange} onBlur={onBlur} value={values.moTa} rows={10} cols={10} ></textarea>
      </div>
    </div>

  );

};

export default FormRoom;

