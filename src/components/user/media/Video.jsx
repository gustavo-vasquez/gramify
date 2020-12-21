import React from 'react';

class Video extends React.Component {
    render() {
        return (
            <video className="view-content-media" controls>
                <source src={this.props.path} type="video/mp4"/>
            </video>
        )
    }
}

export default Video;