import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ProjectCreate from '../components/projects/ProjectCreate';
import ProjectEdit from '../components/projects/ProjectEdit';
import ProjectDelete from '../components/projects/ProjectDelete';
import ProjectDetail from '../components/projects/ProjectDetail';
import ProjectList from '../components/projects/ProjectList';
import CandidateCreate from '../components/candidates/CandidateCreate';
import CandidateDetail from '../components/candidates/CandidateDetail';
import TaskCreate from '../components/tasks/TaskCreate';
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
                        <Route path="/projects/new/:id" component={ProjectCreate}/>
                        <Route path="/projects/edit/:id" exact component={ProjectEdit}/>
                        <Route path="/projects/delete/:id" exact component={ProjectDelete}/>
                        <Route path="/projects/:id" exact component={ProjectDetail}/>
                        <Route path="/candidates/new/:id" component={CandidateCreate}/>
                        <Route path="/candidates/:id" exact component={CandidateDetail}/>
                        <Route path="/tasks/new/:id" component={TaskCreate}/>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App;