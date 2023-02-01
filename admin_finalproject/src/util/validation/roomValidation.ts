import { useSelector } from 'react-redux';
import * as Yup from 'yup'
import { RoomModel } from '../../Models/RoomModel';
import { RootState } from '../../redux/configStore';


export const roomValidation = Yup.object({
  id: Yup.string().required('Required'),
  tenPhong: Yup.string().required('Required'),
  maViTri: Yup.string().required('Required'),
  giaTien: Yup.string().required('Required'),
  khach: Yup.string().required('Required'),
  moTa: Yup.string().required('Required'),

})

export const validationToggle = (washToggle: boolean, kitchenToggle: boolean, wifiToggle: boolean, tiviToggle: boolean, parkingToggle: boolean, airToggle: boolean, poolToggle: boolean, ironToggle: boolean, values: RoomModel) => {
  wifiToggle ? (values.wifi = true) : (values.wifi = false);
  tiviToggle ? (values.tivi = true) : (values.tivi = false);
  parkingToggle ? (values.doXe = true) : (values.doXe = false);
  kitchenToggle ? (values.bep = true) : (values.bep = false);
  poolToggle ? (values.hoBoi = true) : (values.hoBoi = false);
  ironToggle ? (values.banLa = true) : (values.banLa = false);
  airToggle ? (values.dieuHoa = true) : (values.dieuHoa = false);
  washToggle ? (values.mayGiat = true) : (values.mayGiat = false);
};
