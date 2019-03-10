import React from 'react';
import './Home.css'

const  Home = () => {
    return (
        <div>
            <ul>
                <div className="ui container">
                <li style={{float:'left', fontSize: '18px'}}><p>Softhunt</p></li>
                <div style={{float:'right'}}>
                    <button style={{marginTop:'5px'}} className="ui button primary">Signup</button>
                    <li><a href="#home">Login</a></li>
                </div>
                </div>
            </ul>
            <div className="ui equal width aligned padded grid">
                <div className="row" style={{marginTop: '80px'}}>
                    <div className="column" style={{marginTop:'120px', marginLeft: '15%'}}>
                        <h1>Super powers for Recruiters</h1>
                        <h3>Softhunt helps recruiters build awesome job listings and manage their candidates in one place</h3>
                        <button style={{marginTop:'5px'}} className="ui large button primary">Start Free</button>
                    </div>
                    <div className="column">
                        <img style={{width: '60%', marginTop: '120px'}} src={require('../images/background.png')} />
                    </div>

                </div>
            </div>
            <div>
                <div style={{ width: '30%', margin: '180px auto 50px auto'}} className="ui section divider"></div>
                <h1 style={{textAlign: 'center'}}>How it works</h1>
                <div className="ui equal width aligned padded grid">
                    <div className="row">
                        <div className="column" style={{marginTop:'120px', marginLeft: '15%'}}>
                            <h1>Create a job list</h1>
                            <h3>Add new job positions with descriptions and specifications. <br/> Create a professional looking listing where candidates can apply</h3>
                        </div>
                        <div className="column">
                            <img style={{width: '40%', marginTop: '120px'}} src={require('../images/1.png')} />
                        </div>

                    </div>
                </div>
                <div style={{ width: '30%', margin: '100px auto 20px auto'}} className="ui section divider"></div>

                <div className="ui equal width aligned padded grid">
                    <div className="row">
                        <div className="column">
                            <img style={{width: '40%', marginTop: '120px', marginLeft: '45%'}} src={require('../images/2.png')} />
                        </div>
                        <div className="column" style={{marginTop:'120px'}}>
                            <h1>Manage all in a dashboard</h1>
                            <h3>Have control of every candidate that applies to each position. <br/> Set tasks and track progress on each candidate</h3>
                        </div>
                    </div>
                </div>
                <div style={{ width: '30%', margin: '100px auto 20px auto'}} className="ui section divider"></div>

                <div style={{paddingBottom: '100px'}} className="ui equal width aligned padded grid">
                    <div className="row">
                        <div className="column" style={{marginTop:'120px', marginLeft: '15%'}}>
                            <h1>Team work</h1>
                            <h3>Assign tasks to team members, organize information, manage <br/> progress, communicate and share notes.</h3>
                        </div>
                        <div className="column">
                            <img style={{width: '40%', marginTop: '120px'}} src={require('../images/3.png')} />
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    )
} 

export default Home