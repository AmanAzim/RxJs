import React from 'react';
import withObservableAsyncStream4 from './withObservableAsyncStream4';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs'
import {map, filter, scan, switchMap, catchError ,debounceTime} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax'

const jokeTypes={
        nerdy:'nerdy',
        explicit:'explicit'
};

const AppRxjs4 = ({jokes=[], onfetchJokes}) => {

    return (
        <div>
            <h5>Async State with RxJS</h5>

            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h5>Joke categories:</h5>
                        <ul>
                            {Object.values(jokeTypes).map((value, index)=>(
                                <li key={index} style={{cursor:'pointer'}} onClick={()=>onfetchJokes(value)}>
                                    {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-6">
                        <h5>List of jokes:</h5>
                        <ul>
                            {jokes.map(joke=>
                                <li key={joke.id}>
                                   {joke.joke}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};



const jokes$=new BehaviorSubject([]);

export default withObservableAsyncStream4(jokes$,{
    onfetchJokes:(value)=>ajax.getJSON(`http://api.icndb.com/jokes/random/5?exclude=[${value}]`)
        .pipe(debounceTime(1000), catchError((err)=>`An errror occured ${err}`))
        .subscribe((res)=>{console.log(res.value); return jokes$.next(res.value)}, (e)=>console.log(e))
})(AppRxjs4);

//combineLatest(jokes$, (jokes)=>jokes)