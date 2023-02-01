import React from 'react'
import { LocationModel } from '../../../Models/LocationModel'
import './cardLocation.css'

type Props = {
  locationDetail: LocationModel | null
  onClose: () => void
}

const CardLocation = ({ locationDetail, onClose }: Props) => {
  return (
    <div className="card">
      <div className="face face1">
        <div className="content">
          <div className="icon">
            <img src={locationDetail?.hinhAnh} alt="" />
          </div>
        </div>
      </div>
      <div className="face face2">
        <div className='faceWrapper'>
          <div className="content">
            <h3>
              <a href="#" target="_blank">{locationDetail?.tenViTri}</a>
            </h3>
            <p>{locationDetail?.tinhThanh} - {locationDetail?.quocGia}</p>
          </div>
          <button onClick={onClose}>Close</button>

        </div>

      </div>

    </div>


  )
}

export default CardLocation