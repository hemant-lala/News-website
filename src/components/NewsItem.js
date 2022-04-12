import React from "react";

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, time, source } = props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://www.northampton.ac.uk/wp-content/uploads/2018/11/default-svp_news.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                {source}
                <span className="visually-hidden">unread messages</span>
              </span>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                by {author ? author : "Unknown"}, on {date} at {time}
              </small>
            </p>
            <a
              target="_blank"
              href={newsUrl}
              className="btn btn-sm btn-primary"
            >
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
