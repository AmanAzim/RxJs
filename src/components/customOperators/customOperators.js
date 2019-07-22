import {Observable, defer, pipe} from 'rxjs'
import {map, filter, } from 'rxjs/operators'
import * as ld from 'lodash'


 /*  //will not work
export default ()=>source=>Observable.create(observer=>{
    source.subscribe(
        (number)=>{
            if(number%2===0){
                observer.next(number)
            }
        },
        (err)=>observer.error(err),
        ()=>observer.complete()
    );
}) */


//filter Even numbers
export const filterEvenNum=()=>(source)=>Observable.create(observer=>{
    return source.subscribe({
            next(v){
                if(v%2===0){
                    observer.next(v);
                }
            }, //the main value will come from Source observable and will be returned by the next() of this new observerable
            error(e) {observer.error(e);},
            complete(){observer.complete()}
    })
});



//filter Even numbers// this function is returning the source observable (where it is set as custom operator) by creating a new Observable and subscribing to the source observable inside it
export const powerOf=(power)=>source=>Observable.create(observer=>{
    return source.subscribe({
            next(v){
                observer.next(Math.pow(v, power));
            }, //the main value will come from Source observable and will be returned by the next() of this new observerable
            error(e) {observer.error(e);},
            complete(){observer.complete();}
    })
});



//multiply values by a given number
export const multiplyBy=(multiplyBy)=>map(value => value*multiplyBy);



//filter objects properties with number values
export const filterObjWithNum=()=>map(val=>ld.pickBy(val, ld.isNumber)); //pick() takes a object value and a function to run on it which is "isNumber" here that checks whether the given object has number as any value property

//filters only the numbers from the given value
export const filterNumbers=()=>filter(value=>ld.isNumber(value));


//advanced// to see the History of all the emitted value
export const obsHistory=()=>{
    return (source)=>defer(()=>{
        let state='History';
        return source.pipe(map(value => state=state+'--'+value)) //we are not using subscription bcz we don't want to customize the emitted values. we just want to see them
    })
}

