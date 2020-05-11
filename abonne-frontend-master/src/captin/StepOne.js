import { ErrorMessage, Field, Formik } from "formik";
import sizeof from "object-sizeof";
import React, { Component } from "react";
import { FaChevronDown } from "react-icons/fa";
import * as Yup from "yup";
import "../App.css";
import Loader from "../components/loader";
import NavBar from "../components/NavBar";
import IconsId from "../images/icons/id.png";
import IconsWheel from "../images/icons/steering-wheel.png";
import Upload from "../images/icons/upload.png";
import "../style_ar.css";
import request from "../utils/request";

async function getUsers() {
  try {
    const response = await request({ method: "GET", url: "/cities" });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getMakes() {
  try {
    const response = await request({ method: "GET", url: "/cars/makes" });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

class StepOne extends Component {
  state = {
    cities: [],
    DestCities: [],
    makes: [],
    models: [],
    nationalID: null,
    driverPhoto: null,
    carFrontPhoto: null,
    driverLicensePhoto: null,
    carLicenseFront: null,
    carLicenseBack: null,
    submit: false,
    stepTwo: false,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    cityOfResidence: "",
    phone: "",
    whatsappNumber: "",
    favouriteDestination: "",
    carMake: "",
    carLicenseNumber: "",
    carModel: "",
    carColor: "",
    carLicenseExpire: "",
    carYearOfManufacture: "",
    loading: false,
    dublicatePhone: "",
    years: [],
    colors: [],
  };

  getModels = async () => {
    try {
      const make = this.state.carMake;
      const response = await request({ method: "GET", url: `/cars/models?make=${make}` });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount = () => {
    getUsers().then(response => {
      this.setState({
        cities: response.data.cities,
        DestCities: response.data.cities,
      });
    });

    getMakes().then(response => {
      this.setState({ makes: response.data.makes });
    });

    request({ method: "GET", url: "/cars/colors" })
      .then(res => this.setState({ colors: res.data.colors }))
      .catch(err => console.log(err));
  };

  stepTwohandler = () => {
    // const{nationalID,driverPhoto,firstName,lastName,dateOfBirth,cityOfResidence,favouriteDestination,phone} = this.state;
    //   if (nationalID && driverPhoto && firstName && lastName && dateOfBirth && cityOfResidence && favouriteDestination && phone) {
    this.setState({
      stepTwo: !this.state.stepTwo,
    });
    // }
  };

  nationalIDHandler = event => {
    console.log(event.target.files[0].size < 1 * 1024 * 1024);
    this.setState({
      nationalIDUrl: URL.createObjectURL(event.target.files[0]),
      nationalID: event.target.files[0],
    });
  };
  driverPhotoHandler = event => {
    this.setState({ driverPhotoUrl: URL.createObjectURL(event.target.files[0]), driverPhoto: event.target.files[0] });
  };

  carFrontPhotoHandler = event => {
    this.setState({ carFrontPhotoUrl: URL.createObjectURL(event.target.files[0]), carFrontPhoto: event.target.files[0] });
  };

  driverLicensePhotoHandler = event => {
    this.setState({
      driverLicensePhotoUrl: URL.createObjectURL(event.target.files[0]),
      driverLicensePhoto: event.target.files[0],
    });
  };

  carlicenseBackHandler = event => {
    this.setState({ carLicenseBackUrl: URL.createObjectURL(event.target.files[0]), carLicenseBack: event.target.files[0] });
  };

  carLicenseFrontHandler = event => {
    this.setState({ carLicenseFrontUrl: URL.createObjectURL(event.target.files[0]), carLicenseFront: event.target.files[0] });
  };

  fnameChange = e => {
    this.setState({
      firstName: e.target.value.toLowerCase(),
    });
  };
  lnameChange = e => {
    this.setState({
      lastName: e.target.value.toLowerCase(),
    });
  };
  dateOfBirthHandler = e => {
    this.setState({
      dateOfBirth: e.target.value,
    });
  };
  cityOfResidenceHandler = e => {
    this.setState({
      cityOfResidence: e.target.value,
    });
  };
  phoneHandler = e => {
    this.setState({
      phone: e.target.value,
      dublicatePhone: "",
    });
  };
  whatsappNumberHandler = e => {
    this.setState({
      whatsappNumber: e.target.value,
    });
  };
  favouriteDestinationHandler = e => {
    this.setState({
      favouriteDestination: e.target.value,
    });
  };
  carMakeHandler = e => {
    this.setState(
      {
        carMake: e.target.value,
        years: [],
      },
      () => {
        this.getModels().then(response => {
          this.setState({
            models: response.data.models,
          });
        });
      },
    );
  };

  carLicenseNumberHandler = e => {
    this.setState({
      carLicenseNumber: e.target.value,
    });
  };
  carModelHandler = e => {
    this.setState(
      {
        carModel: e.target.value,
      },
      () => {
        this.state.models.map(model => model.model === this.state.carModel && this.setState({ years: model.years }));
      },
    );
  };
  carColorHandler = e => {
    this.setState({
      carColor: e.target.value,
    });
  };
  carLicenseExpireHandler = e => {
    this.setState({
      carLicenseExpire: e.target.value,
    });
  };
  carYearOfManufactureHandler = e => {
    this.setState({
      carYearOfManufacture: e.target.value,
    });
  };

  onSubmit = values => {
    let data = new FormData();
    for (let key in values) {
      if (key === "carYearOfManufacture" && values[key] === "other") {
        data.append(key, "0");
      } else {
        data.append(key, values[key]);
      }
    }

    this.setState({
      loading: true,
    });

    console.log({ size: sizeof("values") });
    console.log({ sizeValues: sizeof(values) });
    console.log({ sizeData: sizeof(data) });

    request({
      method: "POST",
      url: "/driver",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": true,
      },
    })
      .then(response => {
        console.log(response);

        this.setState({ loading: false });
        this.props.history.push("/RegistrationIsDone");
      })
      .catch(error => {
        console.log(error.response);
        this.setState({ loading: false });
        if ((error.ErrorMessage = "this mobile number is already registered")) {
          this.setState({
            dublicatePhone: "خطأ فى تسجيل البيانات",
          });
        }
      });
    console.log(values);
    console.log(data);
  };

  form = props => {
    return (
      <form onSubmit={props.handleSubmit}>
        {!this.state.stepTwo ? (
          <div className="driver-content policies step-one">
            <div className="content">
              <div className="title">
                <span className="number light">1</span>
                <img alt="" className="box-icon-img" src={IconsId} />
                <h3 className="exterabold">بياناتك الشخصية</h3>
              </div>
              <div className="steps-box">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group names">
                      <label className="bold">
                        اسم السائق :
                        <div className="alert_erorre">
                          <ErrorMessage name="firstName" />
                        </div>
                        <div class="alert_erorre">
                          <ErrorMessage name="lastName" />
                        </div>
                      </label>
                      <Field
                        name="firstName"
                        onChange={this.fnameChange}
                        value={this.state.firstName}
                        type="text"
                        className="cutom-input bold valid"
                        placeholder={this.state.firstName || "الاول"}
                      />
                      <Field
                        name="lastName"
                        type="text"
                        onChange={this.lnameChange}
                        value={this.state.lastName}
                        className="cutom-input bold valid"
                        placeholder="الأخير"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group ">
                      <label className="bold">
                        تاريخ الميلاد :{" "}
                        <div class="alert_erorre">
                          <ErrorMessage name="dateOfBirth" />
                        </div>
                      </label>
                      <Field
                        name="dateOfBirth"
                        type="date"
                        onChange={this.dateOfBirthHandler}
                        value={this.state.dateOfBirth}
                        className="cutom-input bold valid"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group ">
                      <label className="bold">
                        مدينة الإقامة :{" "}
                        <div class="alert_erorre">
                          <ErrorMessage name="cityOfResidence" />
                        </div>
                      </label>
                      <Field
                        name="cityOfResidence"
                        component="select"
                        onChange={this.cityOfResidenceHandler}
                        value={this.state.cityOfResidence}
                        className="custom-select bold valid cities"
                      >
                        <option value="0"></option>
                        {this.state.cities.map(city => (
                          <option value={city.id}>{city.arabicName}</option>
                        ))}
                      </Field>
                      <i className="custom-select-icon">
                        <FaChevronDown />
                      </i>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="bold">
                        رقم الهاتف :{" "}
                        <div class="alert_erorre">
                          <ErrorMessage name="phone" />
                        </div>
                      </label>
                      <div class="alert_erorre">
                        <ErrorMessage name="phone" />
                        {this.state.dublicatePhone}
                      </div>
                      <Field
                        name="phone"
                        type="text"
                        onChange={this.phoneHandler}
                        value={this.state.phone}
                        className="cutom-input bold valid"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="bold">
                        رقم الواتس اب :{" "}
                        <div class="alert_erorre">
                          <ErrorMessage name="whatsappNumber" />
                        </div>
                      </label>
                      <Field
                        name="whatsappNumber"
                        type="text"
                        onChange={this.whatsappNumberHandler}
                        value={this.state.whatsappNumber}
                        className="cutom-input bold valid"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="bold">
                        الوجهة المفضلة :{" "}
                        <div class="alert_erorre">
                          <ErrorMessage name="favouriteDestination" />
                        </div>
                      </label>
                      <Field
                        name="favouriteDestination"
                        value={this.state.favouriteDestination}
                        onChange={this.favouriteDestinationHandler}
                        component="select"
                        className="custom-select bold valid cities"
                      >
                        <option value="0"></option>
                        {this.state.DestCities.map(city => (
                          <option value={city.id}>{city.arabicName}</option>
                        ))}
                      </Field>
                      <i className="custom-select-icon">
                        <FaChevronDown />
                      </i>
                    </div>
                  </div>
                </div>
                <div className="row row-upload-images text-center">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label for="peronal-img">
                        <img alt="" src={Upload} className="upload-icon" />
                        <div class="alert_erorre">
                          <ErrorMessage name="driverPhoto" />
                        </div>
                      </label>
                      <input
                        name="driverPhoto"
                        type="file"
                        onChange={this.driverPhotoHandler}
                        className="cutom-input bold valid"
                        id="peronal-img"
                      />
                      <img alt="" src={this.state.driverPhotoUrl} className="imgPrev" />
                      <p className="place-holder-imf">اضغط لإختيار الصوره</p>
                      <span className="label">صورة شخصية واضحة</span>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label for="id-img">
                        <img alt="" src={Upload} className="upload-icon" />
                        <div class="alert_erorre">
                          <ErrorMessage name="nationalID" />
                        </div>
                      </label>
                      <input
                        name="nationalID"
                        type="file"
                        onChange={this.nationalIDHandler}
                        className="cutom-input bold valid"
                        id="id-img"
                      />
                      <img alt="" className="imgPrev" src={this.state.nationalIDUrl} />
                      <p className="place-holder-imf">اضغط لإختيار الصوره</p>
                      <span className="label">صورة البطاقة الشخصية </span>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={this.stepTwohandler} className="custom-btn main-color-text">
                التالي
              </button>
            </div>
          </div>
        ) : (
          <div>
            {this.state.loading ? (
              <Loader />
            ) : (
              <div className="driver-content policies step-one">
                <div className="content">
                  <div className="title">
                    <span className="number light">2</span>
                    <img className="box-icon-img" src={IconsWheel} alt="" />
                    <h3 className="exterabold">بيانات السيارة</h3>
                    <div class="alert_erorre">
                      <ErrorMessage name="phone" />
                      {this.state.dublicatePhone}
                    </div>
                  </div>
                  <div className="steps-box">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="bold">
                            نوع السيارة :
                            <div class="alert_erorre">
                              <ErrorMessage name="carMake" />
                            </div>
                          </label>
                          <Field
                            name="carMake"
                            value={this.state.carMake}
                            onChange={this.carMakeHandler}
                            component="select"
                            className="custom-select bold valid2"
                          >
                            <option value="0"></option>
                            {this.state.makes.map(make => (
                              <option value={make}>{make}</option>
                            ))}
                            <option value="other" key="other make" style={{ color: "#ff9600" }}>
                              other
                            </option>
                          </Field>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group ">
                          <label className="bold">
                            رقم السيارة :{" "}
                            <div class="alert_erorre">
                              <ErrorMessage name="carLicenseNumber" />
                            </div>
                          </label>
                          <Field
                            name="carLicenseNumber"
                            value={this.state.carLicenseNumber}
                            onChange={this.carLicenseNumberHandler}
                            type="text"
                            className="cutom-input bold valid2"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group ">
                          <label className="bold">
                            الموديل :
                            <div class="alert_erorre">
                              <ErrorMessage name="carModel" />
                            </div>
                          </label>
                          <Field
                            name="carModel"
                            component="select"
                            onClick={this.carM}
                            value={this.state.carModel}
                            onChange={this.carModelHandler}
                            className="custom-select bold valid2"
                          >
                            <option value="0"></option>
                            {this.state.models.map(model => (
                              <option>{model.model}</option>
                            ))}
                            <option value="other" key="other model" style={{ color: "#ff9600" }}>
                              other
                            </option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="bold">
                            اللون :
                            <div class="alert_erorre">
                              <ErrorMessage name="carColor" />
                            </div>
                          </label>
                          <Field
                            name="carColor"
                            component="select"
                            state={this.state.carColor}
                            onChange={this.carColorHandler}
                            className="custom-select bold valid2"
                          >
                            <option value="0"></option>
                            {this.state.colors.length &&
                              this.state.colors.map(color => (
                                <option value={color.ar_color} key={color.id}>
                                  {color.ar_color}
                                </option>
                              ))}
                          </Field>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="bold">
                            تاريح انتهاء رخصة السيارة :
                            <div class="alert_erorre">
                              <ErrorMessage name="carLicenseExpire" />
                            </div>
                          </label>
                          <Field
                            name="carLicenseExpire"
                            value={this.state.carLicenseExpire}
                            onChange={this.carLicenseExpireHandler}
                            type="date"
                            className="cutom-input bold valid2"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group ">
                          <label className="bold">
                            سنة صنع السيارة :
                            <div class="alert_erorre">
                              <ErrorMessage name="carYearOfManufacture" />
                            </div>
                          </label>
                          <Field
                            name="carYearOfManufacture"
                            component="select"
                            value={this.state.carYearOfManufacture}
                            onChange={this.carYearOfManufactureHandler}
                            className="custom-select bold valid2"
                          >
                            <option value="0"></option>
                            {this.state.years.map(year => (
                              <option>{year}</option>
                            ))}
                            <option value="other" key="other year" style={{ color: "#ff9600" }}>
                              other
                            </option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    <div className="row row-upload-images text-center">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label for="car-front">
                            <img alt="" src={Upload} className="upload-icon" />
                            <div class="alert_erorre">
                              <ErrorMessage name="carFrontPhoto" />
                            </div>
                          </label>
                          <input
                            name="carFrontPhoto"
                            type="file"
                            onChange={this.carFrontPhotoHandler}
                            className="cutom-input bold valid"
                            id="car-front"
                          />
                          <img alt="" src={this.state.carFrontPhotoUrl} className="imgPrev" />
                          <p className="place-holder-imf">اضغط لإختيار الصوره</p>
                          <span className="label">صوره امامية للسياره واضح بها ارقام السياره</span>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label for="driver-license">
                            <img alt="" src={Upload} className="upload-icon" />
                            <div class="alert_erorre">
                              <ErrorMessage name="driverLicensePhoto" />
                            </div>
                          </label>

                          <input
                            name="driverLicensePhoto"
                            type="file"
                            onChange={this.driverLicensePhotoHandler}
                            className="cutom-input bold valid2"
                            id="driver-license"
                          />
                          <img alt="" className="imgPrev" src={this.state.driverLicensePhotoUrl} />
                          <p className="place-holder-imf">اضغط لإختيار الصوره</p>
                          <span className="label">صورة رخصة القائد</span>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label for="frony-licens">
                            <img alt="" src={Upload} className="upload-icon" />
                            <div class="alert_erorre">
                              <ErrorMessage name="carLicenseFront" />
                            </div>
                          </label>
                          <input
                            name="carLicenseFront"
                            type="file"
                            onChange={this.carLicenseFrontHandler}
                            className="cutom-input bold valid2"
                            id="frony-licens"
                          />

                          <img alt="" className="imgPrev" src={this.state.carLicenseFrontUrl} />
                          <p className="place-holder-imf">اضغط لإختيار الصوره</p>
                          <span className="label">صوره رخصه السياره الأمامية </span>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label for="back-licens">
                            <img alt="" src={Upload} className="upload-icon" />
                            <div class="alert_erorre">
                              <ErrorMessage name="carLicenseBack" />
                            </div>
                          </label>
                          <input
                            name="carLicenseBack"
                            onChange={this.carlicenseBackHandler}
                            type="file"
                            className="cutom-input bold valid2"
                            id="back-licens"
                          />
                          <img alt="" className="imgPrev" src={this.state.carLicenseBackUrl} />
                          <p className="place-holder-imf">اضغط لإختيار الصوره</p>
                          <span className="label">صوره رخصه السياره الخلفية </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button type="button" onClick={this.stepTwohandler} className="custom-btn main-color-text">
                    السابق
                  </button>
                  <button type="submit" className="custom-btn main-color-text">
                    اتمام
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    );
  };

  schema = () => {
    const schema = Yup.object().shape({
      lastName: Yup.string().required("الرجاء التحقق من إدخال الإسم الأخير"),
      dateOfBirth: Yup.date().required("يرجي إدخال تاريخ ميلادك"),
      cityOfResidence: Yup.string().required("يرجي اختيار محل إقامتك"),
      phone: Yup.number().required("يرجي إدخال رقم الهاتف الخاص بك"),
      whatsappNumber: Yup.number().required("يرجي إدخال رقم الواتساب الخاص بك"),
      favouriteDestination: Yup.string().required("يرجي اختيار واجهتك المفضلة"),
      carMake: Yup.string().required("يرجى ادخال نوع السياره"),
      carLicenseNumber: Yup.string().required("يرجى ادخال رقم السياره"),
      carYearOfManufacture: Yup.string().required("يرجى ادخال سنة صنع السيارة"),
      carLicenseExpire: Yup.string().required("يرجى ادخال تاريخ انتهاء رخصة السيارة"),
      carColor: Yup.string().required("يرجى ادخال لون السياره"),
      carModel: Yup.string().required("يرجى ادخال موديل السياره"),
      carLicenseBack: Yup.mixed().required("يرجي اختيار صورة الرخصه الخلفيه"),
      carFrontPhoto: Yup.mixed().required("يرجي اختيار صورة اماميه واضحه للسياره"),
      driverLicensePhoto: Yup.mixed().required("يرجي اختيار صورة رخصة قائد السيارة"),
      carLicenseFront: Yup.mixed().required("يرجي اختيار صورة الرخصه الامامية"),
      driverPhoto: Yup.mixed().required("يرجي اختيار صورتك الشخصية"),
      nationalID: Yup.mixed().required("يرجي اختيار صورة تحقيق الشخصية"),
    });

    return schema;
  };

  render() {
    const {
      carFrontPhoto,
      driverLicensePhoto,
      carLicenseFront,
      phone,
      carMake,
      carLicenseNumber,
      carLicenseExpire,
      carColor,
      carYearOfManufacture,
      carModel,
      favouriteDestination,
      whatsappNumber,
      lastName,
      dateOfBirth,
      cityOfResidence,
      carLicenseBack,
      firstName,
      driverPhoto,
      nationalID,
    } = this.state;
    return (
      <header className="header-pages block" id="home">
        <NavBar />

        <div className="header-content-pages">
          <div className="container">
            <Formik
              enableReinitialize
              initialValues={{
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
                cityOfResidence: cityOfResidence,
                phone: phone,
                whatsappNumber: whatsappNumber,
                favouriteDestination: favouriteDestination,
                carMake: carMake,
                carLicenseNumber: carLicenseNumber,
                carModel: carModel,
                carLicenseExpire: carLicenseExpire,
                carYearOfManufacture: carYearOfManufacture,
                carColor: carColor,
                carFrontPhoto: carFrontPhoto,
                carLicenseFront: carLicenseFront,
                carLicenseBack: carLicenseBack,
                driverLicensePhoto: driverLicensePhoto,
                driverPhoto: driverPhoto,
                nationalID: nationalID,
              }}
              onSubmit={this.onSubmit}
              render={this.form}
              validationSchema={this.schema()}
            />
          </div>
        </div>
      </header>
    );
  }
}
export default StepOne;
