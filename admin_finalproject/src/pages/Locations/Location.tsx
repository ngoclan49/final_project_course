import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import Pagination from '../../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import { getAllLocationApi, getLocationPagApi } from '../../redux/locationReducer/locationReducer';
import { LocationModel } from '../../Models/LocationModel';
import LocationTable from '../../components/LocationComponent/LocationTable/LocationTable';
import { Box, Modal } from '@mui/material';
import LocationCreated from './LocationCreated/LocationCreated';
import { style } from '../../assets/data/styleCardModal';
import '../../assets/styles/location.css'
import LocationEdit from './LocationEdit/LocationEdit';
type Props = {}

const Location = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const { locations, locationPag } = useSelector((state: RootState) => state.locationReducer)

  const [open, setOpen] = useState(false)
  // set page mặc định bằng 0 tương ứng với trang 1
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    dispatch(getAllLocationApi())
  }, [])

  useEffect(() => {
    dispatch(getLocationPagApi(page + 1, rowsPerPage))
  }, [page, rowsPerPage, locations]);

  const handleShowCreateForm = () => setOpen(true)

  const handleCloseCreateForm = () => setOpen(false)


  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} className="mb-24">
          <Card bordered={false} className="criclebox cardbody h-full">
            <span onClick={handleShowCreateForm} className="project-ant">
              <button className="button buttonCreate">Create</button>
            </span>
            <div className="ant-list-box table-responsive">
              <table className="width-100">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Location</th>
                    <th>Image</th>
                    <th>Province</th>
                    <th>Country</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {locationPag.map((location: LocationModel, index) => (
                    <LocationTable location={location} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>

      <Pagination data={locations} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />

      <Modal
        open={open}
        onClose={handleCloseCreateForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='cardLocation-create'>
          <LocationCreated />
        </Box>
      </Modal>

    </>

  
  )
}

export default Location