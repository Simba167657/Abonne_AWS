import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import '../App.css';
import '../style_ar.css';
import headerCar from '../images/header-car.png';
import NavBar from './NavBar';

function Header() {
  return (
    <header className="block" id="home">
      <NavBar />

      <div className="header-content">
        <div className="container">
          <div className="row">
            <div className="col-md-8 text-center-xs">
              <h3 className="header-decribtion">
                أبونيه شركة مصرية ناشئة تقدم خدمات النقل و المواصلات بين المحافظات والمدن حيث توفر سيارات خاصة حديثة تناسب
                إنتقالاتك و إنتقالات عائلتك و بأسعار تصل إلى 50% أقل من الأسعار العادية.تتميز رحلتك مع أبونيه بالراحة و الرفاهية
                والآمان لك و لعائلتك.
              </h3>
              <div className="header-btns">
                <Link to={'/flightCosts'} className="btn custom-btn main-color-text bold calculate-ar">
                  احسب تكاليف رحلتك
                </Link>
                <Link to={'/bookFlight'} className="btn custom-btn main-color-text bold calculate-ar">
                  سافر أبونيه
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="header-photo">
                <div className="box">
                  <h4 className="box-description main-color-text exterabold">
                    زود دخلك الشهرى من خلال الإستثمار بسيارتك الخاصة مع <span className="secon-color-text">أبونيه.</span>
                  </h4>

                  <Link to={'/policies'} className="btn custom-btn main-color-back secon-color-text bold">
                    إنضم الآن{' '}
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
