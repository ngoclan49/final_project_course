import { Publish } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import './roomCreated.css'

import { useFormik } from 'formik'
import { RoomModel } from '../../../Models/RoomModel'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../../redux/configStore'
import { getAllLocationApi } from '../../../redux/locationReducer/locationReducer'
import { createRoomApi } from '../../../redux/roomReducer/roomReducer'
import { toast } from 'react-toastify'
import upload from '../../../assets/images/upload.png'

import FormRoom from '../../../components/RoomComponent/FormRoom/FormRoom'
import { roomValidation, validationToggle } from '../../../util/validation/roomValidation'
import InputFileImage from '../../../components/UploadImage/InputFileImage'
import FormToggle from '../../../components/RoomComponent/ToggleForm/FormToggle'

type Props = {}

const RoomCreated = (props: Props) => {

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllLocationApi())
  }, [])
  const [image, setImage] = useState(upload)
  const { wifiToggle, tiviToggle, airToggle, washToggle, kitchenToggle, ironToggle, poolToggle, parkingToggle } = useSelector((state: RootState) => state.toggleReducer)


  const [country, setCountry] = React.useState('');

  const formik = useFormik<RoomModel>({
    initialValues: {
      id: 0,
      tenPhong: "",
      khach: 0,
      phongNgu: 0,
      giuong: 0,
      phongTam: 0,
      moTa: "",
      giaTien: 0,
      mayGiat: true,
      banLa: true,
      tivi: true,
      dieuHoa: true,
      wifi: true,
      bep: true,
      doXe: true,
      hoBoi: true,
      maViTri: 0,
      hinhAnh: ''
    },
    validationSchema: roomValidation
    ,
    onSubmit: (values) => {
      try {
        values.maViTri = Number(country)

        validationToggle(washToggle, kitchenToggle, wifiToggle, tiviToggle, parkingToggle, airToggle, poolToggle, ironToggle, values)

        values.hinhAnh = image
        dispatch(createRoomApi(values))
        toast.success('Created room successfully')
      } catch (error) {
        toast.error('Create failed. Try again!')
      }
    }
  })

  return (
    <div className='roomCreate'>
      <div className='roomCreate-header'>
        <h1>Create new room</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className="roomCreate-body">
        <FormRoom values={formik.values} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors} country={country} setCountry={setCountry} />
        <div>
          <div>
            <InputFileImage image={image} setImage={setImage} />
          </div>
          <FormToggle />
        </div>


        <div className="roomCreated-button-wrap">
          <button className='roomCreated-button'>Submit</button>
        </div>
      </form>

    </div>
  )
}

export default RoomCreated