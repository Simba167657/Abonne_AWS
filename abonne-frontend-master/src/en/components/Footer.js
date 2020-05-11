import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import features from '../../images/features.png';

function Footer() {
  return (
    <footer style={{ textAlign: 'left', direction: 'ltr', }}>
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <ul className="list-unstyled footer-menu">
              <li>
                <a className="bold landing" href="#about" data-scroll="about">
                  About 
                </a>
              </li>
              <li>
                <Link to={'/policies'} className="bold landing">
                  Be the captain
                </Link>
              </li>
              <li>
                <Link to={'/bookFlight'} className="bold landing">
                  your flight
                </Link>
              </li>
              <li>
                <Link to={'/flightCosts'} className="bold landing">
                  cost of your trip
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-5">
            <div className="conten-logo">
              <img alt="something" src={features} className="center-block" />
              <h6 className="main-color-text light text-center">Abonne</h6>
            </div>
            <div className="conten-text main-color-text light">
              <p>Abonne is an Egyptian company that provides transportation services between governorate and cities.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
