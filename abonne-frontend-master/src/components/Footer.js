import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../style_ar.css';
import features from '../images/features.png';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <ul className="list-unstyled footer-menu">
              <li>
                <a className="bold landing" href="#about" data-scroll="about">
                  عن أبونيه
                </a>
              </li>
              <li>
                <Link to={'/policies'} className="bold landing">
                  كن كابتن
                </Link>
              </li>
              <li>
                <Link to={'/bookFlight'} className="bold landing">
                  احجز رحلتك
                </Link>
              </li>
              <li>
                <Link to={'/flightCosts'} className="bold landing">
                  اعرف تكاليف رحلتك
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
              <p>أبونيه شركة مصرية ناشئة تقدم خدمات النقل و المواصلات بين المحافظات .</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
