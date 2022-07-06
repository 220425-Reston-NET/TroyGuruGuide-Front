import React from "react";

const NotAuthorized = () => {
  return (
    <section className="container">
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" /> You are not Authorized
      </h1>
      <p className="large">Sorry, this page is not accessible.</p>
    </section>
  );
};

export default NotAuthorized;
