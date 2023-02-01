import { useFormik } from "formik";
// import { toast } from 'react-toastify'
import { AppDispatch } from "../../redux/configureStore";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./signup.css";
import { RegisterModel } from "../../Models/UserModel";
import { validation } from "../../util/validation/uservalidation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { registerApi } from "../../redux/userReducer/userReducer";
type Props = {};

const SignUp = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const formik = useFormik<RegisterModel>({
    initialValues: {
      id: Math.floor(Math.random()),
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "USER",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      try {
        dispatch(registerApi(values));
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <div className="signup">
      <div className="animated bounceInDown">
        <div className="containerLogin">
          <span className="error animated tada" id="msg" />
          <form name="form1" className="box" onSubmit={formik.handleSubmit}>
            <h4>
              Admin<span>Dashboard</span>
            </h4>
            <h5>Sign up your account.</h5>
            <div className="wrapper__login">
              <div>
                <div className="inputForm">
                  <input
                    type="text"
                    name="name"
                    placeholder="Username"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name ?? (
                    <p className="errorMsg">{formik.errors.name}</p>
                  )}
                </div>
                <div className="inputForm">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email ?? (
                    <p className="errorMsg">{formik.errors.email}</p>
                  )}
                </div>
                <div className="inputForm">
                  <input
                    type="password"
                    name="password"
                    placeholder="Passsword"
                    id="pwd"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password ?? (
                    <p className="errorMsg">{formik.errors.password}</p>
                  )}
                </div>
              </div>
              <div>
                <div className="inputForm">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.phone ?? (
                    <p className="errorMsg">{formik.errors.phone}</p>
                  )}
                </div>
                <div className="inputForm">
                  <input
                    type="date"
                    name="birthday"
                    value={formik.values.birthday}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.birthday ?? (
                  <p className="errorMsg">{formik.errors.birthday}</p>
                )}

                <div className="form-inline inputForm">
                  <span>Gender: </span>
                  <label className="radio inline">
                    <input
                      type="radio"
                      value="true"
                      onChange={formik.handleChange}
                      name="gender"
                      defaultChecked
                    />
                    <span>Male</span>
                  </label>
                  <label className="radio inline">
                    <input
                      type="radio"
                      value="false"
                      onChange={formik.handleChange}
                      name="gender"
                    />
                    <span>Female</span>
                  </label>
                </div>
                {formik.errors.gender ?? (
                  <p className="errorMsg">{formik.errors.gender}</p>
                )}
              </div>
            </div>

            <button type="submit" disabled={!formik.dirty} className="btn1">
              Submit
            </button>
          </form>
          <span className="dnthave">
            Already have an account?
            <Link className="link__auth" to="/login">
              Login
            </Link>
          </span>
          <Link to="/">
            <button className="back">Back to Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
