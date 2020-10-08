import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Song from "./Song";
import Audio from "./Audio";
import Modal from "./Modal";
class App extends Component {
  state = {
    songs: [],
    playSong: {},
    addSong: {},
    search: "",
    openModal: false,
  };
  componentDidMount() {
    axios
      .get("https://api.jsonbin.io/b/5f69e387302a837e956b59b5")
      .then((response) => {
        this.setState({
          songs: response.data.tracks,
        });
      });
  }

  getItem = (url) => {
    const song = this.state.songs.find((item) => item.url === url);
    return song;
  };
  closeModal = () => {
    this.setState({
      openModal: false,
    });
  };

  hundleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  hundleDelete = (url) => {
    let tempListSong = [...this.state.songs];
    tempListSong = tempListSong.filter((item) => item.url !== url);
    this.setState(() => {
      return {
        songs: tempListSong,
      };
    });
  };
  hundleSong = (url) => {
    const Song = this.getItem(url);

    this.setState(() => {
      return {
        playSong: Song,
      };
    });
  };

  openModal = () => {
    this.setState({
      openModal: true,
    });
  };
  render() {
    let filteredSongs = this.state.songs.filter((song) => {
      return song.name.toLowerCase().includes(this.state.search.toLowerCase());
    });
    return (
      <div className="container">
        <div className="row">
          <h4 className="mt-2 mb-0">Search :</h4>

          <div className="sound-app  ">
            <div className="search-part">
              <input
                type="text"
                value={this.state.search}
                placeholder="Search by track name ..."
                onChange={this.hundleChange}
                className="search-input"
              />
            </div>
            <Audio playSong={this.state.playSong} />
            <div className="card bg-light p-2">
              {filteredSongs.map((song) => {
                return (
                  <Song
                    key={song.name}
                    url={song.url}
                    title={song.artist}
                    length={song.length}
                    name={song.name}
                    hundleDelete={this.hundleDelete}
                    hundleSong={this.hundleSong}
                  />
                );
              })}
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary mt-3 py-2 px-4   text-uppercase"
                onClick={() => {
                  this.openModal();
                }}
              >
                Add New Track
              </button>
            </div>
            <Modal
              closeModal={this.closeModal}
              value={this.state}
              addSong={this.state.addSong}
              hundleForm={this.hundleForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
