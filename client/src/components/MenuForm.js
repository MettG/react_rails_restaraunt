import React from 'react';
import { Form, } from "semantic-ui-react";

class MenuForm extends React.Component {
  state = { name: "", };

  handleChange = (e) => {
		if(e.target.name === "name")
			this.setState({ name: e.target.value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addMenu(this.state);
    this.setState({ name: "",});
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label="Menu name"
          placeholder="Supper"
					required
					name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
				<Form.Button
					type = "submit"
				>Add</Form.Button>
      </Form>
    )
  }
}

export default MenuForm;