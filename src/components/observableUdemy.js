import React, {Component, createRef} from 'react';
import {of, EMPTY, NEVER, timer, from, interval, Observable, Subject, fromEvent, range} from 'rxjs';//It converts static deta into Observables
import {
    map,
    filter,
    scan,
    throttleTime,
    debounceTime,
    distinctUntilChanged,
    reduce,
    pluck,
    mergeMap,
    switchMap,
    take,
    tap,
    takeLast,
    takeWhile,
    takeUntil,
    pairwise,
    concatMap,
    startWith
} from 'rxjs/operators';//


class ObservableUdemy extends Component {
    constructor(){
        super()
        this.tapBtn=React.createRef();
        this.stopBtn=React.createRef();
        this.mouseSub=new Subject()
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
    useTap=(e)=>{
        console.log(this.tapBtn);
        let taper=timer(2000,500).pipe(tap(console.log),tap(()=>this.tapBtn.current.disabled=false)).subscribe(v=>console.log('tap:',v))
        console.log(e);

        setTimeout(()=>{
            taper.unsubscribe();
            this.tapBtn.current.disabled=true;
        },6000)
    };
    useTakeLast=()=>{
        interval(500).pipe(take(10),takeLast(5)).subscribe((v)=>console.log(v), null, ()=>console.log('completed'))
    };
    useTakeWhile=()=>{
         interval(500).pipe(takeWhile((v)=>v<5)).subscribe((v)=>console.log(v), null, ()=>console.log('completed'))
    };
    useTakeUniti=()=>{
        let tm$=timer(3000).pipe(map(event=>event.type))
            tm$.subscribe((v)=>console.log(v))
        let int=interval(500).pipe(takeUntil(tm$)).subscribe((v)=>console.log(v), null, ()=>console.log('takeUntil completed'));
    };
    useFromEvent=()=>{
        let fm$=fromEvent(this.stopBtn.current, 'click')
        let int=interval(500).pipe(takeUntil(fm$)).subscribe((v)=>console.log(v), null, ()=>console.log('takeUntil completed'));
    };
    useRange=()=>{
        let r=range(1, 10, )
        r.pipe(scan((prev,curr)=>prev+curr, 0)).subscribe(v=>console.log('with Scan',v))
        r.pipe(reduce((prev,curr)=>prev+curr, 0)).subscribe(v=>console.log('with Reduce',v))
    };
    usePairWise=(e)=>{
        //console.log(e.clientX, e.clientY)
        this.mouseSub.next(e);
        this.mouseSub.pipe(pairwise(),map(pair =>{return [{cliX:pair[0].clientX, cliY:pair[0].clientY}, {cliX:pair[1].clientX, cliY:pair[1].clientY}]})).subscribe((arr)=>console.log(`coordinate sets: firstXY(${arr[0].cliX},${arr[0].cliY})-secondXY(${arr[1].cliX},${arr[1].cliY})`))
    };
    useConcatMap=()=>{
        let obs1=interval(1000).pipe(take(5))
        let obs2=interval(100).pipe(take(5));
        obs1.pipe(concatMap(val1=>{
            return obs2.pipe(map(val2=>({val1:val1,val2:val2})))
        })).subscribe(v=>console.log(v))
    };
    useSwitchMap=()=>{
        let obs1=interval(100).pipe(take(10))
        let obs2=interval(100).pipe(take(5))
        obs1.pipe(switchMap(val1=>{
            return obs2.pipe(map(val2=>({val1:val1,val2:val2})))
        })).subscribe(v=>console.log(v),null,()=>console.log('first obs completed'))
    };
    useStartWith=()=>{
        interval(100).pipe(startWith('starting with startWith'), take(5)).subscribe((v)=>console.log(v))
    };

    render() {
        //this.useTimer();
        //this.useFrom_Promise();
        //this.useInterval_clock()
        //this.useObservable_clock()
        //this.useTap();
        //this.useTakeLast();
        //this.useTakeWhile();
        //this.useTakeUniti();
        //this.useRange();
        //this.useConcatMap()
        //this.useSwitchMap()
        //this.useStartWith()

        return (
            <div>
                <button onClick={this.myObservables}>Click</button>
                <p>Clock made with Interval:{this.state.timer}</p>
                <hr/>
                <button onClick={this.coldObservable}>start Cold observable</button>
                <button onClick={this.hotObservable}>start Hot observable</button>
                <button onClick={(e)=>this.useTap(e)} ref={this.tapBtn} >Tap</button>
                <button ref={this.stopBtn} onClick={this.useFromEvent}>FromEvent</button>
                <div style={{width: 200, height: 100, backgroundColor:'green'}} onMouseMove={this.usePairWise}>Mouse move capture</div>
            </div>
        );
    }
}

export default ObservableUdemy;