import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../style_ar.css';
import NavBar from '../components/NavBar';
import iconFb from '../images/icons/fb.png';

class tripsConfirmation extends Component {

  render() {
    
    return (
      <header className="header-pages-flight" id="home">
        <NavBar />

        <div className="header-content-pages">
            <div className="container">
                <div className="trips-content confirmation text-center">
                    <div className="head-info">
                        <h2 className="text-center exterabold">تم تأكيد الطلب</h2>
                        <h3 className="light text-center">
                            سيتم التواصل معك في اقرب وقت من خلال الواتس اب
                        </h3>
                        <h3 className="light text-center">
                            تابعنا علي صفحتنا من خلال
                            <a className="facebook-link" href="https://www.facebook.com/AbonneEgypt">
                              <span className="exterabold">AboneeEgypt</span></a><img className="fb-img" src={iconFb} alt="" />
                        </h3>
                        <h3 className="light phone-number">أو تواصل معنا من خلال البريد الالكتروني <span className="secon-color-text">info@abonne.net</span></h3>
                        <Link to={'/'} className="custom-btn main-color-text">الرئيسية</Link>
                    </div>
                </div>
            </div>
        </div>

    </header>
    );
  }
}
export default tripsConfirmation;
