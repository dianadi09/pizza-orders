import React, { Component} from "react";

const ToppingItem = props => (
    <div style={{marginTop: '10px'}} className="container">
        <div className="row">
            <div className="col-sm">
                <div>Count: {props.count}</div>
            </div>
            <div className="col-sm">
                <button className="btn btn-primary" onClick={() => props.onToppingCountChange('add', props.id)}>+</button>
                <button style={{marginLeft: '10px'}} className="btn btn-primary" onClick={() => props.onToppingCountChange('remove', props.id)}>-</button>
            </div>
            <div className="col-sm">
                <select
                    className="form-control"
                    value={props.name}
                    onChange={(e) => {props.onToppingTypeChange(e.target.value, props.id)}}>
                    {
                        props.toppings.map(function(topping, index) {
                            return <option
                                key={topping.name}
                                value={topping.name}>{topping.name}
                            </option>;
                        })
                    }
                </select>
            </div>
            <div className="col-sm">
                <button className="btn btn-danger" onClick={props.onToppingRemove}>Delete</button>
            </div>
        </div>
    </div>
)


export default class ToppingsManagerComponent extends Component {

    constructor(props) {
        super(props);
    }

    createToppingList = () => {
        if(!this.props.chosenTopppings) return;
        return this.props.chosenTopppings.map((item, index) => {
            return <ToppingItem key={index}
                                id={index}
                                name={item.name}
                                count={item.count}
                                onToppingCountChange={this.props.onToppingCountChange}
                                onToppingTypeChange={this.props.onToppingTypeChange}
                                onToppingRemove={this.props.onToppingRemove}
                                toppings={this.props.toppings}></ToppingItem>
        })
    }

    render() {
        return (
            <React.Fragment>
                <button style={{marginLeft: '20px'}} className="btn btn-secondary btn-small"
                        onClick={() => this.props.onToppingAdd({...this.props.toppings[0], count: 1})}>Add new topping
                </button>
                {this.createToppingList()}
            </React.Fragment>
        )
    }
}