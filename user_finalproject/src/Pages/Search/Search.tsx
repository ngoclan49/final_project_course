// library
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configureStore';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
// css
import '../../assets/css/pagination.css';
import '../../assets/css/search.css';
import '../../assets/css/searchCard.css';
// component
import SearchCard from '../../Components/SearchCard/SearchCard';
import Map from '../../Components/Map/Map';
// redux
import { RoomModel } from '../../Models/RoomModel';
import {
  getRoomByPosIdApi,
  getRoomPagination,
} from '../../redux/roomReducer/roomReducer';
import { toast } from 'react-toastify';

const Search = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const position = location.state?.position;

  const guest = location.state?.guest;

  // const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const [date, setDate] = useState(format(new Date(), 'dd MMMM yy'));

  const { roomByPos, roomPagination, rooms, isBookReducer } = useSelector(
    (state: RootState) => state.roomReducer
  );
  // Get id in url params
  const params = useParams();
  const id = Number(params.id);
  useEffect(() => {
    dispatch(getRoomByPosIdApi(id));
  }, [id]);

  // -------------  start handle Pagination ------------
  const [pageNumber, setPageNumber] = useState<number>(1);
  // số lượng sản phẩm mỗi trang
  const productPerPage = 4;

  useEffect(() => {
    dispatch(getRoomPagination(pageNumber, productPerPage));
  }, [pageNumber]);

  // hiển thị số phân trang
  const pageCount = Math.ceil(rooms.length / productPerPage);

  const handleNextPage = () => {
    const hasNextPage =
      pageNumber === pageCount
        ? false
        : setPageNumber((prevPage) => prevPage + 1);
    return hasNextPage;
  };

  const handlePreviousPage = () => {
    const hasPreviousPage =
      pageNumber === 1 ? false : setPageNumber((prevPage) => prevPage - 1);
    return hasPreviousPage;
  };

  const onChange = ({ selected }: any) => {
    setPageNumber(selected + 1);
  };

  // -------------  end handle Pagination ------------

  return (
    <main className='px-3'>
      <section className='pt-5'>
        <p style={{ fontSize: '13px' }}>
          300+ Stays - {date} - for {guest ? guest : '...'} guests
        </p>
        <h1 className='font-bold mt-2 mb-4 fs-4'>
          Stay in {position || 'anywhere'}
        </h1>
        <div
          style={{ color: '#909090' }}
          className='search-button d-flex text-nowrap mb-5'
        >
          <p className='button me-4'>Type of Place</p>
          <p className='button me-4'>Price</p>
          <p className='button me-4'>Rooms and Beds</p>
        </div>

        <div className='search--container d-flex justify-content-between'>
          <div className='search-card--container'>
            {roomByPos.length == 0 ? (
              <>
                <div className='text-center'>
                  <p className='mb-0' style={{ color: '#909090' }}>
                    There is no accommodation in this location. Please refer to
                    other accommodation
                  </p>
                </div>
                <div className='search-card--grid'>
                  {roomPagination?.map((item: RoomModel) => (
                    <SearchCard room={item} key={item.id} />
                  ))}
                </div>
                <div>
                  <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={onChange}
                    containerClassName='paginationBtns'
                    nextLabel={<BsArrowRightShort onClick={handleNextPage} />}
                    previousLabel={
                      <BsArrowLeftShort onClick={handlePreviousPage} />
                    }
                  />
                </div>
              </>
            ) : (
              roomByPos?.map((item: RoomModel) => (
                <SearchCard room={item} key={item.id} />
              ))
            )}
          </div>
          <div
            style={{ height: '100% !important', width: '100%' }}
            className='pt-3 map'
          >
            <Map />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Search;
