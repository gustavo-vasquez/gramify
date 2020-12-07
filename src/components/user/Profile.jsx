import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { getUserInformation } from '../helpers';
import { Spinner } from '../shared/Spinner';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInformation: null
        }
    }

    async componentDidMount() {
        let result = await getUserInformation(this.props.profile);
        this.setState({ userInformation: result });
    }

    render() {console.log(this.state.userInformation)
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
                            {/* <button className="btn btn-default my-3">Seguir</button> */}
                            <div className="row">
                                <div className="col-4 col-md-auto">
                                    <p>
                                        <b>{this.state.userInformation.edge_owner_to_timeline_media.count}</b>
                                        <span className="d-block d-md-inline"> publicaciones</span>
                                    </p>
                                </div>
                                <div className="col-4 col-md-auto">
                                    <p>
                                        <b>{this.state.userInformation.edge_followed_by.count}</b>
                                        <span className="d-block d-md-inline"> seguidores</span>
                                    </p>
                                </div>
                                <div className="col-4 col-md-auto">
                                    <p>
                                        <b>{this.state.userInformation.edge_follow.count}</b>
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
                            <Link to={`/user/${this.props.profile}`} className="nav-link">
                                <div className="media-tab-title">
                                    <i className="la la-photo-video"></i>
                                    <span> Todo</span>
                                </div>
                            </Link>
                        </li>
                        <li className="col-4 nav-item">
                            <Link to={`/user/${this.props.profile}/photos`} className="nav-link active">
                                <div className="media-tab-title">
                                    <i className="la la-photo"></i>
                                    <span> Fotos</span>
                                </div>
                            </Link>
                        </li>
                        <li className="col-4 nav-item">
                            <Link to={`/user/${this.props.profile}/videos`} className="nav-link">
                                <div className="media-tab-title">
                                    <i className="la la-video"></i>
                                    <span> Videos</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                    <div className="row no-gutters multimedia-grid py-4">
                        { this.state.userInformation.edge_owner_to_timeline_media.edges && this.state.userInformation.edge_owner_to_timeline_media.edges.map((post, index) =>
                        <div className="col-4 col-md-3 text-center" key={index}>
                            <figure className="media-wrapper">
                                <img className="rounded" src={post.node.display_url} alt="post_preview" />
                            </figure>
                            {/* <button className="btn"><i className="las la-download la-lg"></i> Guardar</button> */}
                        </div>
                        )}
                    </div>
                </React.Fragment>
                : <Redirect to="/user/not-found"></Redirect>
            );
    }
}

export default Profile;