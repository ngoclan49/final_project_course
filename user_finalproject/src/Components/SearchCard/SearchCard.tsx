import React, {useEffect} from "react";
import { RoomModel } from "../../Models/RoomModel";
import "../../assets/css/searchCard.css";
import { AiOutlineHeart, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import AOS from 'aos';

type Props = {
  room: RoomModel;
};

const SearchCard = ({ room }: Props) => {
   // animation
  useEffect(() => {
    AOS.init({ duration: 2000 })
  }, [])
  const {
    id,
    tenPhong,
    khach,
    giuong,
    phongNgu,
    phongTam,
    giaTien,
    mayGiat,
    banLa,
    tivi,
    dieuHoa,
    wifi,
    bep,
    doXe,
    hoBoi,
    hinhAnh,
  } = room;
  return (
    <div data-aos='fade-right' className="search-card">
      <div className="search-card--image">
        <img src={hinhAnh} alt="" />
      </div>
      <div className="search-card--detail">
        <div className="d-flex justify-content-between">
          <h4>{tenPhong}</h4>
          <AiOutlineHeart className="icon" />
        </div>
        <p className="search-card--guest">Number of guests: {khach}</p>
        <div className="search-card--des">
          <div className="des-tag des-tag-1">Bedroom : {phongNgu}</div>
          <div className="des-tag des-tag-2">Bathroom : {phongTam}</div>
          <div className="des-tag des-tag-3">Bed : {giuong}</div>
        </div>
        <div className="search-card--ultilities">
          <p>
            {mayGiat && "Washing machine"}
            {tivi && " - Television"}
            {dieuHoa && " - Air condition"}
            {bep && " - A kitchen"}
            {doXe && " - Parking"}
            {hoBoi && " - Pool "}
            {wifi && " - Wifi "}
            {banLa && " - Flat iron "}
          </p>
        </div>
        <div className="search-card--price">
          <div className="search-card--button">
            <Link to={`/detail/${id}`}>
              {" "}
              Detail <AiOutlineArrowRight className="icon" />
            </Link>
          </div>
          <p className="price">${giaTien}/night</p>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
