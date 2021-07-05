import React from "react";


class Input extends React.Component {
    render() {
        const { type, handleChange} = this.props;
        return (
            <input type={type} onChange={handleChange}/>
        )
    }
}

export default Input