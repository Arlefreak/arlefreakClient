import React from 'react';
import { Link, IndexLink } from 'react-router';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="wrapper">
                    <div className="title">
                        <a href="http://arlefreak.com/"><img className="logo" src="img/logo.svg" alt="arlefreak"/></a>
                        <h1 className="hideMobile">Mario Carballo Zama</h1>
                    </div>
                    <nav>
                        <ul>
                            <li><IndexLink to="/">Home</IndexLink></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/projects">Projects</Link></li>
                            <li><a href="http://arlefreakdev.tumblr.com/">Blog</a></li>
                            <li><a href="http://cv.arlefreak.com/index.html">CV</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
