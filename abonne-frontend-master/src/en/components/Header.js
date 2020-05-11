import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import '../../App.css';
import headerCar from '../../images/header-car.png';
import NavBar from './NavBar';

function Header() {
  return (
    <header className="block" id="home">
      <NavBar />

      <div className="header-content" style={{ textAlign: 'left', direction: 'ltr',}}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 text-center-xs">
              <h3 className="header-decribtion">
                Abonne is an Egyptian company that provides transportation services between governorates and cities.
                Now you and your family can move easily, safely and up to 50% off than traditional prices .
              </h3>
              <div className="header-btns">
                <Link to={'/en/flightCosts'} className="btn custom-btn main-color-text bold calculate-en">
                  Calculate Your Trip
                </Link>
                <Link to={'/en/bookFlight'} className="btn custom-btn main-color-text bold calculate-en">
                  Travel Abonne
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="header-photo">
                <div className="box">
                  <h4 className="box-description main-color-text exterabold">
                  Increase your monthly income and make Money with your car <span className="secon-color-text">Abonne</span>.
                  </h4>

                  <Link to={'/en/policies'} className="btn custom-btn main-color-back secon-color-text bold">
                    Join our captains {' '}
                  </Link>

                  <div className="img-car">
                    <img alt="header" src={headerCar} className="img-box"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-social">
        <div className="">
          <ul className="list-unstyled">
              <li>
              <a alt="" href="https://www.instagram.com/abonne.egypt" target="_blank">
                  <i>
                    <FaInstagram />
                  </i>
                </a>
              </li>
              <li>
                <a alt="" href="https://www.facebook.com/AbonneEgypt" target="_blank">
                  <i>
                    <FaFacebook />
                  </i>
                </a>
              </li>
              <li>
                <a href="tel:+201148488414">
                  <i>
                    <FaWhatsapp />
                  </i>
                </a>
              </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
