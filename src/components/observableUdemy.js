import React, {Component} from 'react';
import {of, EMPTY, NEVER, timer, from, interval, Observable, Subject} from 'rxjs';//It converts static deta into Observables
import {map, filter, scan, throttleTime, debounceTime, distinctUntilChanged, reduce, pluck, mergeMap, switchMap, take, tap} from 'rxjs/operators';//


class ObservableUdemy extends Component {
    constructor(){
        super()
        this.state={
            timer:0
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
    useTimer=()=>{
        //const numbers = timer(3000, 1000);
        //numbers.subscribe(x => console.log(x));

        const startTime=new Date();
        startTime.getSeconds(startTime.getSeconds()+5);
        timer(startTime, 1000).subscribe(v=>console.log(v));
    };
    useFrom_Promise=()=>{
        const p=new Promise(resolve => setTimeout(()=>{resolve('Aman')},1000));
        from(p).subscribe(v=>console.log(v))
    };
    useInterval_clock=()=>{
        const timer=interval(1000).pipe(map(()=>new Date().toLocaleTimeString()));
        timer.subscribe((t)=>this.setState({timer:t}))
    };
    useObservable_clock=()=>{
        const obs=Observable.create(observer=>{
            const interval=setInterval(()=>{
                observer.next(new Date().toLocaleTimeString())
            },1000);

            return ()=>clearInterval(interval)
        })
        const subscription=obs.subscribe((t)=>{console.log(t)})
        setTimeout(()=>{
            subscription.unsubscribe()
        },5000)
    };
    coldObservable=()=>{
        Observable.create(ovserver=>{
            let count=0;
            const dandle=setInterval(()=>{
                count++
                console.log('Cold',count)
                ovserver.next(count)
            },500)
        })//.subscribe((t)=>{console.log(t)})
    };
    hotObservable=()=>{
        const sub=new Subject()
        let count=0;
        const dandle=setInterval(()=>{
            count++
             console.log('Hot',count)
            sub.next(count)
        },500)
        //sub.subscribe((t)=>{console.log(t)})
    };

    render() {
        //this.useTimer();
        //this.useFrom_Promise();
        //this.useInterval_clock()
        //this.useObservable_clock()

        return (
            <div>
                <button onClick={this.myObservables}>Click</button>
                <p>Clock made with Interval:{this.state.timer}</p>
                <hr/>
                <button onClick={this.coldObservable}>start Cold observable</button>
                <button onClick={this.hotObservable}>start Hot observable</button>
            </div>
        );
    }
}

export default ObservableUdemy;