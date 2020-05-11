import React, { Component } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import "../App.css";
import logo from "../images/logo.png";
import "../style_ar.css";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      scrolled: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      const isTop = window.scrollY < 100;
      if (isTop !== true) {
        this.setState({ scrolled: true });
      } else {
        this.setState({ scrolled: false });
      }
    });
  }

  // componentWillMount() {
  //   window.removeEventListener('scroll');
  // }

  render() {
    return (
      <nav className={this.state.scrolled ? "navbar navbar-default fixed-top" : "navbar navbar-default"}>
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#abonee"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <i className="fa fa-bars">
                <FaBars />
              </i>
            </button>
            <a className="navbar-brand" href="/">
              <img alt="logo" src={logo}></img>
            </a>
          </div>

          <div className="collapse navbar-collapse" id="abonee">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/en/home">En</a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="">
                <NavLink activeClassName="active1" to="/">
                  الرئيسية
                </NavLink>
              </li>
              <li>
                <Link activeClass="active" to="about" spy={true} smooth={true} offset={0} duration={500}>
                  عن أبونيه
                </Link>
              </li>
              <li>
                <Link activeClass="active" to="contact" spy={true} smooth={true} offset={0} duration={500}>
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;