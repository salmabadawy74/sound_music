import React, { Component } from "react";
import styled from "styled-components";

// * I recommend refactoring this class component into a functional component -- these days, we don't *ever* need to use class components (they're clunky and outdated)
// * here's how I would start it:
// export const Modal = (props) => {
// * plus, we can destructure the props right here: then we don't ever need to say "this.props." or even "props."
// export const Modal = ({closeModal, value, addSong, handleForm, isModalOpen}) => {
export class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      artist: "",
      url: "",
      length: "",
    };
  }

  handleChange = (evt) => {
    const value = evt.target.value;

    this.setState({
      ...this.state,
      [evt.target.name]: value,
    });
  };

  // * if you *must* use class components, then we should keep the "render" method as clean as possible by moving everything else into methods
  onSubmit = () => {
    const { addSong } = this.props;
    // value.songs.push(this.state);
    // * pushing into state won't trigger a re-render;
    // * only setState triggers a re-render -- we can pass the setter like "addSong" down instead
    // *** note that triggering a parent re-render (via parent's setState) will cause the child to re-render
    addSong(this.state);
  };

  render() {
    const { closeModal } = this.props;

    // * if !isModalOpen, we can avoid rendering the component altogether in the parent component
    return (
      <ModalContainerStyles>
        <div className="container">
          <div className="row">
            <div
              id="modal" // * lowercase
              className="col-9 mx-auto  col-md-6 text-center text-capitalize card p-5"
            >
              <h5>Add Track to Playlist</h5>
              <form>
                {/* * I'm noticing a lot of repetition here,
                  * maybe you can extract the pieces of data that are different between these form-group elements and .map them out from an array of objects?
                  *
                  {
                     [{id: "name-song", type: "text", placeholder: "Song Name..."}, {id: "name-artist", type: "text", placeholder: "Artist Name..."}].map(({id,type,placeholder})=> <div ... )
                  }
                  */}
                <div className="form-group row my-4">
                  <label htmlFor="staticEmail" className="col-sm-4 com-label">
                    Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      required
                      type="text"
                      id="Name-Song" // * probably want to do lowercase by convention, UpperCase is reserved for specific things like React components
                      className="form-control"
                      placeholder="Song Name..."
                      name="name"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row my-4">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Atrist
                  </label>
                  <div className="col-sm-8">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="Name-Artist"
                      placeholder="Artist Name..."
                      name="artist"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row my-4">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Length
                  </label>
                  <div className="col-sm-8">
                    <input
                      required
                      type="number"
                      className="form-control"
                      id="Length"
                      placeholder="Length"
                      name="length"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row my-4">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    URL
                  </label>
                  <div className="col-sm-8">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="URL"
                      placeholder="URL...."
                      name="url"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary my-4"
                  onClick={() => {
                    closeModal();
                    this.onSubmit();
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </ModalContainerStyles>
    );
  }
}

export default Modal;

// * personally I name all my styled components "SomethingStyles" so I can tell just from looking at the element that it's a styled component
const ModalContainerStyles = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: #fff;
    border-radius: 10px;
    padding: 20px 0;
  }
`;
