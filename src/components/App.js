import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import ProjectCreate from '../components/projects/ProjectCreate';
import ProjectEdit from '../components/projects/ProjectEdit';
import ProjectDelete from '../components/projects/ProjectDelete';
import ProjectDetail from '../components/projects/ProjectDetail';
import ProjectList from '../components/projects/ProjectList';
import CandidateCreate from '../components/candidates/CandidateCreate';
import CandidateDetail from '../components/candidates/CandidateDetail';
import CandidateEdit from '../components/candidates/CandidateEdit';
import TaskCreate from '../components/tasks/TaskCreate';
import TaskDetail from '../components/tasks/TaskDetail';
import NoteCreate from '../components/tasks/NoteCreate';
import ProjectListOpen from '../components/projects/ProjectListOpen';
import CandidateCreateOpen from '../components/candidates/CandidateCreateOpen';
import Home from './Home';
// import OrderList from '../components/orders/OrderList';
// import OrderDelete from '../components/orders/OrderDelete';
// import OrderDetail from '../components/orders/OrderDetail';
import Signup from './Signup';
import Login from './Login';
import Header from './Header';
import HeaderOpen from './HeaderOpen'
import history from '../history';



const Public = () => {
    return (
            <Router history={history}>
                <div>
                    <HeaderOpen />
                    <Switch>
                        <Route path="/jobs/:userId" exact component={ProjectListOpen}/>
                        <Route path="/jobs/:userId/:projectId" exact component={CandidateCreateOpen}/>
                    </Switch>
                </div>
            </Router>
    )
}

const Admin = () => {
    return (
            <Router history={history}>
                <div>
                    <Header /> 
                    <Switch >
                        <div className="ui container">
                            <Route path="/" exact component={ProjectList}/>
                            <Route path="/signup" component={Signup}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/projects/new/:id" component={ProjectCreate}/>
                            <Route path="/projects/edit/:id" exact component={ProjectEdit}/>
                            <Route path="/projects/delete/:id" exact component={ProjectDelete}/>
                            <Route path="/projects/:id" exact component={ProjectDetail}/>
                            <Route path="/candidates/new/:id" component={CandidateCreate}/>
                            <Route path="/candidates/:id" exact component={CandidateDetail}/>
                            <Route path="/candidates/edit/:id" exact component={CandidateEdit}/>
                            <Route path="/tasks/:id" component={TaskCreate}/>
                            <Route path="/taskdetail/:id/:candidateId" exact component={TaskDetail}/>
                            <Route path="/notes/new/:taskId/:candidateId" component={NoteCreate}/>
                        </div>
                    </Switch>
                </div>
            </Router>
    )
}

const App = () => (
    <Router history={history}>
      <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/jobs/:userId" component={Public} />
        <Route path="/" component={Admin} />
      </Switch>
    </Router>
  );


export default App;