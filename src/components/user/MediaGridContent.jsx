import React from 'react';

export const MediaGridContent = (props) => {
    return (
        <React.Fragment>
            {props.pages && props.pages.map((page) => 
            page.map((post, index) =>
            <div className="col-4 col-md-3 text-center" key={index}>
                <figure className="media-wrapper" onClick={() => props.viewContent(post.node.__typename, post.node.shortcode)}>
                    <img className="rounded" src={post.node.display_url} alt={post.node.accessibility_caption} />
                    <figcaption>{props.seeMediaTypeIcon(post.node.__typename)}</figcaption>
                </figure>
            </div>
            ))}
        </React.Fragment>
    );
}