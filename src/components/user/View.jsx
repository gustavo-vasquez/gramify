import React from 'react';
import { Link } from 'react-router-dom';

import history from '../../history';
import { mediaTypes, getMediaData, copyLinkToClipboard, formatNumber } from '../helpers';
import Image from './media/Image';
import Gallery from './media/Gallery';
import Video from './media/Video';

class View extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mediaData: null
        }

        this.monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        this.instagramLink = `https://www.instagram.com/p/${this.props.shortcode}`;
    }

    async componentDidMount() {
        document.addEventListener("keydown", this.closePopupOnEsc);
        document.body.style.overflow = "hidden";
        let mediaData = await getMediaData(this.props.shortcode);
        this.setState({ mediaData: mediaData });
    }

    componentWillUnmount() {
        document.body.style.overflow = "visible";
        document.removeEventListener("keydown", this.closePopupOnEsc);
    }

    manageContent = (mediaType) => {
        switch(mediaType) {
            case mediaTypes.IMAGE.label:
                return <Image path={this.state.mediaData.display_url} alt={this.state.mediaData.accessibility_caption}></Image>
            case mediaTypes.GALLERY.label:
                return <Gallery images={this.state.mediaData.edge_sidecar_to_children.edges}></Gallery>
            case mediaTypes.VIDEO.label:
                return <Video path={this.state.mediaData.video_url}></Video>
            default:
                return alert("No se puede mostrar el contenido en este momento.");
        }
    }

    closePopup = () => {
        return history.push(`/profile/${this.props.username}`);
    }

    closePopupOnEsc = (event) => {
        if(event.key === "Escape") {
            console.log(event.key);
            this.closePopup();
        };
    }

    formatDate = (timestamp, toLocal = false) => {
        let date = new Date(timestamp * 1000);        

        if(toLocal)
            return date.toLocaleString();
        else
            return this.monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }

    render() {//console.log(this.state.mediaData);
        return (
            this.state.mediaData &&
            <div id="view_wrapper">
                <div id="view_bar" className="row no-gutters align-items-center">
                    <div className="col-1">
                        <a href={this.instagramLink} target="_blank" rel="noreferrer" title="Abrir en Instagram">
                            <i className="la la-external-link-alt"></i>
                        </a>
                    </div>
                    <div className="col-10 text-center">
                        <span><i className="la la-heart"></i> { formatNumber(this.state.mediaData.edge_media_preview_like.count) }</span>&nbsp;
                        <span><i className="la la-comment"></i> { formatNumber(this.state.mediaData.edge_media_preview_comment.count) }</span>
                    </div>
                    <div className="col-1 text-right">
                        <button className="view-bar-close" title="Cerrar" onClick={() => this.closePopup()}><i className="la la-close"></i></button>
                    </div>
                </div>
                <div id="view_content" className="row no-gutters p-md-2">
                    <div className="col-12 col-md-6">
                        { this.manageContent(this.props.mediaType) }
                    </div>
                    <div className="col-12 col-md-6">
                        <div id="view_description" className="row pt-3 pt-md-0">
                            <div className="col">
                                <p className="publication-date text-center text-md-left"><span>{ this.formatDate(this.state.mediaData.taken_at_timestamp) }</span></p>
                                <p className="view-description"><span>{ this.state.mediaData.edge_media_to_caption.edges[0].node.text }</span></p>
                                <a href={this.instagramLink} target="_blank" rel="noreferrer" className="d-block">Ver en Instagram</a>
                                <a href={this.instagramLink} className="d-block mt-2" onClick={(event) => copyLinkToClipboard(event, this.instagramLink)}>Copiar enlace</a>
                                <div id="view_comments" className="pt-4">
                                    <h5 className="mb-4">Comentarios recientes</h5>
                                    { this.state.mediaData.edge_media_to_parent_comment.edges && this.state.mediaData.edge_media_to_parent_comment.edges.reverse().map((comment, index) =>
                                    <div className="row" key={index}>
                                        <div className="col-auto">
                                            <Link to={`/profile/${comment.node.owner.username}`}>
                                                <img className="rounded-circle" width="50" height="50" src={comment.node.owner.profile_pic_url} alt={`${comment.node.owner.username}_picture`} />
                                            </Link>
                                        </div>
                                        <div className="col-9">
                                            <Link to={`/profile/${comment.node.owner.username}`}>
                                                <span className="pre-wrap">
                                                    { comment.node.owner.is_verified && <i className="la la-check-circle la-lg text-danger"></i> }
                                                    <b>{ comment.node.owner.username }</b>
                                                </span>
                                            </Link>
                                            <p className="mb-1">{ comment.node.text }</p>
                                            <p className="text-muted">{ this.formatDate(comment.node.created_at, true) }</p>
                                        </div>
                                    </div> )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default View;