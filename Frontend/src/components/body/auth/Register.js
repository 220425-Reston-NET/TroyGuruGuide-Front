import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { setAlert } from "../../../redux/actions/alert";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
  isPassword
} from "../../utils/validation/Validation";

const initialState = {
  userId: "",
  password: "",
  password2: "",
  city:"",
  state:"",
  exp:"",
  pricing:"",
  lang:"",
  career: false,
  retire: false, 
  health:false,
  financial:false,
  nutrition:false,
  exercise:false,
  weight:false,
  gender:false,
  race:false,
  age:false,
  inPerson:false,
  phone:false,
  video:false
};

function Register({ setAlert, isLogged }) {
  const [user, setUser] = useState(initialState);

  const { userId, password, password2, city, state, exp, pricing, lang, career = false, retire = false, health = false, financial = false, nutrition = false, exercise = false, weight = false, gender = false, race = false, age = false, inPerson = false, phone = false, video=false } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      isEmpty(userId) ||
      isEmpty(password) ||
      isEmpty(password2)||
      isEmpty(city)||
      isEmpty(state)||
      isEmpty(exp) ||
      isEmpty(pricing)||
      isEmpty(lang)
    ) {
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
    if (!isMatch(password, password2)) {
      setAlert("Passwords do not match", "danger");

      return setUser({ ...user, err: "Password did not match.", success: "" });
    }
    // 
    const specialization = []
    career && specialization.push('Career Coaching')
    retire && specialization.push('Retirement Planning/Coaching')
    health && specialization.push('Health and Wellness Coaching')
    financial && specialization.push('Financial Coaching')
    nutrition && specialization.push('Nutrition')
    exercise && specialization.push('Exercise')
    weight && specialization.push('Weight Loss Coaching')
    // 
    const demographic = []
    gender && demographic.push('Gender')
    race && demographic.push('Race/Ethnicity')
    age && demographic.push('Age')
    // 
    const modality = []
    inPerson && modality.push('In Person')
    phone && modality.push('Phone')
    video && modality.push('Video')

    const data = {
      userId,
      password,
      city,
      state,
      exp,
      pricing,
      lang,
      specialization,
      demographic,
      modality
    }



    try {
      const res = await axios.post("http://localhost:5000/users/signup", data);
      console.log(res)
      if(res.data.result == 'success'){
        setAlert('Successfully registered', "success");
      }
      else if(res.data.result == 'exists'){
        setAlert('Username already registered, try another username', "danger");
      }
     

      setUser({ ...user });
    } catch (err) {
      console.log(err.response)
      err.response?.data?.msg && setAlert(err.response.data.msg, "danger");
      setUser({ ...user });
    }
  };

  if (isLogged) {
    return <Navigate to="/dashboard" />;
  }
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
            class="fas fa-id-card"
            style={{ color: "var(--primary-color)", fontSize: "15vh" }}
          />
          {/* <img src={img} height="135%" width="15vw" /> */}
        </div>
      </div>
      <div
        style={{
          marginTop: "12%",
          marginLeft: "6%",
          height: 1200,
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
          <i className="fas fa-user" /> Create Account
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
              padding: "4%",
              borderRadius: "15px",
            }}
            type="text"
            placeholder="Username"
            name="userId"
            value={userId}
            onChange={handleChangeInput}
          />
          <input
            style={{
              border: "2px solid var(--primary-color)",
              height: "15%",
              width: "80%",
              marginTop: "2%",
              padding: "4%",
              borderRadius: "15px",
            }}
            type="text"
            placeholder="City"
            name="city"
            value={city}
            onChange={handleChangeInput}
          />

          <input
            style={{
              border: "2px solid var(--primary-color)",
              height: "15%",
              width: "80%",
              marginTop: "2%",
              padding: "4%",
              borderRadius: "15px",
            }}
            type="text"
            placeholder="State"
            name="state"
            value={state}
            onChange={handleChangeInput}
          />

          <input
            style={{
              border: "2px solid var(--primary-color)",
              height: "15%",
              width: "80%",
              marginTop: "2%",
              padding: "4%",
              borderRadius: "15px",
            }}
            type="number"
            placeholder="Years of experience"
            name="exp"
            value={exp}
            onChange={handleChangeInput}
          />

          <input
            style={{
              border: "2px solid var(--primary-color)",
              height: "15%",
              width: "80%",
              marginTop: "2%",
              padding: "4%",
              borderRadius: "15px",
            }}
            type="number"
            placeholder="Pricing"
            name="pricing"
            value={pricing}
            onChange={handleChangeInput}
          />

          <input
            style={{
              border: "2px solid var(--primary-color)",
              height: "15%",
              width: "80%",
              marginTop: "2%",
              padding: "4%",
              borderRadius: "15px",
            }}
            type="text"
            placeholder="Languages"
            name="lang"
            value={lang}
            onChange={handleChangeInput}
          />
          <input
            style={{
              border: "2px solid var(--primary-color)",
              height: "15%",
              width: "80%",
              marginTop: "2%",
              padding: "4%",
              borderRadius: "15px",
            }}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
          <input
            style={{
              border: "2px solid var(--primary-color)",
              height: "15%",
              width: "80%",
              marginTop: "2%",
              marginBottom: "10%",
              padding: "4%",
              borderRadius: "15px",
            }}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChangeInput}
          />

