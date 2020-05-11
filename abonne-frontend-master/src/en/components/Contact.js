import React, { Component } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';
import iconFb from '../../images/icons/fb.png';
import request from "../../utils/request";

class Contact extends Component {

  notify = () => toast("Your email has been sent successfully, and we will contact you as soon as possible");

  render() {
    return (
      <section className="contact padding-section block text-center-xs" id="contact" style={{ textAlign: 'left', direction: 'ltr', }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="contact-text-form">
                <h2 className="contact-title exterabold">
                  Call us <span className="secon-color-text">Now !</span>
                </h2>
                <p className="contact-description light">
                  If you have any inquiries or questions please don't hesitate to contact with us.
                </p>
                <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={values => {
                  const schema = Yup.object().shape({
                    email: Yup.string().email(),
                  });
                  return schema;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  //console.log(values);
                  request({
                    method: "POST",
                    url: "/emails",
                    data: {
                      email: values.email,
                    },
                  })
                    .then(res => {
                      console.log(res);
                      this.notify();
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

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <ErrorMessage name="email" />
                    <Field name="email" type="email" className="form-control input-contact" placeholder="write your e-email" required/>
                    <input type="submit" disabled={isSubmitting} className="btn custom-btn main-color-back exterabold" value="Send" />
                  </div>
                </form>
                )}
                </Formik>
                <h3 className="light phone-number">
                  To contact by Email :{' '}
                  <span className="secon-color-text">
                    info@abonne.net
                  </span>
                </h3>
              </div>
            </div>
  
            <div className="col-md-6">
              <div className="facebook-frame">
              <div className="frame-photo">
                  <FacebookProvider appId="DENY">
                    <EmbeddedPost href="https://www.facebook.com/AbonneEgypt/photos/a.113369903530905/142547433946485/?type=3&theater" />
                  </FacebookProvider>
                </div>
                <a className="facebook-link" href="https://www.facebook.com/AbonneEgypt" target="_blank" rel="noopener noreferrer">
                  <span className="exterabold">AboneeEgypt</span> <img alt="" className="fb-img" src={iconFb} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
}

export default Contact;
