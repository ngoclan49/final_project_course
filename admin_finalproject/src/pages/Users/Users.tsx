import { Box, Modal } from '@mui/material'
import { Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '../../components/Pagination/Pagination'
import UserTable from '../../components/UserComponent/UserTable/UserTable'
import { UserModel } from '../../Models/UserModel'
import { AppDispatch, RootState } from '../../redux/configStore'
import { getAllUsersApi, getUserPagApi, searchUserApi } from '../../redux/userReducer/userReducer'
import { style } from '../../assets/data/styleCardModal'
import UserCreate from './UserCreate/UserCreate'
import { Link } from 'react-router-dom'
import '../../assets/styles/user.css'
type Props = {}

const Users = (props: Props) => {
  const dispatch: AppDispatch = useDispatch()
  const { userPag, users, userBySearch } = useSelector((state: RootState) => state.userReducer)
  const [open, setOpen] = useState(false)
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleOpenCreate = () => setOpen(true)
  const handleCloseCreateForm = () => setOpen(false)

  const [search, setSearch] = useState('')
  const [allUser, setAllUser] = useState<UserModel[]>([]);

  // handle search by name - call api
  const handleSearch = () => {
    dispatch(searchUserApi(search))
  }

  // handle search by name - input search
  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Kiểm tra gía trị nhập nhập có bao gồm trong tên sản phẩm hay không
    const searchedUsers = users.filter((user) =>
      user.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSearch(value)

    setAllUser(searchedUsers)
  };

  useEffect(() => {
    dispatch(getAllUsersApi())
  }, [])

  useEffect(() => {
    dispatch(getUserPagApi(page + 1, rowsPerPage))
  }, [page, rowsPerPage, users]);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} className="mb-24">
          <Card bordered={false} className="criclebox cardbody h-full">
            <div className='user-header'>
              <span onClick={handleOpenCreate} className="project-ant">
                <button className="button buttonCreate">Create</button>
              </span>
              <div className="search">
                <input value={search} onChange={handleInputSearch} type="text" name="" id="" placeholder="Write something" className="search__input" />
                <Link to={`/users/search/${search}`} onClick={handleSearch} type="submit" className="search__button" tabIndex={-1}>Search</Link>
              </div>
            </div>
            <div className="ant-list-box table-responsive">
              <table className="width-100">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Birthday</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    !search ? userPag.map((users: UserModel, index) =>
                    (
                      <UserTable users={users} key={index} />
                    )) : allUser.map((users: UserModel, index) =>
                    (
                      <UserTable users={users} key={index} />
                    ))
                  }

                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>

      <Pagination data={users} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />

      <Modal
        open={open}
        onClose={handleCloseCreateForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='cardLocation-create'>
          <UserCreate />
        </Box>
      </Modal>

    </>
  )
}

export default Users