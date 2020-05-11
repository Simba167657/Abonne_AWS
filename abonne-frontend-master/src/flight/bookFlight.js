import { ErrorMessage, Field, Formik } from "formik";
import React, { Component } from "react";
import { FaChevronDown } from "react-icons/fa";
import * as Yup from "yup";
import "../App.css";
import NavBar from "../components/NavBar";
import "../style_ar.css";
import request from "../utils/request";

class bookFlight extends Component {
  state = {
    cities: [],
  };

  componentDidMount = () => {
    request({ method: "GET", url: "/cities" })
      .then(res => {
        this.setState({ cities: res.data });
        console.log(this.state.cities);
        this.setState({ cities: res.data.cities });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <header className="header-pages-flight" id="home">
        <NavBar />

        <div className="header-content-pages">
          <div className="container">
            <div className="trips-content">
              <div className="head-info">
                <h2 className="text-center exterabold">إحجز رحلتك الآن</h2>
                <p className="light text-center">
                  أهلاً بك فى أبونيـــه ، يرجئ ملئ البيانات التالية بدقة حتى نتمكن من التواصل معكــم و إتمام الطلب.
                </p>
              </div>

              <Formik
                initialValues={{
                  name: "",
                  whatsAppNum: "",
                  date: "",
                  time: "",
                  goCity: "",
                  addressGoCity: "",
                  comeCity: "",
                  addressComeCity: "",
                  goCome: false,
                  numHours: 0,
                }}
                validationSchema={values => {
                  //const phoneRegEx = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
                  const schema = Yup.object().shape({
                    name: Yup.string()
                      .required("الرجاء التحقق من إدخال الإسم")
                      .min(8, "يجب أن لا يقل الإسم عن 8 حروف"),
                    whatsAppNum: Yup.number()
                      .typeError("هذا ليس رقم هاتف")
                      .positive("هذا ليس رقم هاتف")
                      .integer("يجب أن لايحتوي رقم الواتساب الخاص بك علي علامات عشرية")
                      .min(111111111, "تحقق من رقم الواتساب الخاص بك")
                      .max(1111111111, "تحقق من رقم الواتساب الخاص بك")
                      .required("يرجي إدخال رقم الواتساب الخاص بك"),
                    date: Yup.string().required("يرجي اختيار التاريخ"),
                    time: Yup.string().required("يرجي اختيار الوقت"),
                    goCity: Yup.string().required("يرجي تحديد نقطة المغادرة"),
                    addressGoCity: Yup.string().required("يرجي إدخال العنوان"),
                    comeCity: Yup.string().required("يرجي اختيار مدينة الوصول"),
                    addressComeCity: Yup.string().required("يرجي إدخال العنوان"),
                    goCome: Yup.boolean().required(),
                    numHours: Yup.number().required("يرجي تحديد عد ساعات الإنتظار"),
                  });
                  return schema;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  //console.log(values);

                  //   axios.post("https://api.abonne.net/api/v1/trip", {
                  //     headers: {
                  //       "Content-Type": "multipart/form-data",
                  //     },
                  //     customerName: values.name,
                  //     whatsAppNumber: values.whatsAppNum,
                  //     startDate: values.date,
                  //     startTime: values.time,
                  //     fromAddress: values.goCity + "-" + values.addressGoCity,
                  //     toAddress: values.comeCity + "-" + values.addressComeCity,
                  //     waitingHours: values.numHours,
                  //     oneWay: values.goCome,
                  //   });
                  request({
                    method: "POST",
                    url: "/trip",
                    data: {
                      customerName: values.name,
                      whatsAppNumber: values.whatsAppNum,
                      startDate: values.date,
                      startTime: values.time,
                      fromAddress: values.goCity + "-" + values.addressGoCity,
                      toAddress: values.comeCity + "-" + values.addressComeCity,
                      waitingHours: values.numHours,
                      oneWay: values.goCome,
                    },
                  })
                    .then(res => {
                      console.log(res);
                      this.props.history.push("/tripsConfirmation");
                    })
                    .catch(err => console.log(err));
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  dirty,
                  /* and other goodies */
                }) => (
                  <form className="trips myform" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bold">
                            {" "}
                            الأسم
                            <div className="alert_erorre">
                              <ErrorMessage name="name" />
                            </div>
                          </label>
                          <Field name="name" type="text" className="cutom-input bold bold" />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group ">
                          <label className="bold">
                            رقم الهاتف واتس اب{" "}
                            <div className="alert_erorre">
                              <ErrorMessage name="whatsAppNum" />
                            </div>
                          </label>
                          <Field name="whatsAppNum" type="text" className="cutom-input bold bold" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bold">
                            {" "}
                            التاريخ
                            <div className="alert_erorre">
                              <ErrorMessage name="date" />
                            </div>
                          </label>
                          <Field name="date" type="date" className="cutom-input bold bold" />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group ">
                          <label className="bold">
                            الوقت
                            <div className="alert_erorre">
                              <ErrorMessage name="time" />
                            </div>
                          </label>
                          <Field name="time" type="time" className="cutom-input bold bold" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group ">
                          <label className="bold">
                            نقطة المغادرة{" "}
                            <div className="alert_erorre">
                              <ErrorMessage name="goCity" />
                            </div>
                          </label>
                          <Field name="goCity" component="select" className="custom-select bold bold cities">
                            <option value="0"></option>
                            {this.state.cities.length
                              ? this.state.cities.map(city => <option key={city.id}>{city.arabicName}</option>)
                              : console.log(this.state.cities.length)}
                          </Field>
                          <i className="custom-select-icon">
                            <FaChevronDown />
                          </i>
                        </div>
                      </div>

                      <div className="col-md-9">
                        <div className="form-group">
                          <label className="bold">
                            العنوان
                            <div className="alert_erorre">
                              <ErrorMessage name="addressGoCity" />
                            </div>
                          </label>
                          <Field name="addressGoCity" type="text" className="cutom-textaera bold" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group ">
                          <label className="bold">
                            مدينة الوصول
                            <div className="alert_erorre">
                              <ErrorMessage name="comeCity" />
                            </div>
                          </label>
                          <Field name="comeCity" component="select" className="custom-select bold bold cities">
                            <option value="0"></option>
                            {this.state.cities.length
                              ? this.state.cities.map(city => <option key={city.id}>{city.arabicName}</option>)
                              : console.log(this.state.cities.length)}
                          </Field>
                          <i className="custom-select-icon">
                            <FaChevronDown />
                          </i>
                        </div>
                      </div>

                      <div className="col-md-9">
                        <div className="form-group">
                          <label className="bold">
                            العنوان
                            <div className="alert_erorre">
                              <ErrorMessage name="addressComeCity" />
                            </div>
                          </label>
                          <Field name="addressComeCity" type="text" className="cutom-textaera bold" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group radio-container bold">
                          <Field name="goCome" type="checkbox" id="check" className="checkbox-input" />
                          <label htmlFor="check">
                            ذهاب وعوده
                            <div className="alert_erorre">
                              <ErrorMessage name="goCome" />
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-group">
                          <label className="bold" htmlFor="">
                            عدد ساعات الإنتظار
                            <div className="alert_erorre">
                              <ErrorMessage name="numHours" />
                            </div>
                          </label>
                          <Field
                            type="number"
                            disabled={values.goCome === false}
                            name="numHours"
                            className="cutom-input bold count-input"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <input
                        type="submit"
                        disabled={isSubmitting || !dirty}
                        className="custom-btn bold custom-submit"
                        value="تأكيد الطلب"
                      />
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default bookFlight;
