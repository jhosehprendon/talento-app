import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ProjectCreate from '../components/projects/ProjectCreate';
// import ProductEdit from '../components/products/ProductEdit';
// import ProductDelete from '../components/products/ProductDelete';
// import ProductDetail from '../components/products/ProductDetail';
import ProjectList from '../components/projects/ProjectList';
// import OrderList from '../components/orders/OrderList';
// import OrderDelete from '../components/orders/OrderDelete';
// import OrderDetail from '../components/orders/OrderDetail';
import Signup from './Signup';
import Login from './Login';
import Header from './Header';
import history from '../history';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header /> 
                    <Switch>
                        <Route path="/" exact component={ProjectList}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/projects/new" component={ProjectCreate}/>
                        {/* <Route path="/products/edit/:id" exact component={ProductEdit}/>
                        <Route path="/products/delete/:id" exact component={ProductDelete}/>
                        <Route path="/orders/delete/:id" exact component={OrderDelete}/>
                        <Route path="/products/:id" exact component={ProductDetail}/>
                        <Route path="/orders/:id" exact component={OrderDetail}/>
                        <Route path="/orders" component={OrderList}/>  */}
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App;