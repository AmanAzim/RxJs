import React,{useEffect} from 'react';
import withObservableAsyncStream4 from './withObservableAsyncStream4';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs'
import {map, filter, scan, switchMap, catchError ,debounceTime, share} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax'



const jokeTypes={
        nerdy:'nerdy',
        explicit:'explicit'
};

const AppRxjs4 = ({jokes=[], selectedJoke, onfetchJokes, onSelectJoke}) => {


    return (
        <div>
            <h5 className="text-center">Async State with RxJS</h5>

            <div className="container text-center">
                <div className="row">
                    <div className="col-6">
                        <h5>Joke categories:</h5>
                        <ul className="list-unstyled">
                            {Object.values(jokeTypes).map((value, index)=>(
                                <li key={index} style={{cursor:'pointer'}} onClick={()=>onfetchJokes(value)}>
                                    {value}
                                </li>
                            ))}
                        </ul>
                        <h6>Selected Joke:</h6>
                        <p style={{fontSize:30, color:'green'}}>{selectedJoke}</p>
                    </div>
                    <div className="col-6">
                        <h5>List of jokes:</h5>
                        <ul>
                            {jokes.map(joke=>
                                <li key={joke.id} style={{cursor:'pointer'}} onClick={()=>onSelectJoke(joke.joke)}>
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



const jokes$=new Subject();
const selectedJoke$=new BehaviorSubject('Select a Joke')

export default withObservableAsyncStream4(
    combineLatest(jokes$, selectedJoke$, (jokes, selectedJoke)=>({jokes:jokes, selectedJoke:selectedJoke})),
    {
        onfetchJokes:(value)=>{
            ajax.getJSON(`http://api.icndb.com/jokes/random/5?exclude=[${value}]`)
            .pipe(debounceTime(1000), catchError((err)=>`An errror occured ${err}`))
            .subscribe((res)=>jokes$.next(res.value),(e)=>console.log(e))
        },
        onSelectJoke:(joke)=>selectedJoke$.next(joke)
})(AppRxjs4);

