import React from 'react';

class Image extends React.Component {
    render() {
        return (
            <img className="view-content-image mt-0 mt-md-auto" src={this.props.path} alt={this.props.alt} />
        );
    }
}

export default Image;