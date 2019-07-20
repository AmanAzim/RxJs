import React, {Component} from 'react';
import {Observable, Observer, interval, Subject} from 'rxjs';//It converts static deta into Observables
import {map, filter, scan, throttleTime, debounceTime, distinctUntilChanged} from 'rxjs/operators';//

class Observable1St extends Component {

    constructor(props){
        super(props);
        this.subject1=new Subject();// so that we can use debounceTime
        this.subject2=new Subject();
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
        observable.pipe(map(val=>val*2),filter(val=>val%2===0)).subscribe((value)=>{console.log(value)});
    };
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
        )
    };

    render() {
        //this.my1stObservable();
        //this.myIntervalObservable();
        //this.mySubject();
        //this.myFilter();
        //this.onInputDebounceTime();
        return (
            <div>
                <p>With debounceTime()</p>
                <input type="text" onChange={(e)=>this.onInputDebounceTime(e)}/><br/>
                <p>With debounceTime()+distinctUntilChanged()</p>
                <input type="text" onChange={(e)=>this.onInputDebounceTime_distinctUntilChanged(e)}/>
            </div>
        );
    }
}

export default Observable1St;