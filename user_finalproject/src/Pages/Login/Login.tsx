import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";
import { LoginModel } from "../../Models/UserModel";
import { toast } from "react-toastify";
import { AppDispatch } from "../../redux/configureStore";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginApi } from "../../redux/userReducer/userReducer";
type Props = {};

const Login = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const formik = useFormik<LoginModel>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      try {
        dispatch(loginApi(values));
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <div className="auth">
      <div className="animated bounceInDown">
        <div className="containerLogin">
          <span className="error animated tada" id="msg" />
          <form name="form1" className="box" onSubmit={formik.handleSubmit}>
            <h4>
              Admin<span>Dashboard</span>
            </h4>
            <h5>Sign in to your account.</h5>
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
            <button type="submit" className="btn1">
              Submit
            </button>
          </form>
          <span className="dnthave">
            Don’t have an account?
            <Link className="link__auth" to="/sign-up">
              Sign up
            </Link>
          </span>
          <Link to="/">
            <button className="back">Back to Dashboard</button>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
