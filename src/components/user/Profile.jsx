import React from 'react';
import { Link, Redirect, Switch, Route } from 'react-router-dom';

import history from '../../history';
import { getUserInformation, addVisitProfile, mediaTypes, goNextPage } from '../helpers';
import { MediaGridContent } from './MediaGridContent';
import View from './View';
import { Spinner, SpinnerAsHtmlNode } from '../shared/Spinner';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInformation: null,
            aditionalPages: [],
            currentCursor: '',
            hasNextPage: false
        }
    }

    componentDidMount() {
        document.title = `Perfil de @${this.props.username} • Instractaram`;
        this.loadProfile();
    }

    componentDidUpdate(prevProps,prevState) {
        if(this.props.username !== prevProps.username) {
            this.loadProfile();
        }
    }

    loadProfile = async () => {
        let result = await getUserInformation(this.props.username);
        let aditionalPages = new Array(result.edge_owner_to_timeline_media.edges);

        this.setState({
            userInformation: result,
            aditionalPages: aditionalPages,
            currentCursor: result.edge_owner_to_timeline_media.page_info.end_cursor,
            hasNextPage: result.edge_owner_to_timeline_media.page_info.has_next_page }, addVisitProfile(result));
    }

    formatNumber = (n) => {
        if(!isNaN(n)) {
            if (n < 1e3) return n;
            if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
            if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
            if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
            if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
        }
    }

    seeMediaTypeIcon = (typeName) => {
        switch(typeName) {
            case mediaTypes.IMAGE.name:
                break;
            case mediaTypes.GALLERY.name:
                return <i className="la la-copy"></i>
            case mediaTypes.VIDEO.name:
                return <i className="la la-video"></i>
            default:
                break;
        }
    }

    addNewPage = async (username, cursor) => {
        document.querySelector(".media-grid").append(SpinnerAsHtmlNode());
        let newPage = await goNextPage(username, cursor);
        this.setState((prevState) => {
            let aditionalPages = prevState.aditionalPages;
            aditionalPages.push(newPage.user.edge_owner_to_timeline_media.edges);
            document.querySelector(".media-grid").lastChild.remove();

            return {
                aditionalPages: aditionalPages,
                currentCursor: newPage.user.edge_owner_to_timeline_media.page_info.end_cursor,
                hasNextPage: newPage.user.edge_owner_to_timeline_media.page_info.has_next_page
            }
        });
    }

    viewContent = (mediaType, shortcode) => {
        let mediaTypeLabel;

        switch(mediaType) {
            case mediaTypes.IMAGE.name:
                mediaTypeLabel = mediaTypes.IMAGE.label;
                break;
            case mediaTypes.GALLERY.name:
                mediaTypeLabel = mediaTypes.GALLERY.label;
                break;
            case mediaTypes.VIDEO.name:
                mediaTypeLabel = mediaTypes.VIDEO.label;
                break;
            default:
                return;
        }
        
        history.push(`/profile/${this.props.username}/view/${mediaTypeLabel}/${shortcode}`);
    }

    render() {//console.log(this.state.userInformation);
        if(this.state.userInformation === null)
            return <Spinner></Spinner>
        else
            return (
                this.state.userInformation !== false ?
                <React.Fragment>
                    <div className="row">
                        <div className="col-12 col-md-auto">
                            <div className="profile-picture-wrapper mx-auto mx-md-0">
                                <img className="rounded-circle" width="150" height="150" src={this.state.userInformation.profile_pic_url_hd} alt="profile_picture" />
                            </div>
                        </div>
                        <div className="col-12 col-md-9 text-center text-md-left pt-3 pt-md-0">
                            <h3 className="truncate-text mb-3">{this.state.userInformation.is_verified && <i className="la la-check-circle text-danger" title="Cuenta verificada"></i>} {this.state.userInformation.username}</h3>
                            <div className="row">
                                <div className="col-4 col-md-auto">
                                    <p>
                                        <b>{this.formatNumber(this.state.userInformation.edge_owner_to_timeline_media.count)}</b>
                                        <span className="d-block d-md-inline"> publicaciones</span>
                                    </p>
                                </div>
                                <div className="col-4 col-md-auto">
                                    <p>
                                        <b>{this.formatNumber(this.state.userInformation.edge_followed_by.count)}</b>
                                        <span className="d-block d-md-inline"> seguidores</span>
                                    </p>
                                </div>
                                <div className="col-4 col-md-auto">
                                    <p>
                                        <b>{this.formatNumber(this.state.userInformation.edge_follow.count)}</b>
                                        <span className="d-block d-md-inline"> siguiendo</span>
                                    </p>
                                </div>
                            </div>
                            { this.state.userInformation.full_name && <p><b>{this.state.userInformation.full_name}</b></p> }
                            { this.state.userInformation.biography && <p className="pre-wrap biography-size">{ this.state.userInformation.biography }</p> }
                            { this.state.userInformation.external_url && <p><a href={this.state.userInformation.external_url} target="_blank" rel="noreferrer">{this.state.userInformation.external_url}</a></p> }
                        </div>
                    </div>
                    <ul className="row no-gutters nav nav-pills media-tabs-wrapper">
                        <li className="col-4 nav-item">
                            <Link to={`/profile/${this.props.username}`} className={!this.props.tab ? "nav-link active" : "nav-link"}>
                                <div className="media-tab-title truncate-text">
                                    <i className="la la-photo-video"></i>
                                    <span> Todo</span>
                                </div>
                            </Link>
                        </li>
                        <li className="col-4 nav-item">
                            <Link to={`/profile/${this.props.username}/photos`} className={this.props.tab === "photos" ? "nav-link active" : "nav-link"}>
                                <div className="media-tab-title truncate-text">
                                    <i className="la la-photo"></i>
                                    <span> Fotos</span>
                                </div>
                            </Link>
                        </li>
                        <li className="col-4 nav-item">
                            <Link to={`/profile/${this.props.username}/videos`} className={this.props.tab === "videos" ? "nav-link active" : "nav-link"}>
                                <div className="media-tab-title truncate-text">
                                    <i className="la la-video"></i>
                                    <span> Videos</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                    <div className="row no-gutters media-grid">
                        { this.state.aditionalPages.length > 0 &&
                        <MediaGridContent pages={this.state.aditionalPages} seeMediaTypeIcon={this.seeMediaTypeIcon} viewContent={this.viewContent}></MediaGridContent> }
                    </div>
                    { this.state.hasNextPage && 
                    <div className="text-center">
                        <button className="btn btn-default add-more-content" onClick={() => this.addNewPage(this.props.username, this.state.currentCursor)}><i className="la la-plus la-lg"></i> Cargar más contenido</button>
                    </div> }
                    <Switch>
                        <Route path="/profile/:username/view/:mediaType/:shortcode" children={({ match }) => <View username={match.params.username} mediaType={match.params.mediaType} shortcode={match.params.shortcode}></View>}></Route>
                    </Switch>
                </React.Fragment>
                : <Redirect to="/profile/not_found"></Redirect>
            );
    }
}

export default Profile;