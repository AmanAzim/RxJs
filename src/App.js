import React, {Component, useRef} from 'react';
import axios from 'axios';
import Observable1St from './components/observable1st'
import CallbackPromiseRxJsAwait from './components/callbackPromiseRxJsAwait'
import ObservableUdemy from './components/observableUdemy'
import SearchGitHub from './components/gitHubSearch/searchGithub'

import AppRxjs1 from './components/rxjsManageState/appRxjs1'
import AppRxjs2 from './components/rxjsManageState/appRxjs2'
import AppRxjs3 from './components/rxjsManageState/appRxjs3'
import AppRxjs4 from './components/rxjsManageState/appRxjs4'

import {ajax} from 'rxjs/ajax'
import {from, fromEvent, Observable} from 'rxjs';//It converts static deta into Observables
import {map, filter, scan, switchMap} from 'rxjs/operators';//

//http://reactivex.io/documentation/operators.html#tree//To find the right Operator

class App extends Component {

  constructor(){
      super()
      this.ajaxBtn=React.createRef()

      this.state={
          numbers:[1,2,3,4,5,6,7,8,9,10],
          result:'',
          joke:''
      };
  }

  clearResult=()=>{
    this.setState({result:''});
  };
  filterArray=()=>{
    //const result=this.state.numbers.map(number=>({x:number})).filter(obj=>obj.x<7);
      let result=[];
      from(this.state.numbers).pipe(map(number=>({x:number})),filter(obj=>obj.x<7),scan((prev, current)=>prev.concat(current), [])).subscribe(number=>result=number);//The "form()" will change the static array into Observables. The "pipe()" is used to manipulate the result before it goes to "subscription"
      this.setState({result:JSON.stringify(result)});
  };
  interval=()=>{
    let number=0;
    const numbersArray=[];
    const myInterval=setInterval(()=>{
        if(number<7){
          const obj={x:number}
          numbersArray.push(obj);
          number++;
        }else {
          clearInterval(myInterval);
        }
        this.setState({result:JSON.stringify(numbersArray)});
    },1000);
  };
  ajaxRequest=(event)=>{
     /*
      axios.get('http://api.icndb.com/jokes/random/').then(res=>{
          return {x:res.data.value.joke.length}
      }).then(jokeLenObj=>{
           if(jokeLenObj.x<75){
               this.setState({result:JSON.stringify(jokeLenObj)});
           }
      }).catch(err=>console.log(err))
     */
     ajax.getJSON('http://api.icndb.com/jokes/random/').pipe(map(res=>({x:res.value.joke.length})),filter(obj=>obj.x<80),scan((prev, curr)=>prev.concat(curr),[])).subscribe((result)=>this.setState({result:JSON.stringify(result)}) );

     const url='http://api.icndb.com/jokes/random/';
     ajax({url}).subscribe(res => this.setState({joke:res.response.value.joke}))
  };
  btn_fromEvent=()=>{
      fromEvent(this.ajaxBtn.current, 'click').pipe(map(event=>event.type)).subscribe((v)=>console.log('ajaxBtn event:',v))
  };

  render() {

    return (
        <div>
           <button onClick={this.clearResult}>Clear</button>
           <button onClick={this.filterArray}>Filter Array</button>
           <button onClick={this.interval}>Interval print</button>
           <button onClick={this.ajaxRequest}>Ajax Request</button>
           <button ref={this.ajaxBtn} onClick={this.btn_fromEvent}>fromEvent test</button>
           <hr/>
           <p>Result:{this.state.result}</p><br/>
           <p>Joke: {this.state.joke}</p>
           <Observable1St />
           <hr/>
           <CallbackPromiseRxJsAwait />
           <hr/>
           <ObservableUdemy />
           <hr/>
           <SearchGitHub/>
           <hr/>
           <AppRxjs1/>
           <hr/>
           <AppRxjs2/>
           <hr/>
           <AppRxjs3/>
           <hr/>
           <AppRxjs4/>
        </div>
    );
  }
}

export default App;
