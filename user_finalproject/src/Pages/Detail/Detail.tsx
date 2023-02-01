import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/configureStore';
import {
  getCommentDetailApi,
  getRoomDetailApi,
  postCommentUser,
} from '../../redux/roomReducer/roomReducer';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import {
  FaStar,
  FaHome,
  FaRegSnowflake,
  FaAirFreshener,
  FaCalendarCheck,
  FaLanguage,
  FaAngleRight,
} from 'react-icons/fa';

import '../../assets/css/detail.css';
import { UserComment } from '../../Models/RoomModel';

type Props = {};

const Detail = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { pathname } = useLocation();
  const [userComment, setUserComment] = useState('');
  const paramId = Number(pathname?.replace('/detail/', ''));
  const { roomDetail, roomDetailComment } = useSelector(
    (state: RootState) => state.roomReducer
  );

  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  console.log('userLogin : ', userLogin);
  console.log('roomDetail : ', roomDetail);

  const {
    id,
    tenPhong,
    khach,
    phongNgu,
    giuong,
    phongTam,
    moTa,
    giaTien,
    mayGiat,
    banLa,
    tivi,
    dieuHoa,
    wifi,
    bep,
    doXe,
    hoBoi,
    banUi,
    maViTri,
    hinhAnh,
  } = roomDetail;

  const listConvenient = [
    'Phòng ngủ',
    'Phòng tắm',
    'Bàn là',
    'Điều hoà',
    'Bếp',
    'Hồ Bơi',
    'Giường',
    'Máy Giặc',
    'Tivi',
    'Wifi',
    'Đỗ Xe',
    'Bàn ủi',
  ];

  const handleSubmit = () => {
    if (userComment.length > 0 && roomDetail && userLogin) {
      const timeCurrentComment =
        new Date().toLocaleDateString('en-us', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        }) +
        ' ' +
        new Date().getFullYear();

      const commentUser: UserComment = {
        id: paramId,
        maPhong: roomDetail.id,
        maNguoiBinhLuan: Number(userLogin.id),
        ngayBinhLuan: timeCurrentComment,
        noiDung: userComment,
        saoBinhLuan: 0,
      };

      dispatch(postCommentUser(commentUser));
      setUserComment('');
    }
  };

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    dispatch(getRoomDetailApi(paramId));
    dispatch(getCommentDetailApi(paramId));
  }, []);

  return (
    <Container>
      <h5 className='mt-3'>{tenPhong}</h5>
      <ul style={{ fontSize: '12px' }} className='detail-rating'>
        <li>
          <FaStar className='icon' color='red' />
          <p className='d-inline'>{` 4,83 (18 đánh giá)`} </p>
        </li>
        <li>
          <FaHome className='icon' color='red' fontSize={'10px'} />
          <p className='d-inline' style={{ borderBottom: 'none' }}>
            {` Chủ nhà siêu cấp`}{' '}
          </p>
        </li>
        <li>
          <p className='d-inline'>{` Việt Nam`} </p>
        </li>
      </ul>
      <img src={hinhAnh} alt='' style={{ height: '400px' }} />
      <div
        className='d-flex justify-content-between mt-5'
        style={{ gap: '30px' }}
      >
        <div className='detail-room' style={{ flexGrow: 2 }}>
          <div className='d-flex justify-content-between '>
            <div>
              <h5>Toàn bộ - căn hộ - condo - Chủ nhà</h5>
              <p>{`${khach} khách - ${phongNgu} phòng ngủ - ${phongTam} phòng tắm`}</p>
            </div>
            <div style={{ height: '80px', width: '80px' }}>
              <img
                src='https://faces-img.xcdn.link/image-lorem-face-6381.jpg'
                width={'100%'}
                height={'100%'}
                style={{ borderRadius: '50%' }}
                alt=''
              />
            </div>
          </div>
          <hr />
          <ul className='info-room mb-3'>
            <li className='d-flex'>
              <FaHome className='d-block' />
              <div>
                <h6>Toàn bộ nhà</h6>
                <p>Bạn sẽ có chung cư cao cấp riêng cho riêng mình</p>
              </div>
            </li>
            <li className='d-flex'>
              <FaRegSnowflake className='d-block' />
              <div>
                <h6>Nhà vệ sinh tăng cường</h6>
                <p>
                  chủ nhà đã cam kết thực hiện quy trình vệ sinh tăng cường 5
                  bước của Airbnb. <br />{' '}
                  <span style={{ cursor: 'pointer' }}>Hiển thị thêm</span>
                </p>
              </div>
            </li>
            <li className='d-flex'>
              <FaAirFreshener className='d-block air-icon' />
              <div>
                <h6>Nhà vệ sinh tăng cường</h6>
                <p>
                  chủ nhà có kinh nghiệm cung cấp dịch vụ và đem đến trải nghiệm
                  rất tốt cho khách của họ. Và Khi mà chủ nhà đáp ứng đầy đủ các
                  yêu cầu để trở thành Superhost.
                </p>
              </div>
            </li>
            <li className='d-flex'>
              <FaCalendarCheck className='d-block' />
              <div>
                <h6>Miễn phí huỷ phòng trong 4 ngày</h6>
                <p></p>
              </div>
            </li>
          </ul>
          <hr />
          <div className='descript-room mt-3'>
            <div className='box-translate d-flex justify-content-between my-2'>
              <h6>Dịch sang Tiếng Việt</h6>
              <FaLanguage className='translate-icon' />
            </div>
            <p>
              {`${moTa} `}
              <br />
              <span>{'Hiển thị thêm >'}</span>
            </p>
          </div>
          <hr />
          <div className='convenient my-3'>
            <h5>Tiện nghi</h5>
            <div className='row'>
              {listConvenient.map((value, index) => {
                return (
                  <div className='col-6 mb-2' key={index}>
                    <FaAngleRight className='fa-icon'></FaAngleRight>
                    {value}
                  </div>
                );
              })}
            </div>
          </div>
          <hr />
          <div className='comment-detail row'>
            {roomDetailComment.map((item, index) => {
              return (
                <div className='col-6 mb-3' key={index}>
                  <div className='d-flex'>
                    <img
                      src={
                        item.avatar
                          ? item.avatar
                          : 'https://faces-img.xcdn.link/image-lorem-face-1625.jpg'
                      }
                      style={{
                        borderRadius: '50%',
                        height: '50px',
                        width: '50px',
                        objectFit: 'cover',
                      }}
                    />
                    <div style={{ marginLeft: '10px' }}>
                      <h6>{item.tenNguoiBinhLuan}</h6>
                      <p>{item.ngayBinhLuan}</p>
                    </div>
                  </div>
                  <p>{item.noiDung ? item.noiDung : 'Mọi thứ đều ổn'}</p>
                </div>
              );
            })}
          </div>
          <div className='user-comment mt-3'>
            <div className='row'>
              <div className='col-1'>
                <img
                  src={'https://faces-img.xcdn.link/image-lorem-face-1288.jpg'}
                  style={{
                    borderRadius: '50%',
                    height: '50px',
                    width: '50px',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className='col-11'>
                <textarea
                  style={{ width: '90%', height: '100px' }}
                  onChange={(e) => setUserComment(e.target.value)}
                  value={!userComment ? '' : userComment}
                ></textarea>
              </div>
            </div>
            <button
              className='btn btn-primary mt-3'
              style={{ marginLeft: '65px' }}
              onClick={handleSubmit}
            >
              Add comment
            </button>
          </div>
        </div>
        <div className='book-room'>
          <div
            className='box-book'
            style={{ height: '150px', width: '300px', border: '1px solid' }}
          >
            <div className='flex justify-content-between mt-1'>
              <h6>${giaTien} /Đêm</h6>
              <h6>
                <FaStar className='icon' color='red' />
                <p className='d-inline'>{` 4,83 (18 đánh giá)`} </p>
              </h6>
            </div>
            <div className='searchBar-input searchBar-input-custom'>
              <DatePicker
                selected={startDate}
                onChange={onChange}
                placeholderText='Date Time'
                startDate={startDate}
                endDate={endDate}
                selectsRange
                dateFormat='dd/MM/yyyy'
                minDate={moment().toDate()}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Detail;
