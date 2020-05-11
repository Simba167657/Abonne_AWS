import React, { Component } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import '../style_ar.css';
import iconFb from '../images/icons/fb.png';
import request from "../utils/request";

toast.configure();
class Contact extends Component {

  notify = () => toast("تم إرسال بريدكم الإلكتروني بنجاح، وسيتم التواصل معكم في أقرب وقت ممكن");

  render() {
    return (
      <section className="contact padding-section block text-center-xs" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="contact-text-form">
                <h2 className="contact-title exterabold">
                  تواصل معنا <span className="secon-color-text">الان !</span>
                </h2>
                <p className="contact-description light">
                  يسعى فريق عمل أبونيه للتطوير و الإبتكار المستمر لتنال خدمتنا رضاء و ثقة العملاء، لذا نرحب دائماً بتواصلكم معنا.
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
                    <Field name="email" type="email" className="form-control input-contact" placeholder="بريدك الإلكتروني" required/>
                    <input type="submit" disabled={isSubmitting} className="btn custom-btn main-color-back exterabold" value="ارسال" />
                  </div>
                </form>
                )}
                </Formik>
                <h3 className="light phone-number">
                  للتواصل من خلال البريد الالكتروني :{' '}
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