<div>
<div>
  <label style={{fontSize:20}}>Area of Specialization</label>
  <br />
      <input 
        id={'career'} 
        name={'career'}
        type="checkbox" 
        checked={career} 
        onChange={()=>{ setUser({ ...user, career: !career })}} 
      />
      <label htmlFor={'career'}>{'Career Coaching'}</label>
      < br/>

      <input 
        id={'retirement'} 
        name={'retirement'} 
        type="checkbox" 
        checked={retire} 
        onChange={()=>{ setUser({ ...user, retire: !retire })}} 
      />
      <label htmlFor={'retirement'}>{'Retirement Planning/Coaching'}</label>
      < br/>
      <input 
        id={'health'} 
        name={'health'} 
        type="checkbox" 
        checked={health} 
        onChange={()=>{ setUser({ ...user, health: !health })}} 
      />
      <label htmlFor={'health'}>{'Health and Wellness Coaching'}</label>
      < br/>

      <input 
        id={'weight'} 
        name="weight" 
        type="checkbox" 
        checked={weight} 
        onChange={()=>{ setUser({ ...user, weight: !weight })}} 
      />
      <label htmlFor={'weight'}>{'Weight Loss Coaching'}</label>
      < br/>

      <input 
        id={'nutrition'} 
        name={'nutrition'} 
        type="checkbox" 
        checked={nutrition} 
        onChange={()=>{ setUser({ ...user, nutrition: !nutrition })}} 
      />
      <label htmlFor={'nutrition'}>{'Nutrition'}</label>
      < br/>

      <input 
        id={'exercise'} 
        name={'exercise'} 
        type="checkbox" 
        checked={exercise} 
        onChange={()=>{ setUser({ ...user, exercise: !exercise })}} 
      />
      <label htmlFor={'exercise'}>{'Exercise'}</label>
      < br/>

      <input 
        id={'financial'} 
        name={'financial'} 
        type="checkbox" 
        checked={financial} 
        onChange={()=>{ setUser({ ...user, financial: !financial })}} 
      />
      <label htmlFor={'financial'}>{'Financial Coaching'}</label>
      < br/>
    </div>



    <div>
  <label style={{fontSize:20}}>Demographic Options</label>
  <br />
      <input 
        id={'gender'} 
        name={'gender'} 
        type="checkbox" 
        checked={gender} 
        onChange={()=>{ setUser({ ...user, gender: !gender })}} 
      />
      <label htmlFor={'gender'}>{'Gender'}</label>
      < br/>

      <input 
        id={'race'} 
        name={'race'} 
        type="checkbox" 
        checked={race} 
        onChange={()=>{ setUser({ ...user, race: !race })}} 
      />
      <label htmlFor={'race'}>{'Race/Ethnicity'}</label>
      < br/>
      <input 
        id={'age'} 
        name={'age'} 
        type="checkbox" 
        checked={age} 
        onChange={()=>{ setUser({ ...user, age: !age })}} 
      />
      <label htmlFor={'age'}>{'Age'}</label>
      < br/>

    </div>



    <div>
  <label style={{fontSize:20}}>Modality Options</label>
  <br />
      <input 
        id={'inPerson'} 
        name={'inPerson'} 
        type="checkbox" 
        checked={inPerson} 
        onChange={()=>{ setUser({ ...user, inPerson: !inPerson })}} 
      />
      <label htmlFor={'inPerson'}>{'In Person'}</label>
      < br/>

      <input 
        id={'phone'} 
        name={'phone'} 
        type="checkbox" 
        checked={phone} 
        onChange={()=>{ setUser({ ...user, phone: !phone })}} 
      />
      <label htmlFor={'phone'}>{'Phone'}</label>
      < br/>
      <input 
        id={'video'} 
        type="checkbox" 
        name="video" 
        checked={video} 
        onChange={()=>{ setUser({ ...user, video: !video })}} 
      />
      <label htmlFor={'video'}>{'Video'}</label>
      < br/>

    </div>
    </div>



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
            value="Create an account"
          />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(Register);
