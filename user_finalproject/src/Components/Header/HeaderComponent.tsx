import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

//icon
import { GrLocation } from "react-icons/gr";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
//css
import "../../assets/css/header.css";

//redux store
import { getDestinationApi } from '../../redux/positionReducer/positionReducer'
import { AppDispatch, RootState } from "../../redux/configureStore";
import { PositionModel } from "../../Models/PositionModel";
import { getRoomByPosIdApi, getRoomApi } from "../../redux/roomReducer/roomReducer";
import { history } from "../..";

type Props = {}

const HeaderComponent = (props: Props) => {
  const dispatch: AppDispatch = useDispatch()
  const { destination } = useSelector((state: RootState) => state.positionReducer)

  const [open, setOpen] = useState(false)

  // State lưu giữ các giá trị: location, guest, date
  const [guest, setGuest] = useState<number>(0)
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [search, setSearch] = useState<string>('');
  const [locationId, setLocationId] = useState<number>(0);
  // Handle select number of guests
  const handleSelectGuest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setGuest(value as unknown as number)
  };

  // Handle select date
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // Search location
  const onSearch = (searchTerm: string, id: number) => {
    setSearch(searchTerm);
    setLocationId(id)
  };

  useEffect(() => {
    dispatch(getDestinationApi());
  }, []);

  const handleShowLocation = () => {
    dispatch(getDestinationApi())
    setOpen(!open);
  }

  const handleGetRoomByPos = (locationId: number) => {
      dispatch(getRoomByPosIdApi(locationId))
  }
  return (
    <>
      <div className="destinationInput">
        <label htmlFor="city">Search destination:</label>
        <div className="searchBar-input searchBar-input-customSearch">
          <input
            type="text"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            placeholder="Location"
          />
          {search.length === 0 ? (
            <GrLocation className="icon" onClick={handleShowLocation}/>
          ) : (
            <AiOutlineClose className="icon" onClick={() => setSearch("")} />
          )}
          {/* Render search position list */}
          {
            <div className="dataResult">
              {
                search.length === 0 && open ? destination.map((item: PositionModel) => {
                  return (
                    <div
                      key={item.id}
                      className="dataItem"
                      onClick={() => onSearch(item.tinhThanh, item.id)}
                    >
                      <CiLocationOn
                        className="icon"
                        style={{ fontSize: "13px" }}
                      />
                      {item.tinhThanh}
                    </div>
                  );
                }) : (destination
                  ?.filter((data: PositionModel) => {
                    const searchTerm = search.toLowerCase();
                    const province = data.tinhThanh.toLowerCase();
  
                    return (
                      searchTerm &&
                      province.startsWith(searchTerm) &&
                      province !== searchTerm
                    );
                  })
                  .map((item: PositionModel) => {
                    return (
                      <div
                        key={item.id}
                        className="dataItem"
                        onClick={() => onSearch(item.tinhThanh, item.id)}
                      >
                        <CiLocationOn
                          className="icon"
                          style={{ fontSize: "13px" }}
                        />
                        {item.tinhThanh}
                      </div>
                    );
                  }))
              }
              
            </div>
          }
        </div>
      </div>
      <div className="dateInput">
        <label htmlFor="date">Departure day:</label>

        <div className="searchBar-input searchBar-input-custom">
          <DatePicker
            selected={startDate}
            onChange={onChange}
            placeholderText="Date Time"
            startDate={startDate}
            endDate={endDate}
            selectsRange
            dateFormat="dd/MM/yyyy"
            minDate={moment().toDate()}
          />
        </div>
      </div>
      <div className="guestInput">
        <label htmlFor="guest">Number of guest: {guest}</label>
        <div className="searchBar-input">
          <div className="guest">
            <Dropdown align="end">
              <Dropdown.Toggle className="flex user ">
                <p>Guest</p>
              </Dropdown.Toggle>
              <Dropdown.Menu className="mt-2 dropDownMenu">
                <div className="range">
                  <p>Guests:</p>
                  <div className="numOfGuest">
                    <button
                      onClick={() => {
                        setGuest((prev: number) => prev + 1);
                      }}
                    >
                      +
                    </button>
                    <span>{guest}</span>
                    <button
                      onClick={() => {
                        if (guest === 0) return;
                        setGuest((prev: number) => prev - 1);
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <input
            type="range"
            className="form-range"
            min="0"
            max="10"
            id="customRange2"
            value={guest}
            onChange={handleSelectGuest}
          />
        </div>
      </div>

      {/* truyền props sang page search  */}
      <Link
        to={`/search/${locationId}`}
        state={{
          position: search,
          startDate,
          endDate,
          guest: Number(guest),
        }}
        onClick={() => handleGetRoomByPos(locationId)}
        className="searchIconDiv"
      >
        <AiOutlineSearch className="icon" />
      </Link>
    </>
  )
}

export default HeaderComponent