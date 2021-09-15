import React, { Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {BASEURL} from "../consts";

export default class OrdersComponent extends Component {

    constructor() {
        super();
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        // axios.get(BASEURL + 'order').then(response => {
        //
        // });
    }

    ordersList()  {

    }

    render() {
        return (
            <div className="container">
                <Link to="/createOrder">
                    <button style={{marginTop:'20px'}} type="button" className="btn btn-lg btn-primary btn-warning" disabled>Order a pizza</button>
                </Link>

                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Order details</th>
                        <th>Total price</th>
                        <th>Order date and time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.ordersList()}
                    </tbody>
                </table>
            </div>
        )
    }
}