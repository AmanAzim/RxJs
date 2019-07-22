import React,{Component} from 'react';


const withObservableStream1=(observable, triggers)=>(WrappedComponent)=>{
    return class extends Component {

        componentDidMount(){
            this.subscription=observable.subscribe((newStatreValue)=>{ //new values will come from the wrappedComponents input field as we are using the function onChangeQuery:()=>observable.next() to collect the onChange input events. the onChhangeQuery() is passed as a property of Object called "triggers"
                this.setState({...newStatreValue})
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

export default withObservableStream1;