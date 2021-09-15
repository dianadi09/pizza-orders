import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/home.component";
import Orders from './components/orders.component';
import Admin from './components/admin.component';
import CreateOrder from './components/create-order.component';
import Test from './components/test.component';

function App() {
    return (
        <Router>
            <div className="container">
                <Route path="/" exact component={Home}/>
                <Route path="/orders/" exact component={Orders}/>
                <Route path="/admin/" exact component={Admin}/>
                <Route path="/createOrder/" exact component={CreateOrder}/>
                <Route path="/test/" exact component={Test}/>
            </div>
        </Router>
    );
}

export default App;
