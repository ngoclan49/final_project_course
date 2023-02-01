import React, { useEffect } from 'react'
import { AiOutlineCalendar, AiOutlineClose, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { BsGenderAmbiguous } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { UserModel } from '../../../Models/UserModel'
import { AppDispatch } from '../../../redux/configStore'
import './cardUser.css'
type Props = {
  onClose: () => void,
  userDetail: UserModel | null
}

const CardUser = ({ userDetail, onClose }: Props) => {
  const dispatch: AppDispatch = useDispatch()

  return (
    <div>
      <figure className="snip0057 blue hover">
        <span className='close' onClick={onClose}><AiOutlineClose /></span>
        <figcaption>
          <h2>{userDetail?.name} - <span>ID: {userDetail?.id}</span></h2>
          <p><AiOutlineMail />{userDetail?.email}</p>
          <p><AiOutlinePhone /> {userDetail?.phone}</p>
          <div className='cardUser-wrapper'>
            <p><BsGenderAmbiguous /> {userDetail?.gender ? 'Male' : 'Female'}</p>
            <p><AiOutlineCalendar />{userDetail?.birthday}</p>
          </div>
          <div className="icons"><a href="#"><i className="ion-ios-home" /></a><a href="#"><i className="ion-ios-email" /></a><a href="#"><i className="ion-ios-telephone" /></a></div>
        </figcaption>
        <div className="image"><img src={userDetail?.avatar ? userDetail.avatar : 'https://cdn.imgbin.com/11/7/24/imgbin-pikachu-pok-mon-trainer-the-pok-mon-company-piplup-pikachu-mask-YSTG546XTbYZqssd99jEa8Yx6.jpg'} alt="sample4" /></div>
        <div className="position">Role: {userDetail?.role}</div>
      </figure>

    </div>

  )
}

export default CardUser