import React from 'react';
import withcombinedObservableStream3 from './withcombinedObservableStream3';
import {BehaviorSubject, combineLatest} from 'rxjs'


const btnValues={
        good:'Good',
        bad:'Bad'
};

const AppRxjs3 = ({course, status, registration, onChangeSubject, onClickStatus, onRegistration}) => {

    return (
        <div>
            <h5>State with RxJS combined Observable</h5>
            <input type="text" value={course} onChange={(e)=>onChangeSubject(e.target.value)} />
            <div>
                {Object.values(btnValues).map((value, index)=>(
                    <button key={index} onClick={()=>onClickStatus(value)}>{value}</button>
                ))}
                <button onClick={()=>onRegistration(!registration)}>{registration? 'Unregister':'Register'}</button>
            </div>
            <p>{`Course: ${course} it is ${status} and I have ${registration? 'registered':'unregistered'}`}</p>
        </div>
    );
};

const course$=new BehaviorSubject('Math');//we are setting the initial values as Objects as we will combine the resilts of the observables later inside the callback of "combineLatest()" anyway
const status$=new BehaviorSubject(btnValues.good);
const registration$=new BehaviorSubject(true);


export default withcombinedObservableStream3(     //combineLatest combines the latest values from multiple observables
   combineLatest(course$, status$, registration$, (course, status, registration)=>({course:course, status:status, registration:registration})), //Here we are actually giving the names of the values for each observable emittions means initializing the property names
    {
    onChangeSubject:(value)=>course$.next(value),
    onClickStatus:(value)=>status$.next(value),
    onRegistration:(value)=>registration$.next(value)
})(AppRxjs3);

