import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";

export default class componentName extends Component {
  render() {
    const { playSong } = this.props;
    return (
      <React.Fragment>
        <ReactAudioPlayer
          className="audio"
          src={playSong.url}
          autoPlay
          controls
        />
      </React.Fragment>
    );
  }
}
