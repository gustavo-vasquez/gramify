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

    async componentDidMount() {
        document.title = `Perfil de @${this.props.profile} • Instractaram`;
        let result = await getUserInformation(this.props.profile);
        this.setState({
            userInformation: result,
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
            case mediaTypes.IMAGE:
                break;
            case mediaTypes.GALLERY:
                return <i className="la la-copy"></i>
            case mediaTypes.VIDEO:
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
        document.body.style.overflow = "hidden";
        history.push(`/user/${this.props.profile}/view/${mediaType}/${shortcode}`);
    }

    render() {console.log(this.state.userInformation);
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
                        <div className="col-12 col-md-9 text-center text-md-left py-3 py-md-0">
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
                            <Link to={`/user/${this.props.profile}`} className={!this.props.tab ? "nav-link active" : "nav-link"}>
                                <div className="media-tab-title">
                                    <i className="la la-photo-video"></i>
                                    <span> Todo</span>
                                </div>
                            </Link>
                        </li>
                        <li className="col-4 nav-item">
                            <Link to={`/user/${this.props.profile}/photos`} className={this.props.tab === "photos" ? "nav-link active" : "nav-link"}>
                                <div className="media-tab-title">
                                    <i className="la la-photo"></i>
                                    <span> Fotos</span>
                                </div>
                            </Link>
                        </li>
                        <li className="col-4 nav-item">
                            <Link to={`/user/${this.props.profile}/videos`} className={this.props.tab === "videos" ? "nav-link active" : "nav-link"}>
                                <div className="media-tab-title">
                                    <i className="la la-video"></i>
                                    <span> Videos</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                    <div className="row no-gutters media-grid py-4">
                        { this.state.userInformation.edge_owner_to_timeline_media.edges && this.state.userInformation.edge_owner_to_timeline_media.edges.map((post, index) =>
                        <div className="col-4 col-md-3 text-center" key={index}>
                            <figure className="media-wrapper" onClick={() => this.viewContent(post.node.__typename, post.node.shortcode)}>
                                <img className="rounded" src={post.node.display_url} alt="post_preview" />
                                <figcaption>{this.seeMediaTypeIcon(post.node.__typename)}</figcaption>
                            </figure>
                        </div>
                        )}
                        { this.state.aditionalPages.length > 0 &&
                        <MediaGridContent pages={this.state.aditionalPages} seeMediaTypeIcon={this.seeMediaTypeIcon} viewContent={this.viewContent}></MediaGridContent> }
                    </div>
                    { this.state.hasNextPage && 
                    <div className="text-center">
                        <button className="btn btn-default add-more-content" onClick={() => this.addNewPage(this.props.profile, this.state.currentCursor)}><i className="la la-plus la-lg"></i> Cargar más contenido</button>
                    </div> }
                    <Switch>
                        <Route path="/user/:profile/view/:mediaType/:shortcode" children={({ match }) => <View profile={match.params.profile} mediaType={match.params.mediaType} shortcode={match.params.shortcode} formatNumber={this.formatNumber}></View>}></Route>
                    </Switch>
                </React.Fragment>
                : <Redirect to="/user/not-found"></Redirect>
            );
    }
}

export default Profile;