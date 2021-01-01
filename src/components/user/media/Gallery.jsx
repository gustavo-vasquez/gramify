import React from 'react';

class Gallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0
        }
    }

    switchToImage = (index) => {
        this.setState({ currentIndex: index });
    }

    slideTo = (direction) => {
        switch(direction) {
            case "left":
                if(this.state.currentIndex > 0)
                    this.setState((prevState) => ({ currentIndex: prevState.currentIndex - 1 }));
                else
                    this.setState({ currentIndex: this.props.images.length - 1 });
                break;
            case "right":
                if(this.state.currentIndex < this.props.images.length)
                    this.setState((prevState) => ({ currentIndex: prevState.currentIndex + 1 }));
                else
                    this.setState({ currentIndex: 0 });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <React.Fragment>
                <img className="view-content-media mt-0 mt-md-auto" src={this.props.images[this.state.currentIndex].node.display_url} alt={this.props.images[this.state.currentIndex].node.accessibility_caption} />
                { this.state.currentIndex !== 0 && 
                <div className="gallery-arrow left">
                    <button className="btn" onClick={() => this.slideTo("left")} title="Anterior">&lsaquo;</button>
                </div> }
                { this.state.currentIndex !== (this.props.images.length - 1) &&
                <div className="gallery-arrow right">
                    <button className="btn" onClick={() => this.slideTo("right")} title="Siguiente">&rsaquo;</button>
                </div> }
                <div className="gallery-switch-buttons">
                { this.props.images && this.props.images.map((image, index) =>
                    <button className={this.state.currentIndex === index ? "btn active" : "btn"} onClick={() => this.switchToImage(index)} key={index}>&bull;</button>
                )}
                </div>
            </React.Fragment>
        )
    }
}

export default Gallery;