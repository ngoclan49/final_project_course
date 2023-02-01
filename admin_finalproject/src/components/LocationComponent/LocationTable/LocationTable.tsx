// library
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Modal } from '@mui/material'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { RiExchangeBoxLine } from 'react-icons/ri'
import { AiOutlineEye } from 'react-icons/ai'
import { Settings } from '@mui/icons-material'
// component
import UploadImage from '../../UploadImage/UploadImage'
import CardLocation from '../CardLocation/CardLocation'
import LocationEdit from '../../../pages/Locations/LocationEdit/LocationEdit'
//model
import { LocationModel } from '../../../Models/LocationModel'
// redux 
import { AppDispatch, RootState } from '../../../redux/configStore'
import { deleteLocationApi, getLocationByIdApi } from '../../../redux/locationReducer/locationReducer'
// style, image 
import upload from '../../../assets/images/upload.png'
import './locationTable.css'
import { style } from '../../../assets/data/styleCardModal'

type Props = {
    location: LocationModel,

}

const LocationTable = ({ location }: Props) => {
    const dispatch: AppDispatch = useDispatch()
    const { locationDetail } = useSelector((state: RootState) => state.locationReducer)
    const { id, tenViTri, hinhAnh, tinhThanh, quocGia } = location

    // state show/close component Upload image
    const [show, setShow] = React.useState(false);
    // state show/close component Location Detail
    const [open, setOpen] = React.useState(false);
    // state show/close component Open Edit
    const [openEdit, setOpenEdit] = React.useState(false);
    
    const [image, setImage] = useState<string>(upload)

    const handleOpenCard = () => {
        setShow(true);
    }

    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        dispatch(getLocationByIdApi(id))
        setOpen(true);
    }

    const handleOpenCardEdit = () => setOpenEdit(true);
    const handleCloseCardEdit = () => setOpenEdit(false);


    const handleDelete = () => {
        dispatch(deleteLocationApi(id))
    }

    return (
        <>
            <tr >
                <td>
                    <span>{id}</span>
                </td>
                <td>
                    <div className='roomImage-container '>
                        <div className='roomImage locationImage'>
                            <img className='mainImage ' src={hinhAnh ? hinhAnh : ''} alt="" />
                        </div>
                        <motion.button whileTap={{ scale: 1.1 }} onClick={handleOpenCard} className="uploadIcon"><Settings className='icon' />Upload </motion.button>
                    </div>
                </td>
                <td>
                    {tenViTri}
                </td>
                <td>
                    {tinhThanh}
                </td>
                <td>
                    {quocGia}
                </td>
                <td>
                    <div className="button">
                        <span onClick={handleDelete} className="buttonDel"><BsTrash />
                        </span>
                        <span onClick={handleOpenCardEdit}>
                            <Link to={`/admin/locations/${id}`} className="buttonEdit"><RiExchangeBoxLine /></Link>
                        </span>
                        <span onClick={handleOpen} className="buttonView"><AiOutlineEye /></span>
                    </div>
                </td>
            </tr>
            {/* ======================== Location Edit ========================= */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='card-grid'>
                    <CardLocation onClose={handleClose} locationDetail={locationDetail} />
                </Box>
            </Modal>

            {/* ======================== Location Edit ========================= */}
            <Modal
                open={openEdit}
                onClose={handleCloseCardEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='cardLocation-create'>
                    <LocationEdit />
                </Box>
            </Modal>

            {/* ======================== Upload Image ========================= */}
            <UploadImage show={show} handleClose={handleClose} image={image} setImage={setImage} id={id} setShow={setShow} />
        </>
    )
}

export default LocationTable