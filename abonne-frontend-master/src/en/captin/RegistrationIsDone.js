import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import NavBar from '../components/NavBar';
import FpIcon from '../../images/icons/fb.png';
import Checklist from '../../images/icons/checklist.png';

function RegistrationIsDone() {
  return (
    <header className="header-pages block" id="home" style={{ textAlign: 'left', direction: 'ltr',}}>
      <NavBar />

      <div className="header-content-pages">
        <div className="container">
          <form>
            <div className="driver-content policies step-one">
              <div class="content">
                <div class="title">
                  <span class="number light">3</span>
                  <img class="box-icon-img" src={Checklist} alt="" />
                  <h3 class="exterabold done">the registration is done</h3>
                  <p class="bold">Your request to join Abonne will be answered as soon as possible.</p>
                  <h3 class="light text-center flow">
                    Follow us on:
                    <a class="facebook-link" target="_blank" href="https://www.facebook.com/AbonneEgypt">
                      <span class="bold">AboneeEgypt</span>
                    </a>
                    <img class="fb-img" src={FpIcon} alt="" />
                  </h3>
                </div>
                <Link to={'/en/home'} className="custom-btn">
                  Home
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
