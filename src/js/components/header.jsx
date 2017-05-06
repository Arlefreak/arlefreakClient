import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sticky } from 'react-sticky';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="wrapper">
                    <div className="title">
                        <Link to="/"><img className="logo" src="/img/logo.svg" alt="arlefreak"/></Link>
                        <h1 className="hideMobile">Mario Carballo Zama</h1>
                    </div>
                    <Sticky stickyClassName="sticky">
                        <nav>
                            <ul>
                                <li><NavLink exact to="/" activeClassName="active">▲</NavLink></li>
                                <li><NavLink to="/projects" activeClassName="active">Projects</NavLink></li>
                                <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
                                <li><NavLink to="/logs" activeClassName="active">Logs</NavLink></li>
                                <li><NavLink to="/cv" activeClassName="active">CV</NavLink></li>
                                <li><NavLink to="/ligoj" activeClassName="active">Φ</NavLink></li>
                            </ul>
                        </nav>
                    </Sticky>
                </div>
            </header>
        );
    }
}

export default Header;
