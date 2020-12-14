export const Spinner = () => {
    return (
        <div className="spinner-wrapper">
            <div className="spinner"></div>
        </div>
    );
}

export const SpinnerAsHtmlNode = () => {
    let node = document.createElement("DIV");
    node.classList.add("spinner-wrapper", "m-auto");
    let childNode = document.createElement("DIV");
    childNode.classList.add("spinner");
    node.appendChild(childNode);
    return node;
}