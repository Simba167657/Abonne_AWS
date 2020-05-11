import React from 'react';
import '../App.css';
import '../style_ar.css';
import features from '../images/features.png';
import eco from '../images/eco.png';
import travel from '../images/travel.png';
import security from '../images/security.png';

function Features() {
  return (
    <section className="features padding-section block text-center-xs">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="features-box">
              <div className="title-box">
                <img alt="something" className="img-responsive center-block" src={features} />
                <p className="features-desc light">
                  فى أبونية نوفر لك كل خصائص الراحة والرفاهية لأننا نعلم ان الإنتقال بين المدن والمحافظات يحتاج وسيلة سفر أكثر
                  راحة ورفاهية إلى جانب الإلتزام بالمواعيد المحددة وأقل من الأسعار العادية .
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="row">
              <div className="col-md-4">
                <div className="feature text-center">
                  <img alt="something" src={eco} className="img-responsive center-block" />
                  <h3 className="main-color-text exterabold">اقتصادي</h3>
                  <h5>سعر اقتصادي ومميز</h5>
                </div>
              </div>

              <div className="col-md-4">
                <div className="feature text-center">
                  <img alt="something" src={travel} className="img-responsive center-block" />
                  <h3 className="main-color-text exterabold">سفر مريح</h3>
                  <h5>إستمتع بسفر هادئ و مريح </h5>
                </div>
              </div>

              <div className="col-md-4">
                <div className="feature text-center">
                  <img alt="something" src={security} className="img-responsive center-block" />
                  <h3 className="main-color-text exterabold">آمن</h3>
                  <h5>رحلة آمنه لك و لعائلتك </h5>
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
