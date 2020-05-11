import React from "react";
import "../App.css";
import aboutCar from "../images/about-car-ar.png";
import "../style_ar.css";

function About() {
  return (
    <section className="about padding-section block" id="about">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="about-img hidden-lg hidden-md">
              <img alt="about" src={aboutCar} id="about-image" />
            </div>
          </div>
          <div className="col-md-8">
            <h2 className="about-title main-color-text exterabold">
              اعرف اكتر عن <span className="secon-color-text">أبونيه</span>
            </h2>
            <p className="about-decribtion">
            أبونيه شركة مصرية 100% ، تأسست لتقدم خدمة نقل و مواصلات مميزة وبأسعار تنافسية.
            تعد أبونيه أول شركة مصرية تعمل بكامل طاقتها لتقدم خدمات التوصيل بين المدن من الباب للباب و تملك فريق عمل يسعى جاهداً للتطوير و الإبتكار ليقدم أقفصل خدمة لأبناء المجتمع المصرى.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
