import React from 'react';
import '../App.css';
import '../style_ar.css';
import NavBar from '../components/NavBar';
import IconsWheel from '../images/icons/steering-wheel.png';
import Upload from '../images/icons/upload.png';

function StepTow() {
  return (
    <header className="header-pages block" id="home">
      <NavBar />

      <div className="header-content-pages">
        <div className="container">
          <form>
            <div className="driver-content policies step-one">
              <div className="content">
                <div className="title">
                  <span className="number light">2</span>
                  <img alt="something" className="box-icon-img" src={IconsWheel} />
                  <h3 className="exterabold">بيانات السيارة</h3>
                </div>
                <div className="steps-box">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bold">نوع السيارة :</label>
                        <select className="custom-select bold valid2" required>
                          <option></option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group ">
                        <label className="bold">رقم السيارة :</label>
                        <input type="text" className="cutom-input bold valid2" required />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group ">
                        <label className="bold">الموديل :</label>
                        <select className="custom-select bold valid2" required>
                          <option value=""></option>
                          <option></option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bold">اللون :</label>
                        <select className="custom-select bold valid2" required>
                          <option></option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bold">تاريح انتهاء رخصة السيارة :</label>
                        <input type="date" className="cutom-input bold valid2" required />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group ">
                        <label className="bold">سنة صنع السيارة :</label>
                        <select className="custom-select bold valid2" required>
                          <option></option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row row-upload-images text-center">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label>
                          <img alt="something" src={Upload} className="upload-icon" />
                        </label>
                        <input type="file" className="cutom-input bold valid2" id="car-front" required />
                        <p className="place-holder-imf">اضغط لإختيار الصوره</p>
                        <span className="label">صوره امامية للسياره واضح بها ارقام السياره</span>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label>
                          <img alt="something" src={Upload} className="upload-icon" />
                        </label>
                        <input type="file" className="cutom-input bold valid2" id="driver-license" required />
                        <p className="place-holder-imf">اضغط لإختيار الصوره</p>
                        <span className="label">صورة رخصة القائد</span>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label>
                          <img alt="something" src={Upload} className="upload-icon" />
                        </label>
                        <input type="file" className="cutom-input bold valid2" id="frony-licens" required />
                        <p className="place-holder-imf">اضغط لإختيار الصوره</p>
                        <span className="label">صوره رخصه السياره الأمامية </span>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label>
                          <img alt="something" src={Upload} className="upload-icon" />
                        </label>
                        <input type="file" className="cutom-input bold valid2" id="back-licens" required />
                        <p className="place-holder-imf">اضغط لإختيار الصوره</p>
                        <span className="label">صوره رخصه السياره الخلفية </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button id="" type="button" className="custom-btn main-color-text">
                  اتمام
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

export default StepTow;
