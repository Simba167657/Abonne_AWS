import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import NavBar from '../components/NavBar';
import IconsId from '../../images/icons/id.png';
import SteeringWheel from '../../images/icons/steering-wheel.png';
import Mail from '../../images/icons/mail.png';
import Car from '../../images/icons/car.png';

function RegistrationSteps() {
  return (
    <header className="header-pages block" id="home" style={{ textAlign: 'left', direction: 'ltr',}}>
      <NavBar />

      <div className="header-content-pages">
        <div className="container">
          <div className="driver-content policies register">
            <div className="content">
              <h2 className="light">Registration steps .</h2>
              <div className="steps-box">
                <div className="row">
                  <div className="col-md-3" style={{float: 'left'}}>
                    <div className="box text-center">
                      <div className="number">
                        <span class="exterabold">1</span>
                      </div>
                      <img className="box-icon-img" src={IconsId} alt="" />
                      <h3 className="exterabold">Personal information</h3>
                      <h5>Enter your correct personal information</h5>
                    </div>
                  </div>

                  <div className="col-md-3" style={{float: 'left'}}>
                    <div className="box text-center">
                      <div className="number">
                        <span className="exterabold">2</span>
                      </div>
                      <img className="box-icon-img" src={SteeringWheel} alt="" />
                      <h3 className="exterabold">Vehicle data</h3>
                      <h5>Enter your car data</h5>
                    </div>
                  </div>

                  <div className="col-md-3" style={{float: 'left'}}>
                    <div className="box text-center">
                      <div className="number">
                        <span className="exterabold">3</span>
                      </div>
                      <img className="box-icon-img" src={Mail} alt="" />
                      <h3 className="exterabold">Waiting for confirmation</h3>
                      <h5>You will definitely be answered</h5>
                    </div>
                  </div>

                  <div className="col-md-3" style={{float: 'left'}}>
                    <div className="box text-center">
                      <div className="number">
                        <span className="exterabold">4</span>
                      </div>
                      <img className="box-icon-img" src={Car} alt="" />
                      <h3 className="exterabold">Start Job</h3>
                      <h5>Let's start</h5>
                    </div>
                  </div>
                </div>
              </div>
              <Link to={'/en/StepOne'} className="custom-btn main-color-text">
                Start
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default RegistrationSteps;
