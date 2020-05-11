import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import NavBar from '../components/NavBar';
import iconFb from '../../images/icons/fb.png';

class tripsConfirmation extends Component {

  render() {
    
    return (
      <header className="header-pages-flight" id="home" style={{ textAlign: 'left', direction: 'ltr',}}>
        <NavBar />

        <div className="header-content-pages">
            <div className="container">
                <div className="trips-content confirmation text-center">
                    <div className="head-info">
                        <h2 className="text-center exterabold">The order has been confirmed</h2>
                        <h3 className="light text-center">
                          You will be contacted as soon as possible on WhatsApp
                        </h3>
                        <h3 className="light text-center">
                            Follow Us On
                            <a className="facebook-link" href="https://www.facebook.com/AbonneEgypt">
                              <span className="exterabold">AbonneEgypt</span></a><img className="fb-img" src={iconFb} alt="" />
                        </h3>
                        <h3 className="light phone-number">Or contact by Email <span className="secon-color-text">info@abonne.net</span></h3>
                        <Link to={'/en/home'} className="custom-btn main-color-text">Home</Link>
                    </div>
                </div>
            </div>
        </div>

    </header>
    );
  }
}
export default tripsConfirmation;
