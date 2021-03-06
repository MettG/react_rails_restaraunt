import React from 'react';
import { Form, } from "semantic-ui-react";

class ItemForm extends React.Component {
	state = {...this.props.item};
	updating = this.props.setAdding !== undefined;
  handleChange = (e) => {
		if(e.target.name === "name")
			this.setState({ name: e.target.value, });
		else if(e.target.name === "description")
			this.setState({ description: e.target.value, });
		else if(e.target.name === "price")
			this.setState({ price: e.target.value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
		this.props.addItem(this.state);
		if(this.updating) this.props.setAdding(false);
    this.setState({name:"",description:"",price:""});
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label="Item name"
          placeholder="Spaghetti"
					required
					name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Item description"
          placeholder="Noodles and Marinara sauce"
					required
					name="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Price"
          placeholder="$7.99"
					required
					name="price"
          value={this.state.price}
          onChange={this.handleChange}
        />
				<Form.Button
					type = "submit"
				>{this.updating ? "Update" : "Add"}</Form.Button>
      </Form>
    )
  }
}

export default ItemForm;