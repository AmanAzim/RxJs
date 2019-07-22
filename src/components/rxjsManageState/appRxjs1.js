import React from 'react';
import withObservableStream1 from './withObservableStream1';
import {BehaviorSubject} from 'rxjs'

                        //we can set the initial value also here instead of creating another Observable
const AppRxjs1 = ({query, age=31,  onChangeQuery, onChangeAge}) => {
    return (
        <div>
            <h5>State with RxJS 1st</h5>
            <input type="text" value={query} onChange={(e)=>onChangeQuery(e.target.value)} />
            <input type="text" value={age} onChange={(e)=>onChangeAge(e.target.value)} />
             <p>{`http://hn.algolia.com/api/v1/search?query=${query}`}</p>
            <p>{`Age:${age}`}</p>
        </div>
    );
};
                                                        //because we already set a initial value on the top as props
const query$=new BehaviorSubject({query:'React', age:null});//initial state is an object {query:'React'}//It stores the latest value emitted to its consumers, and whenever a new Observer subscribes, it will immediately receive the “current value”


export default withObservableStream1(query$, { //we are sending the newly created Observable "query$" and a function "onChangeQuery" that actually calls the next() of that Observable
    onChangeQuery:(value)=>query$.next({query:value}),
    onChangeAge:(value)=>query$.next({age:value})
})(AppRxjs1);