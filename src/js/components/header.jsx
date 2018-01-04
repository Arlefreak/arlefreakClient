import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sticky } from 'react-sticky';

class Header extends React.Component {
  render() {
    return (
      <header id="header">
        <div className="wrapper">
          <div className="title">
            <Link to="/">
              <img className="logo" src="/img/logo.svg" alt="arlefreak" />
            </Link>
            <h2>
              by Mario Carballo<span className="hideMobile"> Zama</span>
            </h2>
          </div>
          <Sticky stickyClassName="sticky">
            <nav>
              <ul>
                <li>
                  <NavLink exact to="/" activeClassName="active">
                    <img src="/img/routes/home.svg" alt="home" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/portfolio" activeClassName="active">
                    Portfolio
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" activeClassName="active">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/logs" activeClassName="active">
                    Logs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cv/en-games" activeClassName="active">
                    CV
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/subscribe" activeClassName="active">
                    <img src="/img/routes/subscribe.svg" alt="subscribe" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ligo" activeClassName="active">
                    <img src="/img/routes/ligo.svg" alt="Φ" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/podcasts/detras-del-pixel">
                    <img src="/img/routes/btp.svg" alt="podcasts" />
                  </NavLink>
                </li>
              </ul>
            </nav>
          </Sticky>
        </div>
      </header>
    );
  }
}

export default Header;
