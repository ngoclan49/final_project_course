// library
import React, {useEffect} from 'react'
import AOS from 'aos'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'
// icons
import { CiLocationOn } from 'react-icons/ci'
import {HiOutlineClipboardCheck} from 'react-icons/hi'
// css
import '../../assets/css/cardList.css' 
// model
import { PositionModel } from '../../Models/PositionModel'

type Props = {
  position: PositionModel
}
const CardList = ({ position }: Props) => {

  // animation
  useEffect(() => {
    AOS.init({duration: 2000})
  }, [])

  const { tenViTri, tinhThanh, quocGia, hinhAnh, id } = position
  
  return (
    <div className='singleDestination' data-aos='fade-up'>
      <div className="imageDiv">
        <img src={hinhAnh} alt="" />
      </div>
      <div className="cardInfo">
        <h4 className='desTitle'>{tenViTri}</h4>
        <span className='continent flex'>
          <CiLocationOn className='icon' />
          <span className='name'>{tinhThanh}</span>
        </span>
        <div className="countries flex">
          <div className="country">
              <h5>{quocGia}</h5>
          </div>
          <div className="id">
              <h5>ID: {id}</h5>
          </div>
        </div>
        <div className="desc">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi dolore placeat possimus.</p>
        </div>
        <motion.button  whileTap={{scale: 1.1}} className="btnOuline flex">
          <Link to={`/search/${id}`}>
           DETAILS <HiOutlineClipboardCheck className='icon' />
          </Link>
        </motion.button>
      </div>
    </div>

  )
}

export default CardList