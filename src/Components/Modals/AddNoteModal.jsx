import React, {Component} from 'react';

class AddNoteModal extends Component {

  state = {
    note: '',
  };

  handleTextChange = e => {
    this.setState({
      note: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.note);
  };

  render() {
    return (
        <form className="form">
          <textarea rows="10" cols="50" className="form__textarea" onChange={this.handleTextChange} value={this.state.note}/>
          <button onClick={this.handleSubmit} type="submit" className="form__btn">Add Note</button>
        </form>
    );
  }
}

export default AddNoteModal;