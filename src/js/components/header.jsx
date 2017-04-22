import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="wrapper">
                    <div className="title">
                        <Link to="/"><img className="logo" src="/img/logo.svg" alt="arlefreak"/></Link>
                        <h1 className="hideMobile">Mario Carballo Zama</h1>
                    </div>
                    <nav>
                        <ul>
                            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                            <li><NavLink to="/projects" activeClassName="active">Projects</NavLink></li>
                            <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
                            <li><NavLink to="/diary" activeClassName="active">Diary</NavLink></li>
                            <li><NavLink to="/cv" activeClassName="active">CV</NavLink></li>
                            <li><NavLink to="/ligoj" activeClassName="active">▲</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
