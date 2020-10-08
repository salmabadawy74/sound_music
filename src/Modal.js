import React, { Component } from "react";
import styled from "styled-components";

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

  hundleChange = (evt) => {
    const value = evt.target.value;

    this.setState({
      ...this.state,
      [evt.target.name]: value,
    });
  };

  render() {
    const { value, closeModal } = this.props;
    const onSubmit = () => {
      value.songs.push(this.state);
    };

    {
      if (!value.openModal) {
        return null;
      } else {
        return (
          <ModalContainer>
            <div className="container">
              <div className="row">
                <div
                  id="Modal"
                  className="col-9 mx-auto  col-md-6 text-center text-capitalize card p-5"
                >
                  <h5>Add Track to Playlist</h5>
                  <form>
                    <div className="form-group row my-4">
                      <label
                        htmlFor="staticEmail"
                        className="col-sm-4 com-label"
                      >
                        Name
                      </label>
                      <div className="col-sm-8">
                        <input
                          required
                          type="text"
                          id="Name-Song"
                          className="form-control"
                          placeholder="Song Name..."
                          name="name"
                          onChange={this.hundleChange}
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
                          onChange={this.hundleChange}
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
                          onChange={this.hundleChange}
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
                          onChange={this.hundleChange}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary my-4"
                      onClick={() => {
                        closeModal();
                        onSubmit();
                      }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </ModalContainer>
        );
      }
    }
  }
}

export default Modal;

const ModalContainer = styled.div`
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
