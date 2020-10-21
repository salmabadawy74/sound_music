import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Song from "./Song";
import Audio from "./Audio";
import Modal from "./Modal";
import { useEffect } from "react";

// * I refactored from "class component" to "functional components" with the newer React Hooks -- they're infinitely cleaner / composable / fun to work with

// * the course I recommend for learning modern React with Hooks is this one: https://egghead.io/courses/the-beginner-s-guide-to-react

function App() {
  // * instead of this.state we use the useState hook
  const [state, setState] = useState({
    songs: [],
    playSong: {},
    addSong: {},
    search: "",
    isModalOpen: false, // * booleans like this are easier to read if they start with a word like "is, should, will" -- it reads more like a sentence "is the modal open" -> "isModalOpen"
  });

  // * just for example here, with useState we could store many separate states individually, and group together only the pieces that are related,
  // * that way we can group, move around, or reuse related pieces of components together
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // * componentDidMount is done using the useEffect hook
  useEffect(() => {
    axios
      .get("https://api.jsonbin.io/b/5f69e387302a837e956b59b5")
      .then((response) => {
        setState({
          ...state, // * since we're storing multiple values in one state, using useState hook, we have to spread the rest of the state here
          songs: response.data.tracks,
        });
      });
  }, []); // * this is the "dependencies array" -- it's empty, so this will only run once on mount. More on that in this course https://egghead.io/courses/the-beginner-s-guide-to-react

  const getItem = (url) => {
    const song = state.songs.find((item) => item.url === url);
    return song;
  };
  const closeModal = () => {
    setState({
      ...state,
      openModal: false,
    });
  };
  const handleChange = (e) => {
    setState({
      ...state,
      search: e.target.value,
    });
  };
  const handleDelete = (url) => {
    const filteredSongs = state.songs.filter((item) => item.url !== url); // * .filter doesn't change or "mutate" the original, so you can just reference the original state.songs here (only .sort mutates the original)
    setState({
      ...state,
      songs: filteredSongs,
    });
  };
  // * I'm not sure what "handleSong" does just from reading the name, maybe use a more descriptive name like "handlePlaySong" or "handleLoadSong" depending what it does?
  const handleSong = (url) => {
    const song = getItem(url);
    setState({
      ...state,
      playSong: song,
    });
  };
  const openModal = () => {
    setState({
      ...state,
      openModal: true,
    });
  };
  // * we can use "const" here instead of "let" because the value isn't getting modified (always use const unless you must use let)
  const filteredSongs = state.songs.filter((song) => {
    return song.name.toLowerCase().includes(state.search.toLowerCase());
  });

  return (
    <div className="container">
      <div className="row">
        <h4 className="mt-2 mb-0">Search :</h4>

        <div className="sound-app  ">
          <div className="search-part">
            <input
              type="text"
              value={state.search}
              placeholder="Search by track name ..."
              onChange={handleChange}
              className="search-input"
            />
          </div>
          <Audio playSong={state.playSong} />
          <div className="card bg-light p-2">
            {filteredSongs.map((song) => {
              return (
                <Song
                  key={song.name}
                  url={song.url}
                  title={song.artist}
                  length={song.length}
                  name={song.name}
                  handleDelete={handleDelete}
                  handleSong={handleSong}
                />
              );
            })}
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary mt-3 py-2 px-4   text-uppercase"
              onClick={() => {
                openModal();
              }}
            >
              Add New Track
            </button>
          </div>
          // * if !isModalOpen, we can avoid rendering the component altogether
          in the parent component
          {state.isModalOpen ? (
            <Modal
              closeModal={closeModal}
              // * try passing only the props that the child needs instead of the entire state
              // * here we can pass an "addSong" function which will add a song onto the end of state.songs
              addSong={(song) =>
                setState({ ...state, songs: [...state.songs, song] })
              }
              handleForm={() => {
                console.log("handleForm - TODO");
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
