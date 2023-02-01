import { Stack, Switch, Typography } from '@mui/material';
import { FormikErrors } from 'formik'
import moment from 'moment';
import React, { useState } from 'react'
import { UserModel } from '../../../Models/UserModel'
type Props = {
    values: UserModel;
    errors: FormikErrors<UserModel>;
    handleChange: <Value>(field: Value | React.ChangeEvent<any>) => void;
    handleBlur: <Value>(field: Value | React.ChangeEvent<any>) => void;
    toggle: boolean;
    setToogle: (value: boolean) => void
}

const FormUser = ({ values, errors, handleBlur, handleChange, toggle, setToogle }: Props) => {
  return (
      <div className="card-body">
        <div >
          <h6 className="heading-small text-muted mb-4">
            User information
          </h6>
          <div className="pl-lg-4">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group focused">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="input-username"
                    value={values.name}
                    name='name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control form-control-alternative"
                  />
                  {errors.name ? <p className="error">{errors.name}</p> : ''}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label
                    className="form-control-label"
                    htmlFor="input-email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={values.email}
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="input-email"
                    className="form-control form-control-alternative"
                    placeholder="email@example.com"
                  />
                  {errors.email ? <span className="error">{errors.email}</span> : ''}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group focused">
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={values.password}
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="input-first-name"
                    className="form-control form-control-alternative"
                  />
                  {errors.password ? <p className="error">{errors.password}</p> : ''}

                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group focused">
                  <label
                    className="form-control-label"
                    htmlFor="input-last-name"
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    id="input-last-name"
                    value={values.phone}
                    name='phone'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control form-control-alternative"
                  />
                  {errors.phone ? <p className="error">{errors.phone}</p> : ''}
                </div>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          {/* Address */}
          <h6 className="heading-small text-muted mb-4">
            More information
          </h6>
          <div className="">
            <div className="row">
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group focused">
                  <label
                    className="form-control-label"
                    htmlFor="input-city"
                  >
                    Birthday
                  </label>
                  <input
                    type="date"
                    id="input-city"
                    className="form-control form-control-alternative"
                    value={values.birthday}
                    name='birthday'
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.birthday ? <p className="error">{errors.birthday}</p> : ''}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group focused">
                  <div className="genderLabel">Gender </div>

                  <div className="userUpdateItemBottom">
                    <div className="form-radio">
                      <label htmlFor="">Male</label>

                      <input
                        type="radio"
                        name={'gender'}
                        className={'form-check'}
                        value={'true'}
                        onChange={handleChange}
                        defaultChecked
                      />
                    </div>
                    <div className="form-radio">
                      <label htmlFor="">Female</label>
                      <input
                        type="radio"
                        name={'gender'}
                        className={'form-check'}
                        value={'false'}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <div className="newUserItem-toggle">
                    <label htmlFor="">Role</label>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>USER</Typography>
                      <Switch
                        checked={toggle}
                        name='role'
                        value={values.role}
                        onChange={(event) => {
                          setToogle(event.target.checked)

                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      <Typography>ADMIN</Typography>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  )
}

export default FormUser