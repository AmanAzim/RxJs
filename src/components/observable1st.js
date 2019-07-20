import React, {Component} from 'react';
import {Observable, Observer, interval, Subject, of, from, BehaviorSubject, throwError, concat} from 'rxjs';//It converts static deta into Observables
import {map, filter, scan, throttleTime, debounceTime, distinctUntilChanged, reduce, pluck, mergeMap, switchMap, take} from 'rxjs/operators';//

class Observable1St extends Component {

    constructor(props){
        super(props);

        this.subject1=new Subject();// so that we can use debounceTime
        this.subject2=new Subject();
        this.subject3=new Subject();



        this.state={
            firstName:'',
            lastName:'',
            fullname:'',
            clicked:'',
        }
        this.behavSub=new BehaviorSubject('Not clicked');// setting a initial value with Objervable
        this.behavSub.subscribe((val)=>this.state.clicked=val);
    }

    my1stObservable=()=>{
        let myObservable=Observable.create((observer)=>{
            observer.next('i am observer next()');

            setTimeout(()=>{
               observer.complete();
            },2000);

            observer.next('i am 2nd observer next()');

            //observer.error('i am an error()');

        });
        myObservable.subscribe(
            (value)=>{console.log('next():',value)},
            (error)=>{console.log('error():',error)},
            ()=>{console.log('complete()')},//cannot take argument
        )
    };
    myIntervalObservable=()=>{
        //let observable=Observable.interval(1000);//it will give a assending number of integer every 1 seconds
        let observable=interval(1000);
        observable.pipe(map(val=>val*2),throttleTime(2000)).subscribe((value)=>{console.log(value)});
    };
    mySubject=()=>{
        let subject=new Subject();

        subject.subscribe(
            (value)=>{console.log('next():',value)},
            (error)=>{console.log('error():',error)},
            ()=>{console.log('complete()')} );//cannot take argument

        subject.subscribe((value)=>{console.log('next():',value)}); //more than one subscription possible

        //Now manually emit a event using subject
        subject.next('a subject demo with next()');
        subject.error('a subject demo with error()');
        subject.complete();
        subject.next('after complete'); //it will not work as it has already called complete()
    };
    myFilter=()=>{
        let observable=interval(500);
        let subscription=observable.pipe(map(val=>val*2),filter(val=>val%2===0)).subscribe((value)=>{console.log(value)});
        setTimeout(()=>{
            subscription.unsubscribe()// stop the subscription after 5 seconds
        },5000)
    };
    useTake=()=>{
        let observable=interval(500);
        observable.pipe(filter(val=>val%2===0),take(3)).subscribe((value)=>{console.log(value)});
    }
    onInputDebounceTime=(event)=>{
        //let subject=new Subject();// It need to be creatred inside the constructor like this.subject=new Subject// or else on each new key strock a new Subject instance will be created
        this.subject1.next(event.target.value);
        this.subject1.pipe(debounceTime(2000)).subscribe( //the "debounceTime(milisoconds)" will only emit the event after a certain time so that the activity inside "next()" such sending an http request don't happen on each key strock.
            (value)=>{console.log('with debounceTime() next():',value)},
            (error)=>{console.log('with debounceTime() error():',error)},
            ()=>{console.log('complete()')},//cannot take argument
        )
    };
    onInputDebounceTime_distinctUntilChanged=(event)=>{
        //let subject=new Subject();// It need to be creatred inside the constructor like this.subject=new Subject// or else on each new key strock a new Subject instance will be created
        this.subject2.next(event.target.value);
        this.subject2.pipe(debounceTime(2000), distinctUntilChanged()).subscribe( //the "debounceTime(milisoconds)" will only emit the event after a certain time so that the activity inside "next()" such sending an http request don't happen on each key strock.
            (value)=>{console.log('with debounceTime()+distinctUntilChanged() next():',value)},
            (error)=>{console.log('with debounceTime() error():',error)},
            ()=>{console.log('complete()')},//cannot take argument
        );

        const source = of(1, 1, 2, 2, 3, 3);
        //let source=from([event]);
        source.pipe(distinctUntilChanged()).subscribe((value => console.log(value)))
    };
    useReduce=()=>{
        var observable=of(1, 2, 3, 4);
        observable.pipe(reduce((total, current)=>{return total+current},0)).subscribe((val)=>{console.log(val)})
    };
    useScan=()=>{
        var observable=of(1, 2, 3, 4);
        observable.pipe(scan((total, current)=>{return total+current},0)).subscribe((val)=>{console.log(val)})
    };
    usePluck=(event)=>{
       this.subject3.next(event);
       this.subject3.pipe(pluck('target', 'value'),debounceTime(2000), distinctUntilChanged()).subscribe((value => console.log(value)))
    };
    useMergeMap=(event)=>{
        if(event.target.name==='fn'){
            this.setState({firstName:event.target.value}, ()=>{
                this.subject1.next(this.state.firstName);
            });
        }
        if(event.target.name==='ln'){
            this.setState({lastName:event.target.value}, ()=>{
                this.subject2.next(this.state.lastName);
            });
        }

        this.subject1.pipe(mergeMap(value1=>{
            return this.subject2.pipe(map(value2=>value1+' '+value2))
        })).subscribe((fullname)=>{this.setState({fullname:fullname})});
    };
    useSwitchMap=()=> {
        this.subject1.next('click');
        let obs2 = interval(1000);

        //Problem
        /* this.subject1.subscribe((val)=>{
              return obs2.subscribe((val)=>console.log(val))
          });*/

        //solution with switchMap()
        this.subject1.pipe(switchMap(value => {
            return obs2
        })).subscribe((val) => console.log(val));
    };
    myBehaviorSubject=()=>{
        //this.behavSub.subscribe((val)=>console.log(val))
        this.behavSub.next('Clicked');
        this.behavSub.subscribe((val)=>this.setState({clicked:val}));
    };
    useThrowError=()=>{
        const result = throwError(new Error('oops!'));
        result.subscribe(x => console.log(x), e => console.error(e));
    };
    useConcat=()=>{
        const result = concat(of(1,2,3), throwError(new Error('oops!')));
        result.subscribe(x => console.log(x), e => console.error(e));
    }

    render() {
        //this.my1stObservable();
        //this.myIntervalObservable();
        //this.mySubject();
        //this.myFilter();
        //this.useTake()
        //this.onInputDebounceTime();
        //this.useReduce();
        //this.useScan();
        //this.useThrowError()
        //this.useConcat()
        return (
            <div>
                <p>With debounceTime()</p>
                <input type="text" onChange={(e)=>this.onInputDebounceTime(e)}/><br/>
                <p>With debounceTime()+distinctUntilChanged()</p>
                <input type="text" onChange={(e)=>this.onInputDebounceTime_distinctUntilChanged(e)}/>
                <p>With debounceTime()+distinctUntilChanged()+pluck()</p>
                <input type="text" onChange={this.usePluck}/>
                <hr/>
                <p>Write Full name:</p>
                <input type="text" name="fn" onChange={this.useMergeMap}/>
                <input type="text" name="ln" onChange={this.useMergeMap}/>
                <p>Fullname:{this.state.fullname}</p>
                <button onClick={this.useSwitchMap}>Click to start useSwitchMap</button>
                <hr/>
                <button onClick={this.myBehaviorSubject}>Click to see BehaviorSubject</button>
                <p>myBehaviorSubject: {this.state.clicked}</p>
            </div>
        );
    }
}

export default Observable1St;