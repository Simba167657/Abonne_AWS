import React, { Component } from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import { NavLink } from "react-router-dom";
import '../../App.css';
import '../../style_ar.css';
import logo from '../../images/logo.png';
import { FaBars } from 'react-icons/fa';

class NavBar extends Component {

  constructor() {
    super();
    this.state = {
      scrolled: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const isTop = window.scrollY < 100;
      if (isTop !== true) {
        this.setState({scrolled: true});
      } else {
        this.setState({scrolled: false});
      }
    });
  }


  // componentWillMount() {
  //   window.removeEventListener('scroll');
  // }

  render () {
    return (
      <nav className={this.state.scrolled ? 'navbar navbar-default fixed-top' : 'navbar navbar-default'} style={{ textAlign: 'left', direction: 'ltr', }}>
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
              <i className="fa fa-bars"><FaBars /></i>
            </button>
            <a className="navbar-brand" href="/en/home">
              <img alt="logo" src={logo}></img>
            </a>
          </div>
  
          <div className="collapse navbar-collapse" id="abonee" style={{ textAlign: 'left', direction: 'ltr',}}>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/">Ar</a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link activeClass="active" to="contact" spy={true} smooth={true} offset={0} duration= {500}>Contact us</Link>
              </li>
              <li>
                <Link activeClass="active" to="about" spy={true} smooth={true} offset={0} duration= {500}>About Abonne</Link>
              </li>
              <li className="">
                <NavLink activeClassName="active1" to="/en/home">Home</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;