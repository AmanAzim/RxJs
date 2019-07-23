import React,{Component} from 'react';


const withObservableStream2=(observable, triggers, initialState)=>(WrappedComponent)=>{
    return class extends Component {
        constructor(props){
            super(props)
            this.state={
                ...initialState
            }
        }
        componentDidMount(){
            this.subscription=observable.subscribe((newStateValue)=>{ //new values will come from the wrappedComponents input field as we are using the function onChangeQuery:()=>observable.next() to collect the onChange input events. the onChhangeQuery() is passed as a property of Object called "triggers"
                this.setState({...newStateValue})
            });
        }
        componentWillUnmount(){
            this.subscription.unsubscribe();
        }

        render(){
            return (
                <WrappedComponent {...this.props} {...this.state} {...triggers}/>
            )
        }
    }
};

export default withObservableStream2;