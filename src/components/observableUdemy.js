import React, {Component} from 'react';
import {
    Observable,
    Observer,
    interval,
    Subject,
    of,
    from,
    BehaviorSubject,
    throwError,
    concat,
    EMPTY,
    NEVER,
    fromEvent
} from 'rxjs';//It converts static deta into Observables
import {map, filter, scan, throttleTime, debounceTime, distinctUntilChanged, reduce, pluck, mergeMap, switchMap, take, tap} from 'rxjs/operators';//


class ObservableUdemy extends Component {
    constructor(){
        super()
        this.state={

        }
    }
    myObservables=()=>{
      const data$=of(1,2,3).pipe(tap(v=>console.log('tap',v)));
      const empty$=EMPTY;
      const never$=NEVER;

      data$.subscribe((v)=>{console.log(v)}, (e)=>{console.log(e)}, ()=>{console.log('completed')});
      empty$.subscribe((v)=>{console.log(v)}, (e)=>{console.log(e)}, ()=>{console.log('completed')});
      never$.subscribe((v)=>{console.log(v)}, (e)=>{console.log(e)}, ()=>{console.log('completed')});

      data$.forEach(value => console.log(value)).then(()=>console.log('completed with forEach'))
    };
    render() {

        return (
            <div>
                <button onClick={this.myObservables}>Click</button>
            </div>
        );
    }
}

export default ObservableUdemy;