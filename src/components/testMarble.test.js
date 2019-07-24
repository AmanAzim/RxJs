import { TestScheduler } from 'rxjs/testing';
import {map,} from 'rxjs/operators';//
import { marbles } from "rxjs-marbles/mocha";

//https://www.npmjs.com/package/rxjs-marbles
//https://itnext.io/findings-about-rxjs-marble-testing-and-the-testscheduler-b23c6bdf6b49

it('Simple test RxJS with rsjs-marbles', marbles((helpers)=>{

        const source$=helpers.cold('--a--b--c|', {a:5, b:10, c:15});// input test values
        const expected$=helpers.cold('--a--b--c|', {a:10, b:20, c:30});//expected results


        const result$=source$.pipe(map(x=>x*2));//appling the operator to be tested on the test input values
        helpers.expect(result$).toBeObservable(expected$)
}));