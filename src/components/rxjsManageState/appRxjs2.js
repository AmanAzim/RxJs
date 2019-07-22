import React from 'react';
import withObservableStream2 from './withObservableStream2';
import {Subject} from 'rxjs'


const AppRxjs1 = ({country, status,  onChangeCountry, onChangeStatus}) => {
    return (
        <div>
            <h5>State with RxJS 2nd</h5>
            <input type="text" value={country} onChange={(e)=>onChangeCountry(e.target.value)} />
            <input type="text" value={status} onChange={(e)=>onChangeStatus(e.target.value)} />
             <p>{`Country:${country}`}</p>
            <p>{`Status:${status}`}</p>
        </div>
    );
};

const query$=new Subject();//we are using Subject not BehavioralSubject we we are setting the initial state down there


export default withObservableStream2(query$,
    { //we are sending the newly created Observable "query$" and a function "onChangeQuery" that actually calls the next() of that Observable
    onChangeCountry:(value)=>query$.next({country:value}),
    onChangeStatus:(value)=>query$.next({status:value})
}, { //We can set the initial state also here
    country:'Bangladesh',
    status:'Single'
})(AppRxjs1);