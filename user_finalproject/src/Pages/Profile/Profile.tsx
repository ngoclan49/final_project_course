import { useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormUser from '../../Components/FormUser/FormUser'
import { UserModel } from '../../Models/UserModel'
import { AppDispatch, RootState } from '../../redux/configureStore'
import { getUserByIdApi, updateUserApi } from '../../redux/userReducer/userReducer'
import { getStorageJson, USER_LOGIN } from '../../util/config'
import { validation } from '../../util/validation/uservalidation'
import './profile.css'
import { toast } from 'react-toastify'
type Props = {}

const Profile = (props: Props) => {
  const userId = getStorageJson(USER_LOGIN).id
  const dispatch: AppDispatch = useDispatch()
  const { userDetail } = useSelector((state: RootState) => state.userReducer)


  const role = userDetail?.role === 'USER' ? false : true
  const [toggle, setToogle] = useState(role)
  
  useEffect(() => {
    dispatch(getUserByIdApi(userId))
  }, [])
  useEffect(() => {
    dispatch(getUserByIdApi(userId))
  }, [userDetail?.gender])

  const formik = useFormik<UserModel>({
    initialValues: {
      id: userDetail?.id!,
      name: userDetail?.name!,
      email: userDetail?.email!,
      gender: true || userDetail?.gender,
      role: userDetail?.role || 'USER',
      phone: userDetail?.phone!,
      password: userDetail?.password!,
      birthday: userDetail?.birthday!,
      avatar: userDetail?.avatar!
    },
    enableReinitialize: true,
    validationSchema: validation
    ,
    onSubmit: (values) => {
      try {
        let check = values.role
        toggle ? check = 'ADMIN' : check = 'USER'
        values.role = check

        const date = moment(values.birthday).format("DD/MM/YYYY")
        values.birthday = date
        dispatch(updateUserApi(userId, values))
        toast.success('Updated user profile successfully')
      } catch (error) {
        toast.error('Error updating')
      }
    }
  })

  return (
    <div className='profile'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <Link className="nav-link" to='/'>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/login'>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/sign-up'>Sign Up</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container-fluid mt--7">
        <div className="row align-items-center">
          <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div className="cardProfile shadow">
              <div className="row justify-content-center">
                <div className="">
                  <div className="card-profile-image">
                    <a href="#">
                    {
                        userDetail?.avatar ? <img src={userDetail.avatar} className='rounded-circle' alt="" />
                          : <img
                            src="https://cdn.imgbin.com/11/7/24/imgbin-pikachu-pok-mon-trainer-the-pok-mon-company-piplup-pikachu-mask-YSTG546XTbYZqssd99jEa8Yx6.jpg"
                            className="rounded-circle"
                          />
                      }
  
                    </a>
  
                  </div>
                </div>
              </div>
              <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <a href="#" className="btn btn-sm btn-info mr-4">
                    Change
                  </a>
                  <a href="#" className="btn btn-sm btn-default float-right">
                    Avatar
                  </a>
                </div>
              </div>
              <div className="card-body pt-0 pt-md-4">
                <div className="row">
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                        <span className="heading">{userDetail?.gender ? 'Male' : 'Female'}</span>
                        <span className="description">Gender</span>
                      </div>
                      <div>
                        <span className="heading">{userDetail?.role}</span>
                        <span className="description">Role</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3>
                    ID: <span className="font-weight-light">{userDetail?.id}</span>
                  </h3>
                  <div className="h5 mt-2">
                    <i className="ni business_briefcase-24 mr-2" />
                    {userDetail?.name}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {userDetail?.email}
                  </div>
                  <p className="my-2">
                    Phone number: {userDetail?.phone}
                  </p>
                  <p>
                    Birthday: {userDetail?.birthday}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 order-xl-1">
          <form onSubmit={formik.handleSubmit} className="card bg-secondary shadow">
              <div className="card-header bg-white border-0">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h3 className="mb-0">My account</h3>
                  </div>
                  <div className="col-4 text-right">
                    <button type="submit" className="btn btn-sm btn-primary">
                      Update
                    </button>
                  </div>
                </div>
              </div>
              <FormUser values={formik.values} errors={formik.errors} handleChange={formik.handleChange} handleBlur={formik.handleBlur} toggle={toggle} setToogle={setToogle}/>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Profile