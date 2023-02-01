import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import ReactPaginate from 'react-paginate';
import AOS from 'aos';
//icon
import { BsListTask, BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import {
  AiOutlineInstagram,
} from "react-icons/ai";
import { FiFacebook } from "react-icons/fi";
import { FaTripadvisor } from "react-icons/fa";
import { TbApps } from "react-icons/tb";

//css
import "../../assets/css/home.css";
import "../../assets/css/cardList.css";

//redux store
import { getDestinationApi, getDesPaginationApi } from '../../redux/positionReducer/positionReducer';
import { AppDispatch, RootState } from "../../redux/configureStore";
import { PositionModel } from "../../Models/PositionModel";
import { RoomModel } from "../../Models/RoomModel";
import { getRoomApi } from "../../redux/roomReducer/roomReducer";
// Component
import CardList from '../../Components/CardList/CardList';
import HeaderComponent from '../../Components/Header/HeaderComponent';

type Props = {

}
const Home = (props: Props) => {

  // animation
  useEffect(() => {
    AOS.init({ duration: 2000 })
  }, [])

  //video
  const video = require("../../assets/video/video.mp4")

  const dispatch: AppDispatch = useDispatch();
  // lấy dữ liệu từ api
  const { destination, pagination } = useSelector((state: RootState) => state.positionReducer);
  // list vị trí
  const [pos, setPos] = useState<PositionModel[]>(destination)
  // Trang hiện tại 
  const [pageNumber, setPageNumber] = useState<number>(1)
  // Số lượng dữ liệu ở mỗi page
  const productPerPage = 10
  // Tính tổng page 
  const totalPages = Math.ceil(destination.length / productPerPage);

  const handleNextPage = () => {
    const hasNextPage = pageNumber === totalPages ? false : setPageNumber(prevPage => prevPage + 1);
    return hasNextPage
  }

  const handlePreviousPage = () => {
    const hasPreviousPage = pageNumber === 1 ? false : setPageNumber(prevPage => prevPage - 1);
    return hasPreviousPage
  }

  const handleClickPosition = (desProvince: string) => {
    const renderPosById = destination.filter(item => item.tinhThanh.toLowerCase().includes(desProvince.toLowerCase()))
    setPos(renderPosById)
  }

  const handleShowAllPos = () => {
    dispatch(getDestinationApi())
  }

  useEffect(() => {
    dispatch(getDestinationApi());
  }, []);

  useEffect(() => {
    dispatch(getRoomApi())
  }, [])

  useEffect(() => {
    setPos(destination)
  }, [destination])

  useEffect(() => {
    dispatch(getDesPaginationApi(pageNumber, productPerPage))
  }, [pageNumber])

  return (
    <>
      {/* ===================== CAROUSEL ======================= */}
      <section className="carousel">
        <div className="overlay"></div>
        <video autoPlay muted loop >
          <source src={video} type="video/mp4" />
        </video>
        <div className="carouselContent container">
          <div className="textDiv">
            <span data-aos='fade-up' className="smallText">Our Packages</span>
            <h1 data-aos='fade-up' className="carouselTitle">Search your Holiday</h1>
          </div>

          <div data-aos='fade-up' className="cardDiv grid">
            <HeaderComponent />
          </div>

          <div data-aos='fade-up' className="carouselFooterIcon flex">
            <div className="rightIcons">
              <FiFacebook className="icon" />
              <AiOutlineInstagram className="icon" />
              <FaTripadvisor className="icon" />
            </div>
            <div className="leftIcons">
              <BsListTask className="icon" />
              <TbApps className="icon" />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Destination ======================= */}

      <section className="destination">
        <div className="container">
          <div className="flex justify-content-between">
            <h2 data-aos="fade-right" className="mt-5 pb-3 fw-600">Explore <span className="title">Nearby</span> </h2>
            <ReactPaginate
              pageCount={0}
              containerClassName="paginationBtns"
              nextLabel={<BsArrowRightShort onClick={handleNextPage} />}
              previousLabel={<BsArrowLeftShort onClick={handlePreviousPage} />}
            />
          </div>
          <div className="desCard">
            {pagination?.map((des: PositionModel, index) => {
              return (
                <motion.div
                  whileTap={{ scale: 1.1 }}
                  key={index}
                  className="desCard__detail"
                  data-aos="zoom-in-up"
                  onClick={() => handleClickPosition(des.tinhThanh)}
                >
                  <div className="overlay"> </div>
                  <img
                    className="desCard__detail--image"
                    src={des.hinhAnh}
                    alt=""
                  />
                  <span className="desCard__detail--text">
                    <h3>{des.tinhThanh}</h3>
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== Card List ======================= */}

      <section className="cardList">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
          <h2 data-aos="fade-right" className="mt-5 pb-3 fw-600">Live <span className="title">Anywhere</span> </h2>
            <motion.button whileHover={{scale: 1.1}} onClick={handleShowAllPos} className="title mt-5 btn">Show All</motion.button>
          </div>
          <div className="secContent grid">
            {
              pos.map((data, index) => (
                <CardList position={data} key={index} />
              ))
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
