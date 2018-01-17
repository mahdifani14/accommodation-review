import React, { Component, PropTypes } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import styled from 'styled-components';
const Form = styled.form`
`;

class Search extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  state = {
    search: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit({
      search: this.state.search.trim()
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <TextField
          fullWidth
          name="search"
          floatingLabelText="Search by Travel with Type"
          floatingLabelFixed
          placeholder="FAMILY"
          type="text" onChange={this.handleChange} value={this.state.search}
        />
        <RaisedButton
          primary
          type="submit"
          label="Submit"
        />
      </Form>
    );
  }
}

export default Search;
