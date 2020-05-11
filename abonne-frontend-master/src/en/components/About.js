import React from 'react';
import '../../App.css';
import aboutCar from '../../images/about-car-ar.png';

function About() {
  return (
    <section className="about padding-section block" id="about" style={{ textAlign: 'left', direction: 'ltr', }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="about-img hidden-lg hidden-md">
              <img alt="about" src={aboutCar} id="about-image" />
            </div>
          </div>
          <div className="col-md-8">
            <h2 className="about-title main-color-text exterabold">
              More For <span className="secon-color-text">Abonne</span>
            </h2>
            <p className="about-decribtion">
              Abonne is 100% Egyptian company founded to provide transportation services all over Egypt with competitive price.
              Abonne is the first company that fully operating on transportation services between governorates and cities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
