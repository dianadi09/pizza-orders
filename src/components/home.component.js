import React, { Component} from "react";
import {Link} from "react-router-dom";
import PizzaIcon from '../assets/images/pizzaBg.jpg';

export default class HomeComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link style={{marginLeft:'20px'}} to="/" className="navbar-brand">Pizza Orders</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/admin/" className="nav-link">Admin</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/orders/" className="nav-link">Orders</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/test/" className="nav-link">Test</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="row">
                    <img alt="img" src={PizzaIcon}/>
                </div>
            </React.Fragment>
        )
    }
}