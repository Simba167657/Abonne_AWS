import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../style_ar.css';
import NavBar from '../components/NavBar';
import IconsId from '../images/icons/id.png';
import SteeringWheel from '../images/icons/steering-wheel.png';
import Mail from '../images/icons/mail.png';
import Car from '../images/icons/car.png';

function RegistrationSteps() {
  return (
    <header className="header-pages block" id="home">
      <NavBar />

      <div className="header-content-pages">
        <div className="container">
          <div className="driver-content policies register">
            <div className="content">
              <h2 className="light">خطوات التسجيل</h2>
              <div className="steps-box">
                <div className="row">
                  <div className="col-md-3">
                    <div className="box text-center">
                      <div className="number">
                        <span class="exterabold">1</span>
                      </div>
                      <img className="box-icon-img" src={IconsId} alt="" />
                      <h3 className="exterabold">بياناتك الشخصية</h3>
                      <h5>قم بأدخال بيناتك الشخصية صحيحة</h5>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="box text-center">
                      <div className="number">
                        <span className="exterabold">2</span>
                      </div>
                      <img className="box-icon-img" src={SteeringWheel} alt="" />
                      <h3 className="exterabold">بيانات السياره</h3>
                      <h5>قم بادخال بيانات سيارتك</h5>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="box text-center">
                      <div className="number">
                        <span className="exterabold">3</span>
                      </div>
                      <img className="box-icon-img" src={Mail} alt="" />
                      <h3 className="exterabold">انتظار التأكيد</h3>
                      <h5>سيتم الرد عليك بالتأكيد</h5>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="box text-center">
                      <div className="number">
                        <span className="exterabold">4</span>
                      </div>
                      <img className="box-icon-img" src={Car} alt="" />
                      <h3 className="exterabold">أبدأ عملك</h3>
                      <h5>هيا بنا نبدأ</h5>
                    </div>
                  </div>
                </div>
              </div>
              <Link to={'/StepOne'} className="custom-btn main-color-text">
                أبدأ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default RegistrationSteps;
