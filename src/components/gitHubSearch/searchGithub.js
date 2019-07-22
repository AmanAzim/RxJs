import React,{useState} from 'react';
import {Observable, timer} from 'rxjs';//It converts static deta into Observables
import {debounceTime, distinctUntilChanged, mergeMap, tap, filter, switchMap, catchError} from 'rxjs/operators';//
import {ajax} from 'rxjs/ajax'

import GithubProfiles from './gitHubProfiles'

const SearchGithub = () => {

    const [githubData, setGithubData]=useState([]);
    const [jokes, setJokes]=useState([]);

    const onSearch=(event)=>{
        let ajaxReq=Observable.create(observer=>{
            observer.next(event.target.value)
        }).pipe(
            debounceTime(5000),
            distinctUntilChanged(),
            tap(()=>setGithubData([])),
            filter(user=>!!user),
            mergeMap(user=>ajax.getJSON(`https://api.github.com/search/users?q=${user}`))
        )
        ajaxReq.subscribe((res)=>{console.log(res); setGithubData(res.items)}, (err)=>console.log(err), ()=>console.log('complete'))
    };

    const pullJokes=()=>{
        const url='http://api.icndb.com/jokes/random/5';
        timer(0, 5000).pipe(switchMap(()=>{
            return ajax.getJSON(url).pipe(catchError((err)=>`An errror occured ${err}`))
        })).subscribe((res)=>{console.log(res.value); setJokes(res.value)}, (err)=>console.log(err), ()=>console.log('complete'))
    };


    return (

        <div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="">Search Hithub profiles by user name:</span>
                </div>
                <input type="text" onChange={onSearch}/>
            </div>

            <div className="container">
                <div className="row">
                    {githubData.map(userData=><GithubProfiles key={userData.id} userData={userData}/>)}
                </div>
            </div>
            <div>
                <button className="btn btn-primary" onClick={pullJokes}>Pull Chucknoris Jokes</button>
                <ul>
                    {jokes.map(value=><li key={value.id}>{value.joke}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default SearchGithub;