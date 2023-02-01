import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import moment from 'moment'
import InputFileImage from '../../../components/UploadImage/InputFileImage'
import FormUser from '../../../components/UserComponent/FormUser/FormUser'
import { UserModel } from '../../../Models/UserModel'
import { AppDispatch } from '../../../redux/configStore'
import { createUserApi } from '../../../redux/userReducer/userReducer'
import { validation } from '../../../util/validation/validation'
import avatar from '../../../assets/images/avatar.png'
import './userCreate.css'
type Props = {}

const UserCreate = (props: Props) => {
    const [toggle, setToogle] = useState(false)
    const dispatch: AppDispatch = useDispatch()
    const [image, setImage] = useState(avatar)
    const formik = useFormik<UserModel>({
        initialValues: {
            id: 0,
            name: '',
            email: '',
            gender: true,
            role: 'USER',
            phone: '',
            password: '',
            birthday: '',
            avatar: ''
        },
        validationSchema: validation
        ,
        onSubmit: (values) => {
            try {
                let check = values.role
                toggle ? check = 'ADMIN' : check = 'USER'
                values.role = check
                values.avatar = image

                const date = moment(values.birthday).format("DD/MM/YYYY")
                values.birthday = date
                dispatch(createUserApi(values))
                console.log(values);
            } catch (error) {
                toast.error('Error creating user')
            }
        }
    })
    return (
        <div className="container-fluid mt--7">
            <div className="row align-items-center">
                <div className="col-xl-12 order-xl-1">
                    <form onSubmit={formik.handleSubmit} className="card card-createUser bg-secondary shadow">
                        <div className="card-header bg-white border-0">
                            <div className="row createUser-headerWrap align-items-center">
                                <div className="col-8 createUserId">
                                    <InputFileImage setImage={setImage} image={image} />
                                </div>
                                <div className="col-4 createButton">
                                    <h3 className="mb-0">My account</h3>
                                    <button type="submit" className="btn btn-sm btn-primary">
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                        <FormUser values={formik.values} errors={formik.errors} handleChange={formik.handleChange} handleBlur={formik.handleBlur} toggle={toggle} setToogle={setToogle} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserCreate