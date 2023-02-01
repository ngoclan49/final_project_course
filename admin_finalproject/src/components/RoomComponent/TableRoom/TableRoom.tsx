// library
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Settings } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { AiOutlineEye } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { RiExchangeBoxLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Modal } from '@mui/material'
// model
import { LocationModel } from '../../../Models/LocationModel'
import { RoomModel } from '../../../Models/RoomModel'
// redux store
import { AppDispatch, RootState } from '../../../redux/configStore'
import { getAllLocationApi } from '../../../redux/locationReducer/locationReducer'
import { getRoomByIdApi, deleteRoomByIdApi } from '../../../redux/roomReducer/roomReducer'
// image
import upload from '../../../assets/images/upload.png'
//component
import CardModal from '../CardModal/CardModal'
// css
import './tableRoom.css'
import { Link } from 'react-router-dom'
import UploadImage from '../../UploadImage/UploadImage'
import { style } from '../../../assets/data/styleCardModal'
type Props = {
    room: RoomModel
}
const TableRoom = ({ room }: Props) => {
    const dispatch: AppDispatch = useDispatch()
    const { locations } = useSelector((state: RootState) => state.locationReducer);
    const { roomDetail } = useSelector((state: RootState) => state.roomReducer);

    const { id, tenPhong, khach, giaTien, hinhAnh, maViTri } = room

    const [show, setShow] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = useState<string>(upload)

    const handleOpenCard = () => {
        setShow(true);
    }
    const handleCloseCard = () => setShow(false)
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        dispatch(getRoomByIdApi(id))
        setOpen(true);
    }

    const renderLocation = useCallback((pos: number) => {
        const findLocation = locations.find((position: LocationModel) => position.id === pos)
        return (
            <>{findLocation?.tenViTri}</>
        )
    }, [])

    const handleDelete = () => {
        dispatch(deleteRoomByIdApi(id))
    }

    useEffect(() => {
        dispatch(getAllLocationApi());
    }, []);

    return (
        <>
            <tr >
                <td>
                    {tenPhong.length > 20
                        ? tenPhong.substring(0, 20) + "..."
                        : tenPhong}
                </td>
                <td>
                    <div className='roomImage-container'>
                        <div className='roomImage'>
                            <img className='mainImage ' src={hinhAnh ? hinhAnh : ''} alt="" />
                        </div>
                        <motion.button whileTap={{ scale: 1.1 }} onClick={handleOpenCard} className="uploadIcon"><Settings className='icon' />Upload </motion.button>
                    </div>
                </td>
                <td>
                    {renderLocation(maViTri)}
                </td>
                <td>
                    {khach}
                </td>
                <td>
                    $ {giaTien}
                </td>
                <td>
                    <div className="button">
                        <span onClick={handleDelete} className="buttonDel"><BsTrash />
                        </span>
                        <span>
                            <Link to={`/rooms/${id}`} className="buttonEdit"><RiExchangeBoxLine /></Link>
                        </span>
                        <span onClick={handleOpen} className="buttonView"><AiOutlineEye /></span>
                    </div>
                </td>
            </tr>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='search-card-grid'>
                    <CardModal onClose={handleClose} roomDetail={roomDetail} />
                </Box>
            </Modal>

            <UploadImage show={show} handleClose={handleCloseCard} image={image} setImage={setImage} id={id} setShow={setShow} />
        </>
    )
}

export default memo(TableRoom)