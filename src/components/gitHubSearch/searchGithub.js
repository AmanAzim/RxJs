import React,{useState} from 'react';
import {Observable} from 'rxjs';//It converts static deta into Observables
import {debounceTime, distinctUntilChanged, mergeMap, tap} from 'rxjs/operators';//
import {ajax} from 'rxjs/ajax'

import GithubProfiles from './gitHubProfiles'

const SearchGithub = () => {

    const [githubData, setGithubData]=useState([])

    const onSearch=(event)=>{
        let ajaxReq=Observable.create(observer=>{
            observer.next(event.target.value)
        }).pipe(
            debounceTime(5000),
            distinctUntilChanged(),
            tap(()=>setGithubData([])),
            mergeMap(user=>ajax.getJSON(`https://api.github.com/search/users?q=${user}`))
        )
        ajaxReq.subscribe((res)=>{console.log(res); setGithubData(res.items)}, (err)=>console.log(err), ()=>console.log('complete'))
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
        </div>
    );
};

export default SearchGithub;