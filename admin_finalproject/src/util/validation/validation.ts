import * as Yup from "yup";

export const validation = Yup.object({
    id: Yup.string().required('Required'),
    birthday: Yup.string().required('Required'),
    name: Yup.string().min(4, 'Must be 4 characters or more').required('Required'),
    email: Yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is invalid').required('Required'),
    password: Yup.string()
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
        "Password must be 7-19 characters and contain at least one letter, one number and a special character").required('Required'),
    phone: Yup.string().required('Required')
      .matches(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Must be a valid phone number"
      ),
    role: Yup.string().required('Required')
  })