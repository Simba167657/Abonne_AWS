import { ErrorMessage, Field, Formik } from "formik";
import React, { Component } from "react";
import { FaChevronDown } from "react-icons/fa";
import * as Yup from "yup";
import "../../App.css";
import NavBar from "../components/NavBar";
import request from "../../utils/request";

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
      <header className="header-pages-flight" id="home"  style={{ textAlign: 'left', direction: 'ltr',}}>
        <NavBar />

        <div className="header-content-pages">
          <div className="container">
            <div className="trips-content">
              <div className="head-info">
                <h2 className="text-center exterabold">Book your trip now</h2>
                  <p className="light text-center">Welcome to Abonne,
                    please fill out the following details carefully so that we can communicate with you and complete the request.
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
                      .required('Please check that the name has been entered')
                      .min(8, 'The name must be at least 8 characters long'),
                  whatsAppNum: Yup.number()
                      .typeError('This is not a phone number').positive('This is not a phone number').integer('Your WhatsApp number must not contain decimal places')
                      .min(111111111, "Check your WhatsApp number").max(1111111111, "Check your WhatsApp number").required('Please enter your WhatsApp number'),
                  date: Yup.string().required('Please choose a date'),
                  time: Yup.string().required('Please choose a time'),
                  goCity: Yup.string().required('Please specify the departure point'),
                  addressGoCity: Yup.string().required('Please enter the address'),
                  comeCity: Yup.string().required('Please choose the arrival city'),
                  addressComeCity: Yup.string().required('Please enter the address'),
                  goCome: Yup.boolean().required(),
                  numHours: Yup.number().required('Please select a number of waiting hours'),
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
                      this.props.history.push("/en/flight/tripsConfirmation");
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
                      <div className="col-md-6" style={{float: 'left'}}>
                        <div className="form-group">
                          <label className="bold">
                            {' '}
                            Name
                            <div className="alert_erorre">
                              <ErrorMessage name="name" />
                            </div>
                          </label>
                          <Field name="name" type="text" className="cutom-input bold bold" />
                        </div>
                      </div>

                      <div className="col-md-6" style={{float: 'left'}}>
                        <div className="form-group ">
                          <label className="bold">
                            WhatsApp number{' '}
                            <div className="alert_erorre">
                            <ErrorMessage name="whatsAppNum" />
                            </div>
                          </label>
                          <Field name="whatsAppNum" type="text" className="cutom-input bold bold" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6" style={{float: 'left'}}>
                        <div className="form-group">
                          <label className="bold">
                            {" "}
                            Date
                            <div className="alert_erorre">
                              <ErrorMessage name="date" />
                            </div>
                          </label>
                          <Field name="date" type="date" className="cutom-input bold bold" />
                        </div>
                      </div>

                      <div className="col-md-6" style={{float: 'left'}}>
                        <div className="form-group ">
                          <label className="bold">
                            Time
                            <div className="alert_erorre">
                              <ErrorMessage name="time" />
                            </div>
                          </label>
                          <Field name="time" type="time" className="cutom-input bold bold" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3" style={{float: 'left'}}>
                        <div className="form-group ">
                          <label className="bold">
                            Travelers' point{' '}
                            <div className="alert_erorre">
                              <ErrorMessage name="goCity" />
                            </div>
                          </label>
                          <Field name="goCity" component="select" className="custom-select bold bold cities">
                            <option value="0"></option>
                            {this.state.cities.length
                              ? this.state.cities.map(city => <option key={city.id}>{city.englishName}</option>)
                              : console.log(this.state.cities.length)}
                          </Field>
                          <i className="custom-select-icon" style={{left: 'auto', right: '14%' }} >
                            <FaChevronDown />
                          </i>
                        </div>
                      </div>

                      <div className="col-md-9" style={{float: 'left'}}>
                        <div className="form-group">
                          <label className="bold">
                            Address
                            <div className="alert_erorre">
                              <ErrorMessage name="addressGoCity" />
                            </div>
                          </label>
                          <Field name="addressGoCity" type="text" className="cutom-textaera bold" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3" style={{float: 'left'}}>
                        <div className="form-group ">
                          <label className="bold">
                            City of arrival 
                            <div className="alert_erorre">
                              <ErrorMessage name="comeCity" />
                            </div>
                          </label>
                          <Field name="comeCity" component="select" className="custom-select bold bold cities">
                            <option value="0"></option>
                            {this.state.cities.length
                              ? this.state.cities.map(city => <option key={city.id}>{city.englishName}</option>)
                              : console.log(this.state.cities.length)}
                          </Field>
                          <i className="custom-select-icon" style={{left: 'auto', right: '14%' }}>
                            <FaChevronDown />
                          </i>
                        </div>
                      </div>

                      <div className="col-md-9" style={{float: 'left'}}>
                        <div className="form-group">
                          <label className="bold">
                            Address
                            <div className="alert_erorre">
                              <ErrorMessage name="addressComeCity" />
                            </div>
                          </label>
                          <Field name="addressComeCity" type="text" className="cutom-textaera bold" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3" style={{float: 'left'}}>
                        <div className="form-group radio-container bold" style={{ textAlign: 'center', direction: 'rtl',}}>
                          <Field name="goCome" type="checkbox" id="check" className="checkbox-input" />
                          <label htmlFor="check">
                            Round-trip 
                            <div className="alert_erorre">
                              <ErrorMessage name="goCome" />
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-9" style={{float: 'left'}}>
                        <div className="form-group">
                          <label className="bold" htmlFor="">
                            Hours of waiting
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
                        value="Confirmation"
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
