import React, {Component} from 'react';
import {Observable} from 'rxjs'

class CallbackPromiseRxJsAwait extends Component {

    constructor(){
        super()
        this.state={
            name:''
        };
    }

    setText=(val)=>this.setState({name:val});
////////////////////////////////////////////Using CallBacks/////////////////////////////////////////////////////////////
    onClickHandler_callBack=()=>{
        this.setText('starting...')

        this.checkAuth_callBack((auth)=>{
            if(auth){
                this.fetchUser_callBack((user)=>{this.setText(user)})
            }
        });
    };
    checkAuth_callBack=(fn)=>{
        this.setText('checking auth...')

        setTimeout(()=>{
            fn(true);
        }, 1000)
    };
    fetchUser_callBack=(fn)=>{
        this.setText('fetching user...')

        setTimeout(()=>{
            fn('Aman');
        }, 1000)
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////Using Promise///////////////////////////////////////////////////////////////
    onClickHandler_promise=()=>{
        this.setText('starting...')

        this.checkAuth_promise().then(val=>{
            if(val){
                this.fetchUser_promise().then(value => this.setText(value));// it will also return a promise which we will catch again using "then"
            }
        }) //to catch returned promise from this.fetchUser_promise()

        /* //2nd way of channing "then()"
        this.checkAuth_promise().then(val=>{
            if(val){
               return this.fetchUser_promise();// it will also return a promise which we will catch again using "then"
            }
        }).then(value => this.setText(value)); //to catch returned promise from this.fetchUser_promise()
        */
    };
    checkAuth_promise=()=>{
        this.setText('checking auth...')

        return new Promise(resolve => {
            setTimeout(()=>{
                resolve(true); //after 1 second it will return a "true" inside a "then"
            }, 1000)
        })
    };
    fetchUser_promise=(fn)=>{
        this.setText('fetching user...')

        return new Promise(resolve => {
            setTimeout(()=>{
                resolve('Aman'); //after 1 second it will return "Aman" inside a "then"
            }, 1000)
        })
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////Async Await///////////////////////////////////////////////////////////////////////
    onClickHandler_await=async()=>{
        this.setText('starting...')

        const auth=await this.checkAuth_await();
        if(auth){
            const user=await this.fetchUser_awaite();
            this.setText(user);
        }
    };
    checkAuth_await=()=>{
        this.setText('checking auth...')

        return new Promise(resolve => {
            setTimeout(()=>{
                resolve(true); //after 1 second it will return a "true" inside a "then"
            }, 1000)
        })
    };
    fetchUser_awaite=(fn)=>{
        this.setText('fetching user...')

        return new Promise(resolve => {
            setTimeout(()=>{
                resolve('Aman'); //after 1 second it will return "Aman" inside a "then"
            }, 1000)
        })
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////Using RxJs///////////////////////////////////////////////////////////////////////
    onClickHandler_rxjs=()=>{
        this.setText('starting...')

        this.checkAuth_rxjs().subscribe((value)=>{
            if(value){
                this.fetchUser_rxjs().subscribe(val=>this.setText(val))
            }
        })

    };
    checkAuth_rxjs=()=>{
        this.setText('checking auth...')

        return Observable.create(observer=>{
            setTimeout(()=>{
                observer.next(true);
            }, 1000);
        });
    };
    fetchUser_rxjs=()=>{
        this.setText('fetching user...')

        return Observable.create(observer=>{
            setTimeout(()=>{
                observer.next('Aman');
            }, 1000);
        });
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return (
            <div>
                <button onClick={this.onClickHandler_callBack}>Fetch User with => CallBacks</button><br/>
                <button onClick={this.onClickHandler_promise}>Fetch User with => Promise</button><br/>
                <button onClick={this.onClickHandler_await}>Fetch User with => Async Await</button><br/>
                <button onClick={this.onClickHandler_rxjs}>Fetch User with => RxJs</button><br/>
                <p>User name: {this.state.name}</p>
            </div>
        );
    }
}

export default CallbackPromiseRxJsAwait;