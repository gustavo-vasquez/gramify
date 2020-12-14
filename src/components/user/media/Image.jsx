import React from 'react';

class Image extends React.Component {
    render() {
        return (
            <figure className="mx-auto">
                <img className="view-content-image" src={this.props.path} alt="image_content" />
            </figure>
        );
    }
}

export default Image;