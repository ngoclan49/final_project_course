import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RoomModel } from '../../../Models/RoomModel'
import { AppDispatch, RootState } from '../../../redux/configStore'
import { getLocationByIdApi } from '../../../redux/locationReducer/locationReducer'
import './cardModal.css'
type Props = {
    roomDetail: RoomModel | null,
    onClose: () => void
}

const CardModal = ({ roomDetail, onClose }: Props) => {
    const dispatch: AppDispatch = useDispatch()
    const { locationDetail } = useSelector(
        (state: RootState) => state.locationReducer
    );
    useEffect(() => {
        dispatch(getLocationByIdApi(Number(roomDetail?.maViTri)));
    }, []);
    return (
        <div id="container" onClick={onClose}>
            <div className="product-details">
                <h1>{roomDetail?.tenPhong}</h1>
                <div className="locationWrapper">
                    <span className="hint-star">
                        {locationDetail?.tinhThanh} - {locationDetail?.tenViTri} -{" "}
                        {locationDetail?.quocGia}
                    </span>
                    <span className="guest">Guest: {roomDetail?.khach}</span>
                </div>

                <p className="information">" {roomDetail?.moTa} "</p>
                <div className='buttonWrapper'>
                    <div className="control">
                        <button className="btn">
                            <span className="price">${roomDetail?.giaTien}</span>
                            <span className="shopping-cart">
                                <i className="fa fa-shopping-cart" aria-hidden="true" />
                            </span>
                            <span className="buy">Price</span>
                        </button>

                    </div>
                    <div className='buttonClose'>
                        <button className='btn'>
                            <span onClick={onClose} className="buy">Close</span>
                        </button>
                    </div>
                </div>

            </div>
            <div className="product-image">
                <img src={roomDetail?.hinhAnh} />
                <div className="info">
                    <h2> Description</h2>
                    <ul>
                        <li>
                            <strong>Bedroom : </strong>
                            {roomDetail?.phongNgu}
                        </li>
                        <li>
                            <strong>Bed : </strong>
                            {roomDetail?.giuong}
                        </li>
                        <li>
                            <strong>Bathroom: </strong>
                            {roomDetail?.phongTam}
                        </li>
                        <li>
                            <strong>Utilities: </strong>
                            {roomDetail?.mayGiat && "Washing machine"}
                            {roomDetail?.tivi && " - Television"}
                            {roomDetail?.dieuHoa && " - Air condition"}
                            {roomDetail?.bep && " - A kitchen"}
                            {roomDetail?.doXe && " - Parking"}
                            {roomDetail?.hoBoi && " - Pool "}
                            {roomDetail?.wifi && " - Wifi "}
                            {roomDetail?.banLa && " - Flat iron "}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CardModal