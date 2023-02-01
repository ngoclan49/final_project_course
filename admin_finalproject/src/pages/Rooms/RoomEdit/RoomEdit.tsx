import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { getRoomByIdApi, updateRoomApi } from "../../../redux/roomReducer/roomReducer";
import { useParams } from "react-router-dom";
import "./roomEdit.css";
import { RoomModel } from "../../../Models/RoomModel";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import FormRoom from "../../../components/RoomComponent/FormRoom/FormRoom";
import { roomValidation, validationToggle } from "../../../util/validation/roomValidation";
import InputFileImage from "../../../components/UploadImage/InputFileImage";
import { setAirToggle, setIronToggle, setKitchenToggle, setParkingToggle, setPoolToggle, setTiviToggle, setWashToggle, setWifiToggle } from "../../../redux/toggleReducer/toggleReducer";
import FormToggle from "../../../components/RoomComponent/ToggleForm/FormToggle";
type Props = {};

const RoomEdit = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { roomDetail } = useSelector((state: RootState) => state.roomReducer);

  const { id } = useParams();

  const [image, setImage] = useState(roomDetail?.hinhAnh!)

  const { wifiToggle, tiviToggle, airToggle, washToggle, kitchenToggle, ironToggle, poolToggle, parkingToggle } = useSelector((state: RootState) => state.toggleReducer)

  const [country, setCountry] = useState('')
  
  useEffect(() => {
    dispatch(getRoomByIdApi(Number(id)));
  }, []);

  useEffect(() => {
    setImage(roomDetail?.hinhAnh!)
    setCountry(roomDetail?.maViTri! as unknown as string)
    dispatch(setWifiToggle(roomDetail?.wifi!))
    dispatch(setTiviToggle(roomDetail?.tivi!))
    dispatch(setParkingToggle(roomDetail?.doXe!))
    dispatch(setKitchenToggle(roomDetail?.bep!))
    dispatch(setPoolToggle(roomDetail?.hoBoi!))
    dispatch(setIronToggle(roomDetail?.banLa!))
    dispatch(setAirToggle(roomDetail?.dieuHoa!))
    dispatch(setWashToggle(roomDetail?.mayGiat!))
  }, [roomDetail])

  const formik = useFormik<RoomModel>({
    initialValues: {
      id: roomDetail?.id!,
      tenPhong: roomDetail?.tenPhong!,
      khach: roomDetail?.khach!,
      phongNgu: roomDetail?.phongNgu!,
      giuong: roomDetail?.giuong!,
      phongTam: roomDetail?.phongTam!,
      moTa: roomDetail?.moTa!,
      giaTien: roomDetail?.giaTien!,
      mayGiat:  roomDetail?.mayGiat!,
      banLa: roomDetail?.banLa!,
      tivi: roomDetail?.tivi!,
      dieuHoa: roomDetail?.dieuHoa!,
      wifi: roomDetail?.wifi!,
      bep: roomDetail?.bep!,
      doXe: roomDetail?.doXe!,
      hoBoi: roomDetail?.hoBoi!,
      maViTri: roomDetail?.maViTri!,
      hinhAnh: roomDetail?.hinhAnh!,
    },
    enableReinitialize: true,
    validationSchema: roomValidation,
    onSubmit: (values) => {
      try {

       validationToggle(washToggle, kitchenToggle, wifiToggle, tiviToggle, parkingToggle, airToggle, poolToggle, ironToggle, values)
        values.maViTri = Number(country)
        values.hinhAnh = image

        dispatch(updateRoomApi(Number(id), values))
        toast.success("Update room successfully");
      } catch (error) {
        toast.error("Update failed. Try again!");
      }
    },
  });

  return (
    <>
      <div className="roomCreate-header">
        <h1>Edit room</h1>
      </div>
      <div className="formEidt">
        <form onSubmit={formik.handleSubmit} className="roomCreate-body roomEdit-body">
          <FormRoom
            values={formik.values}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={formik.errors}
            country={country}
            setCountry={setCountry}
          />
          <div>
          <div>
            <InputFileImage image={image} setImage={setImage} />
          </div>
         <FormToggle />
          </div>
         

          <div className="roomCreated-button-wrap">
            <button type="submit" className="roomCreated-button">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RoomEdit;
