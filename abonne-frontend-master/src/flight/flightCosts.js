import { Field, Formik } from "formik";
import React, { Component } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "../App.css";
import NavBar from "../components/NavBar";
import "../style_ar.css";
import request from "../utils/request";

class flightCosts extends Component {
  state = {
    prices: [],
    fromCities: [],
    toCities: [],
    currentPrice: "",
    currentFromCity: "",
    currentToCity: "",
  };

  removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b);
  }

  componentDidMount = () => {
    request({ method: "GET", url: "/prices" })
      .then(res => {
        // console.log(res.data.prices);
        // console.log(this.state.prices);
        const fromCities = res.data.prices.map(price => price.from_city);
        const toCities = res.data.prices.map(price => price.to_city);

        // console.log({ fromCities });
        this.setState({ prices: res.data.prices });
        this.setState({ fromCities: this.removeDuplicates(fromCities) });
        this.setState({ toCities: this.removeDuplicates(toCities) });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <header className="header-pages-flight block" id="home">
        <NavBar />

        <div className="header-content-pages">
          <div className="container">
            <div className="trips-content confirmation text-center cost">
              <div className="head-info">
                <h2 className="text-center exterabold">احسب تكاليف رحلتك</h2>
                <h3 className="light text-center">
                  سافر أبونيه واستمتع برحلة هادئة و مريحة وبسعر يصل إلى 50% أقل من الأسعار العادية.
                </h3>
              </div>

              <Formik
                initialValues={{ toCity: "", fromCity: "" }}
                validationSchema={values => {
                  const schema = Yup.object().shape({
                    toCity: Yup.string().required("من"),
                    fromCity: Yup.string().required("إلي"),
                  });
                  return schema;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  console.log();
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
                  <form className="trips" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <Field
                            name="fromCity"
                            component="select"
                            className="custom-select bold"
                            value={this.state.currentFromCity}
                            onChange={e => this.setState({ currentFromCity: e.target.value })}
                          >
                            <option value="0"></option>
                            {this.state.fromCities.length &&
                              this.state.fromCities.map(city => (
                                <option key={this.state.fromCities.indexOf(city)}>{city.split(" - ")[1]}</option>
                              ))}
                          </Field>
                          <i className="custom-select-icon">
                            <FaChevronDown />
                          </i>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <Field
                            name="toCity"
                            component="select"
                            className="custom-select bold"
                            value={this.state.currentToCity}
                            onChange={e => this.setState({ currentToCity: e.target.value })}
                            disabled={!this.state.currentFromCity}
                          >
                            <select></select>
                            <option value="0"></option>
                            {this.state.prices.map(
                              price =>
                                this.state.currentFromCity === price.from_city.split(" - ")[1] && (
                                  <option key={price.id}>{price.to_city.split(" - ")[1]}</option>
                                ),
                            )}
                          </Field>
                          <i className="custom-select-icon">
                            <FaChevronDown />
                          </i>
                        </div>
                      </div>
                    </div>
                    <div className="form-grop result-calc">
                      <span className="custom-btn bold custom-submit" key="1">
                        {this.state.currentFromCity && this.state.currentToCity
                          ? this.state.prices.map(
                              price =>
                                price.from_city === this.state.currentFromCity &&
                                price.to_city === this.state.currentToCity &&
                                price.price,
                            )
                          : "0"}
                      </span>
                    </div>
                    <div className="form-group btns">
                      <Link to={"/bookFlight"} className="custom-btn bold custom-submit">
                        إحجز رحلتك
                      </Link>
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
export default flightCosts;
