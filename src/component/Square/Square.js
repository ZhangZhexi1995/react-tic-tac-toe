import React from 'react'
import './Square.css'

// function Square() {
//     return (
//         <button className="square">
//             {/*{this.props.value}*/}
//         </button>
//     );
// }

class Square extends React.Component{
    render(){
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;