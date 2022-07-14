import axios from "axios";

export const Login = async (useremail, password) => {
  return await axios
    .post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        email: useremail,
        password: password,
      },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
        console.log(err)
    })
};

export const register = async (body) => {
    return await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        First_Name: body.firstNameReg,
        Last_Name: body.lastNameReg,
        email: body.useremailReg,
        password: body.passwordReg,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err)
    })

    }
