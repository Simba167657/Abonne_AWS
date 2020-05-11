import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import NavBar from '../components/NavBar';

function Policies() {
  return (
    <header className="header-pages block" id="home" style={{ textAlign: 'left', direction: 'ltr', }}>
      <NavBar />

      <div className="header-content-pages">
        <div className="container">
          <div className="driver-content policies">
            <div className="content">
              <h2 className="light text-center">Driver registration conditions and policies.</h2>
              <p>To join Abonne, the following conditions must be fulfilled:</p>
              <p>1 - The driver must be at least 21 years old.</p>
              <p>
                2 - It is not permissible for any person or entity to own your account, otherwise,
                your account becomes permanently suspended from Abonne.
              </p>
              <p>
                3 - In case you cancelled the trip before the scheduled date and without giving any reasons, the account will be suspended.
              </p>
              <p>4 - Your data such as name, phone number, address, and ID card number must be written accurately to add you to the databases.</p>
              <p>5 - You have to commit to the traffic rules in order not to affect your safety and that of the customers.</p>
              <p>6 - The apology for taking a trip must be at least three hours before the trip.</p>
              <p>7 - Your car should be clean and free from malfunctions.</p>

              <Link to={'/en/RegistrationSteps'} className="custom-btn main-color-text">
                Agree
              </Link>
              <Link to={'/en/home'} className="bold home">
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Policies;
