import React from 'react';
import { Link, IndexLink } from 'react-router';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="wrapper">
                    <div className="title">
                        <img className="logo" src="img/logo.svg" alt="arlefreak"/>
                        <h1 className="hideMobile">Mario Carballo Zama</h1>
                    </div>
                    <nav>
                        <ul>
                            <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                            <li><Link to="/about" activeClassName="active">About</Link></li>
                            <li><Link to="/projects" activeClassName="active">Projects</Link></li>
                            <li><Link to="/diary" activeClassName="active">Diary</Link></li>
                            <li><Link to="/cv" activeClassName="active">CV</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
