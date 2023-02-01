import { Settings } from '@mui/icons-material'
import { Box, Modal } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { RiExchangeBoxLine } from 'react-icons/ri'
import { UserModel } from '../../../Models/UserModel'
import { style } from '../../../assets/data/styleCardModal'
import './userTable.css'
import CardUser from '../CardUser/CardUser'
import { AppDispatch, RootState } from '../../../redux/configStore'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserApi, getUserByIdApi } from '../../../redux/userReducer/userReducer'
import { styleGender, makeStyle } from '../../../assets/data/styleRole'
import { Link } from 'react-router-dom'
import avatarImage from '../../../assets/images/avatar.png'
import UploadImage from '../../UploadImage/UploadImage'
type Props = {
    users: UserModel
}

const UserTable = ({ users }: Props) => {
    const dispatch: AppDispatch = useDispatch()
    const [image, setImage] = useState<string>(avatarImage)

    const { id, name, email, avatar, birthday, gender, role, phone } = users
    const { userDetail } = useSelector((state: RootState) => state.userReducer)
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const handleOpenCard = () => {
        setShow(true);
    }
    const handleCloseCard = () => setShow(false)

    const handleDelete = () => {
        dispatch(deleteUserApi(id))
    }

    const handleOpen = () => {
        dispatch(getUserByIdApi(id))
        setOpen(true)
    }
    const handleClose = () => setOpen(false)

    return (
        <>
            <tr >
                <td>
                    <span>{id}</span>
                </td>
                <td>
                    <div className='userWrapper'>
                        <div className='userImage'>
                            <img className='mainImage ' src={avatar ? avatar : 'https://cdn.imgbin.com/11/7/24/imgbin-pikachu-pok-mon-trainer-the-pok-mon-company-piplup-pikachu-mask-YSTG546XTbYZqssd99jEa8Yx6.jpg'} alt="" />
                        </div>
                        <motion.button whileTap={{ scale: 1.1 }} onClick={handleOpenCard} className="uploadIcon"><Settings className='icon' />Upload </motion.button>
                    </div>
                </td>
                <td>
                    {name}
                </td>
                <td>
                    {email.length > 10
                        ? email.substring(0, 10) + "..."
                        : email}
                </td>
                <td>
                        {birthday}
                </td>
                <td>
                    <span className='userGender' style={styleGender(gender)}>{gender ? 'Male' : 'Female'}</span>
                </td>
                <td>
                    {phone}
                </td>
                <td>
                    <span className='userRole' style={makeStyle(role)}>{role}</span>
                </td>
                <td>
                    <div className="button">
                        <span onClick={handleDelete} className="buttonDel"><BsTrash />
                        </span>
                        <span>
                            <Link to={`/users/${id}`} className="buttonEdit"><RiExchangeBoxLine /></Link>
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
                <Box sx={style} className='card-grid'>
                    <CardUser onClose={handleClose} userDetail={userDetail} />
                </Box>
            </Modal>


            <UploadImage show={show} handleClose={handleCloseCard} image={image} setImage={setImage} id={id} setShow={setShow} />
        </>
    )
}

export default UserTable