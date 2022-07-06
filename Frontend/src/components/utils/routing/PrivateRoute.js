import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "./Spinner";

const PrivateRoute = ({
  component: Component,
  auth: { isLogged, user, loading },
}) => {
  if (loading) return <Spinner />;
  if (isLogged === true) {
    if (user?.role === 0) {
      return <Component />;
    } else if (user?.role === 1) {
      return <Navigate to="/admindashboard" />;
    }
  }
  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
