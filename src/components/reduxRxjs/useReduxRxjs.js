import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Action} from 'redux'

class UseReduxRxjs extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <button className="btn btn-primary" onClick={this.props.onIncrement}>Increment</button>
                    <button className="btn btn-primary" onClick={this.props.onAdd5}>Add 5</button>
                    <button className="btn btn-primary" onClick={this.props.onDecrement}>Decrement</button>
                </div>
                <p>Counter:{this.props.ctr}</p>
            </div>
        );
    }
}

const MapStateToProps=(state)=>{
    return {
        ctr: state.counter
    }
};
const MapDispatchToProps=(dispatch)=>{
    return {
        onIncrement:()=>dispatch({type:'INCREMENT'}),
        onDecrement:()=>dispatch({type:'DECREMENT'}),
        onAdd5:()=>dispatch({type:'ADD5', payload:5})
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(UseReduxRxjs);