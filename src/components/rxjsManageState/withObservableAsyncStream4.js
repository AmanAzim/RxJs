import React,{Component} from 'react';


const withObservableAsyncStream4=(combinedObservables, triggers)=>(WrappedComponent)=>{
    return class extends Component {

        componentDidMount(){
            this.subscription=combinedObservables.subscribe((newStateValues)=>{ //new values will come from the wrappedComponents input field as we are using the function onChangeQuery:()=>observable.next() to collect the onChange input events. the onChhangeQuery() is passed as a property of Object called "triggers"
                this.setState({...newStateValues})
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

export default withObservableAsyncStream4;