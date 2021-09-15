import React, {Component} from 'react';
import axios from "axios";
import {BASEURL} from "../consts";
import {Redirect} from 'react-router-dom';
import ToppingsManagerComponent from "./toppings-manager.component";


export default class CreateOrderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                toppings: [],
                doughTypes: [],
                sizes: [],
                chosenSize: '',
                chosenDough: '',
                chosenToppings: [],
                totalPrice: 0,
                redirect: false,
            }
        }
    }

    componentDidMount() {
        // axios.get(BASEURL + 'pizzaConfigs/').then(response => {
        //     if(response.data.data.length > 0) {
        //         let data =  response.data.data[0];
        //         this.setState({
        //             toppings: data.toppings,
        //             sizes: data.sizes,
        //             doughTypes: data.doughTypes
        //         })
        //     }
        // });


        const {data} = this.state;

        let toppings = [{name: "tuna", price: 2}, {name: "corn", price: 2}, {
            name: "pepperoni",
            price: 3
        }, {name: "cheese", price: 3}, {name: "anchobi", price: 3}, {name: "mushrooms", price: 2}];
        let sizes = [{name: 's', price: 20}, {name: 'm', price: 30}, {name: 'l', price: 40}, {
            name: 'xl',
            price: 50
        }, {name: 'xxl', price: 70}];
        let doughTypes = [{name: 'regular', price: 0}, {name: 'noGluten', price: 5}, {
            name: 'cheese',
            price: 5
        }, {name: 'spicy', price: 5}];

        data.toppings = toppings;
        data.sizes = sizes;
        data.doughTypes = doughTypes;

        //setInitialPrice
        //data.totalPrice += sizes[0].price + doughTypes[0].price;

        this.setState(prevState => ({
            data: {...prevState.data, data}
        }));

    }

    getOrderData = () => {
        return {
            owner: this.state.owner,
            candidateVersion: this.state.candidateVersion,
            candidatePercentage: this.state.candidatePercentage
        }
    }


    onSubmit = (e) => {
        e.preventDefault();

        let data = this.getOrderData();
        // axios.post(BASEURL + 'orders/create', data)
        //     .then(()=> this.setState({
        //         redirect: true
        //     }));

    }

    onPizzaSizeChange = (e) => {
        this.setState({
            size: e.target.value
        })
    }

    onDoughTypeChange = (e) => {
        this.setState({
            dough: e.target.value
        })
    }

    onToppingTypeChange = (value, index) => {
        const {data} = this.state;
        if(data.chosenToppings[index]) {
            data.chosenToppings[index].name = value
        }

        this.setState(prevState => ({
            data: {...prevState.data, data}
        }));

        this.calculateTotalPrice();
    }

    onToppingCountChange = (action, index) => {
        const {data} = this.state;
        if(data.chosenToppings[index]) {
            let count = data.chosenToppings[index].count;
            if(action === 'add') {
                count++;
            } else if(action === 'remove') {
                count--;
            }
            data.chosenToppings[index].count = count > 0 ? count : 0;
        }

        this.setState(prevState => ({
            data: {...prevState.data, data}
        }));

        this.calculateTotalPrice();
    }

    onToppingAdd = (topping) => {
        const {data} = this.state;
        data.chosenToppings.push(topping);

        this.setState(prevState => ({
            data: {...prevState.data, data}
        }));

        this.calculateTotalPrice();
    }

    onToppingRemove = (index) => {
        const {data} = this.state;
        data.chosenToppings.splice(index, 1);

        this.setState(prevState => ({
            data: {...prevState.data, data}
        }));

        this.calculateTotalPrice();
    }

    getToppingPrice(toppingName) {
        let price = 0;
        let toppings =  this.state.data.toppings;
        for(let i=0; i< toppings.length; i++ ) {
            if(toppings[i].name === toppingName) {
                price = toppings[i].price;
                break;
            }
        }
        return price;
    }

    calculateTotalPrice() {
        let totalPrice = 0;
        let chosenToppings = this.state.data.chosenToppings;
        chosenToppings.forEach(item => {
            let price = this.getToppingPrice(item.name);
            totalPrice+= item.count*price;
        })

        const {data} = this.state;
        data.totalPrice = totalPrice;

        this.setState(prevState => ({
            data: {...prevState.data, data}
        }));
    }

    render() {
        return (
            <React.Fragment>
                {this.state.redirect ? (<Redirect push to="/orders"/>) : null}
                <div>
                    <h2>Total price: {this.state.data.totalPrice} $</h2>
                    <h3>Order Details</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Pizza Size: </label>
                            <select
                                required
                                className="form-control"
                                value={this.state.data.size}
                                onChange={this.onPizzaSizeChange}>
                                {
                                    this.state.data.sizes.map(function (size) {
                                        return <option
                                            key={size.name}
                                            value={size.name}>{size.name}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                        <div style={{marginTop: '10px'}} className="form-group">
                            <label>Dough Type: </label>
                            <select
                                required
                                className="form-control"
                                value={this.state.data.dough}
                                onChange={this.onDoughTypeChange}>
                                {
                                    this.state.data.doughTypes.map(function (type) {
                                        return <option
                                            key={type.name}
                                            value={type.name}>{type.name}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                        <div style={{marginTop: '20px'}} className="form-group">
                            <label>Toppings: </label>
                            <ToppingsManagerComponent
                                onToppingAdd={this.onToppingAdd}
                                onToppingTypeChange={this.onToppingTypeChange}
                                onToppingCountChange={this.onToppingCountChange}
                                onToppingRemove={this.onToppingRemove}
                                toppings={this.state.data.toppings}
                                chosenTopppings={this.state.data.chosenToppings || []}
                            ></ToppingsManagerComponent>
                        </div>
                        <div style={{marginTop: '20px'}} className="form-group submit-btn">
                            <input type="submit" value="Submit your order" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}