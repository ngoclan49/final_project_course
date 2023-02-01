import { Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { getRoomListApi, getRoomPagApi } from "../../redux/roomReducer/roomReducer";
import '../../assets/styles/room.css'
import { RoomModel } from "../../Models/RoomModel";
import TableRoom from "../../components/RoomComponent/TableRoom/TableRoom";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
type Props = {};


const Rooms = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { rooms, roomPaginate } = useSelector((state: RootState) => state.roomReducer);

   // set page mặc định bằng 0 tương ứng với trang 1
   const [page, setPage] = React.useState(0);

   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   
   useEffect(() => {
    dispatch(getRoomPagApi(page + 1, rowsPerPage))
}, [page, rowsPerPage, rooms]);
  
  useEffect(() => {
    dispatch(getRoomListApi());
  }, []);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} className="mb-24">
          <Card bordered={false} className="criclebox cardbody h-full">
            <Link to='/create-room' className="project-ant">
              <button className="button buttonCreate">Create</button>
            </Link>
            <div className="ant-list-box table-responsive">
              <table className="width-100">
                <thead>
                  <tr>
                    <th>Room Name</th>
                    <th>Image</th>
                    <th>Location</th>
                    <th>Guests</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {roomPaginate.map((room: RoomModel, index) => (
                    <TableRoom room={room} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>

      <Pagination data={rooms} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
    </>

  );
};

export default Rooms;
