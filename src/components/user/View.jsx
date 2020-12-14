import React from 'react';

import history from '../../history';
import { mediaTypes, getMediaData } from '../helpers';
import Image from './media/Image';

class View extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mediaData: null
        }

        this.monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    }

    async componentDidMount() {
        document.addEventListener("keydown", this.closePopupOnEsc);
        let mediaData = await getMediaData(this.props.shortcode);
        this.setState({ mediaData: mediaData });
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.closePopupOnEsc);
    }

    manageContent = (mediaType) => {
        switch(mediaType) {
            case mediaTypes.IMAGE:
                return <Image path={this.state.mediaData.display_url}></Image>
            default:
                return <h1>No se puede mostrar el contenido en este momento.</h1>
        }
    }

    closePopup = () => {
        document.body.style.overflow = "visible";
        return history.push(`/user/${this.props.profile}`);
    }

    closePopupOnEsc = (event) => {
        if(event.key === "Escape") {
            console.log(event.key);
            this.closePopup();
        };
    }

    formatDate = (timestamp) => {
        let date = new Date(timestamp * 1000);        

        return this.monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }

    render() {console.log(this.state.mediaData);
        return (
            this.state.mediaData &&
            <div id="view_wrapper">
                <div id="view_bar" className="row no-gutters align-items-center">
                    <div className="col-1">
                        <a href={`https://www.instagram.com/p/${this.props.shortcode}`} target="_blank" rel="noreferrer" title="Abrir en Instagram">
                            <i className="la la-external-link-alt"></i>
                        </a>
                    </div>
                    <div className="col-10 text-center">
                        <span><i className="la la-heart"></i> { this.props.formatNumber(this.state.mediaData.edge_media_preview_like.count) }</span>&nbsp;
                        <span><i className="la la-comment"></i> { this.props.formatNumber(this.state.mediaData.edge_media_preview_comment.count) }</span>
                    </div>
                    <div className="col-1 text-right">
                        <button className="view-content-close" title="Cerrar" onClick={() => this.closePopup()}><i className="la la-close"></i></button>
                    </div>
                </div>
                <div id="view_content" className="row no-gutters">
                    <div className="col col-md-7 mx-auto">
                        { this.manageContent(this.props.mediaType) }
                    </div>
                </div>
                <div id="view_description" className="row no-gutters">
                    <div className="col col-md-8 mx-auto">
                        <p className="publication-date"><span>{ this.formatDate(this.state.mediaData.taken_at_timestamp) }</span></p>
                        <p className="view-description"><span>{ this.state.mediaData.edge_media_to_caption.edges[0].node.text }</span></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default View;