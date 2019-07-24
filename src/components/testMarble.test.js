import { TestScheduler } from 'rxjs/testing';
import {map,} from 'rxjs/operators';//
import { } from 'rxjs-marbles';

const testScheduler = new TestScheduler((actual, expected) => {
          // asserting the two objects are equal
          // e.g. using chai.
            expect(actual).deep.equal(expected);
    });

it('Simple test RxJS with rsjs-marbles', ()=>{

    testScheduler.run((helpers)=>{
        const { cold, hot, expectObservable, expectSubscriptions, flush } = helpers;

        const source$=cold('--a--b--c|', {a:5, b:10, c:15});// input test values
        const expected$=cold('--a--b--c|', {a:10, b:20, c:30});//expected results


        //const result$=source$.pipe(map(x=>x*2));//appling the operator to be tested on the test input values
        //expect(result$).toBeObservable(expected$)

        expectObservable(source$.pipe(map(x=>x*2))).toBe(expected$);
        //expectSubscriptions(source$.subscriptions).toBe(subs);

    });

});