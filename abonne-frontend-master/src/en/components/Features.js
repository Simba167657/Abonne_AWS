import React from 'react';
import '../../App.css';
import features from '../../images/features.png';
import eco from '../../images/eco.png';
import travel from '../../images/travel.png';
import security from '../../images/security.png';

function Features() {
  return (
    <section className="features padding-section block text-center-xs" style={{ textAlign: 'left', direction: 'ltr',}}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="features-box">
              <div className="title-box">
                <img alt="something" className="img-responsive center-block" src={features} />
                <p className="features-desc light">
                  Your rides between governorates may take longer time than your daily transport in your city, so we provide all the comfort and luxury features for you and your family in Abonne.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="row">
              <div className="col-md-4">
                <div className="feature text-center">
                  <img alt="something" src={eco} className="img-responsive center-block" />
                  <h3 className="main-color-text exterabold">Economical</h3>
                  <h5>Economical price</h5>
                </div>
              </div>

              <div className="col-md-4">
                <div className="feature text-center">
                  <img alt="something" src={travel} className="img-responsive center-block" />
                  <h3 className="main-color-text exterabold">comfortable</h3>
                  <h5>Enjoy a quiet and relaxing trip</h5>
                </div>
              </div>

              <div className="col-md-4">
                <div className="feature text-center">
                  <img alt="something" src={security} className="img-responsive center-block" />
                  <h3 className="main-color-text exterabold">Safe</h3>
                  <h5>Safe trip for you and your family</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
