import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setAlert } from "../../../redux/actions/alert";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch, connect } from "react-redux";
import PropTypes from "prop-types";
import { isEmpty, isEmail, isPassword } from "../../utils/validation/Validation";

const initialState = {
  username: "",
  password: "",
};

function Login({ setAlert, auth: { isLogged, isAdmin } }) {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { username, password } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(username) || isEmpty(password)) {
      setAlert("Please fill in all fields.", "danger");

      return setUser({
        ...user,
      });
    }
    const resut = isPassword(password)
    if(resut != 'correct'){
      setAlert(resut, "danger");
      return
    }
    try {
      const res = await axios.post("http://localhost:5000/users/signin", { 'userId':username, password });
      if(res.data.result == 'success'){
        setAlert("Successfully Signed In", "success");
        console.log(res.data)
        // dispatch(dispatchLogin());
      }
      else if(res.data.result == "not_register"){
        setAlert('Account doesn\'t exists', "danger");
      }
      
      setUser({ ...user });
      // navigate("/dashboard");
      // return <Navigate to="/dashboard" />
    } catch (err) {
      err?.response?.data?.msg && setAlert(err?.response?.data?.msg, "danger");
      setUser({ ...user });
    }
  };
  // if (isLogged === true) {
  //   console.log("here");
  //   if (isAdmin !== true) {
  //     console.log("oth");
  //     return <Navigate to="/dashboard" />;
  //   } else if (isAdmin === true) {
  //     console.log("ad");
  //     return <Navigate to="/admindashboard" />;
  //   }
  // }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        flexDirection: "row",
        display: "flex",
        backgroundColor: "#F0F2F5",
      }}
    >
      <div
        style={{
          marginTop: "12%",
          marginLeft: "13%",
          height: "25%",
          width: "35%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: "var(--primary-color)" }}>
          Guru Guide{" "}
          <i class="fas fa-lock" style={{ color: "var(--primary-color)" }} />
        </h1>
        <text style={{ fontSize: "125%" }}>
          Use your registered username to login.
        </text>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10%",
            justifyContent: "space-around",
            height: "100%",
            width: "100%",
          }}
        >
          <i
            class="fas fa-fingerprint"
            style={{ color: "var(--primary-color)", fontSize: "15vh" }}
          />
          <i
            class="fas fa-key"
            style={{ color: "var(--primary-color)", fontSize: "15vh" }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "12%",
          marginLeft: "6%",
          height: "60%",
          width: "25%",
          border: "2.5px solid var(--primary-color)",
          borderRadius: "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "var(--primary-color)", marginTop: "8%" }}>
          {/* <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"center"}}> */}
          <i className="fas fa-user" style={{}} /> Sign In
          {/* <text style={{fontSize:'125%', marginLeft:"2%"}}>Become An Agent Now!</text> */}
          {/* </div> */}
        </h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            width: "100%",
            marginTop: "10%",
          }}
          onSubmit={handleSubmit}
        >
          <input
            style={{
              border: "2px solid var(--primary-color)",
              height: "15%",
              width: "80%",
              marginTop: "2%",
              padding: "4%",
              borderRadius: "15px",
            }}
            type="username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChangeInput}
          />
          <input
            style={{
              border: "2px solid var(--primary-color)",
              height: "15%",
              width: "80%",
              marginTop: "2%",
              padding: "4%",
              marginBottom: "10%",
              borderRadius: "15px",
            }}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
          <input
            type="submit"
            style={{
              height: "15%",
              width: "80%",
              backgroundColor: "var(--primary-color)",
              color: "white",
              borderRadius: "25px",
              borderColor: "var(--primary-color)",
            }}
            value="Sign-in"
          />
        </form>
       
        <p className="my-1">
          Not an agent? <Link to="/register">Register Now</Link>
        </p>
      </div>
    </div>
  );
}

// export default Login;
Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(Login);
