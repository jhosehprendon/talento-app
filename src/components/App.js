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
import CandidateListTotal from '../components/candidates/CandidateListTotal';
import Home from './Home';

import UserProfile from '../components/user/UserProfile';
import PortafolioCreate from '../components/portafolio/PortafolioCreate';
import PortafolioDetail from '../components/portafolio/PortafolioDetail';

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

const User = () => {
    return (
            <Router history={history}>
                <div>
                <Header />
                    <Switch>
                        <div className="ui container">
                            <Route path="/user" exact component={UserProfile}/>
                            <Route path="/user/portafolio/new" exact component={PortafolioCreate}/>
                            <Route path="/user/portafolio/:id" exact component={PortafolioDetail}/>
                        </div>
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
                            <Route path="/app" exact component={ProjectList}/>
                            <Route path="/app/candidates" exact component={CandidateListTotal}/>
                            <Route path="/app/signup" component={Signup}/>
                            <Route path="/app/login" component={Login}/>
                            <Route path="/app/projects/new/:id" component={ProjectCreate}/>
                            <Route path="/app/projects/edit/:id" exact component={ProjectEdit}/>
                            <Route path="/app/projects/delete/:id" exact component={ProjectDelete}/>
                            <Route path="/app/projects/:id" exact component={ProjectDetail}/>
                            <Route path="/app/candidates/new/:id" component={CandidateCreate}/>
                            <Route path="/app/candidates/:id" exact component={CandidateDetail}/>
                            <Route path="/app/candidates/edit/:id" exact component={CandidateEdit}/>
                            <Route path="/app/tasks/:id" component={TaskCreate}/>
                            <Route path="/app/taskdetail/:id/:candidateId" exact component={TaskDetail}/>
                            <Route path="/app/notes/new/:taskId/:candidateId" component={NoteCreate}/>
                        </div>
                    </Switch>
                </div>
            </Router>
    )
}

const App = () => (
    <Router history={history}>
      <Switch>
        <Route path="/app" component={Admin} />
        <Route path="/user" component={User} />
        <Route path="/jobs/:userId" component={Public} />
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );


export default App;