import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../style_ar.css';
import NavBar from '../components/NavBar';
import FpIcon from '../images/icons/fb.png';
import Checklist from '../images/icons/checklist.png';

function RegistrationIsDone() {
  return (
    <header className="header-pages block" id="home">
      <NavBar />

      <div className="header-content-pages">
        <div className="container">
          <form>
            <div className="driver-content policies step-one">
              <div class="content">
                <div class="title">
                  <span class="number light">3</span>
                  <img class="box-icon-img" src={Checklist} alt="" />
                  <h3 class="exterabold done">تم التسجيل</h3>
                  <p class="bold">سيتم الرد على طلب إنضمامكم إلى أبونيه فى أقرب وقت .</p>
                  <h3 class="light text-center flow">
                    تعرف على كل ما يخص أبونيه من خلال صفحتنا:
                    <a class="facebook-link" href="https://www.facebook.com/AbonneEgypt">
                      <span class="bold">AboneeEgypt</span>
                    </a>
                    <img class="fb-img" src={FpIcon} alt="" />
                  </h3>
                </div>
                <Link to={'/'} className="custom-btn">
                  الرئيسية
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

export default RegistrationIsDone;
