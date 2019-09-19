import React from 'react';  
import PropTypes from 'prop-types';

class SelectBox extends React.Component {
    static propTypes = {
        options: PropTypes.array.isRequired,
        classes: PropTypes.string,
        handleOnChange: PropTypes.func.isRequired
    };

    state = {
        selected: 'newest'
    }

    createOptions = options =>
    options.map(o => (
      <option value={o.value} key={o.value}>
        {o.label}
      </option>
    ));

    OnChange = e => {
        this.props.handleOnChange(e.target.value);
    }
    
    render(){
        const { classes, options } = this.props;

        return(
           
                <select onChange={e => this.OnChange(e)} className={classes}>
                    {this.createOptions(options)}
                </select>
            
        )
        
    }
}

export default SelectBox;