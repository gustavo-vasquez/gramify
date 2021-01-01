import React from 'react';
import { Link } from 'react-router-dom';

import { mediaTypes, getMediaData, formatDate } from '../helpers';
import { Spinner } from '../shared/Spinner';

class Extract extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null
        }
    }

    componentDidMount() {
        document.title = "Descarga de contenido por enlace • Instractaram";
        this.extractByMediaLink();
    }

    extractByMediaLink = async () => {
        const data = await getMediaData(this.props.shortcode);
        this.setState({ content: data });
    }

    manageContent = (mediaType) => {
        switch(mediaType) {
            case mediaTypes.IMAGE.name:
                return (
                    <div className="col-12 col-md-6">
                        <img className="rounded mw-100" src={this.state.content.display_url} alt={this.state.content.accessibility_caption} />
                        <div>
                            <button className="btn btn-default my-3"><i className="la la-download la-lg"></i> Descargar</button>
                        </div>
                    </div>
                );
            case mediaTypes.GALLERY.name:
                return (
                    this.state.content.edge_sidecar_to_children.edges.map((image, index) =>
                    <div className="col-12 col-md-6" key={index}>
                        <img className="rounded mw-100" src={image.node.display_url} alt={image.node.accessibility_caption} />
                        <div>
                            <button className="btn btn-default my-3"><i className="la la-download la-lg"></i> Descargar</button>
                        </div>
                    </div>)
                );
            case mediaTypes.VIDEO.name:
                return (
                    <div className="col-12 col-md-6">
                        <video className="mw-100" controls>
                            <source src={this.state.content.video_url} type="video/mp4"/>
                        </video>
                        <div>
                            <button className="btn btn-default my-3"><i className="la la-download la-lg"></i> Descargar</button>
                        </div>
                    </div>
                );
            default:
                return alert("No se puede mostrar el contenido en este momento.");
        }
    }

    render() {
        return (
            !this.state.content ?
            <Spinner></Spinner> :
            <div className="text-center">
            <p>{ formatDate(this.state.content.taken_at_timestamp) }</p>
            <p>Contenido publicado por <Link to={`/profile/${this.state.content.owner.username}`}>@{this.state.content.owner.username}</Link></p>
                <div className="row justify-content-center">
                    {this.manageContent(this.state.content.__typename)}
                </div>
            </div>
        );
    }
}

export default Extract;