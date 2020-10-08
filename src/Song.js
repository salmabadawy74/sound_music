import React from "react";

const Song = ({ name, title, length, hundleDelete, hundleSong, url }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="song" onClick={() => hundleSong(url)}>
          <div className="song_info d-flex align-items-center justify-content-between ">
            <h5>
              {title}-{name}
            </h5>
            <h5>
              <span
                className="delete-song right "
                onClick={() => hundleDelete(url)}
              >
                <i className="fa fa-times"></i>
              </span>
            </h5>
          </div>
          <div className="song_length align-self-lg-start">
            <p>{length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
