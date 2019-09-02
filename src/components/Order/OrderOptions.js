import React, {Component} from 'react';


class OrderOption extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    

    render(){
        return(
            <div>

                {this.props.optionAdded}

            </div>
        )
    }
}

export default OrderOption;