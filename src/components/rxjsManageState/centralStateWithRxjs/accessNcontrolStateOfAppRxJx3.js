import React, {Component} from 'react';

//We are importing the Observables and the event Handlers from another component so that we can access and control the state in this Component
import {course$, status$, registration$, onChangeSubjectExpo, onClickStatusExpo, onRegistrationExpo} from './appRxjs3'
import {combineLatest} from "rxjs";


class AccessNcontrolStateOfAppRxJx3 extends Component {

    state={
        course:'',
        status:'',
        registration:''
    };

    componentDidMount() {
        this.subscription=combineLatest(course$, status$, registration$, (course, status, registration)=>({course:course, status:status, registration:registration}))
            .subscribe((value)=>this.setState({...value}), (e)=>console.log(e));
    }
    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (
            <div>
                <p>{`Course in separate component: ${this.state.course} it is ${this.state.status} and I have ${this.state.registration? 'registered':'unregistered'}`}</p>
                <button onClick={()=>onRegistrationExpo(!this.state.registration)}>{this.state.registration? 'Unregister':'Register'}</button>
            </div>
        );
    }
}

export default AccessNcontrolStateOfAppRxJx3;