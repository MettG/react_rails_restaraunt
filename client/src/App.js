import React, { Component, } from 'react';
import axios from 'axios';
import MenuForm from './components/MenuForm';
import Menu from './components/Menu';
import { Container, } from "semantic-ui-react";

class App extends Component {
  state = { menus: [], };
  componentDidMount() {
		axios.get("/api/menus")
		.then( res => {
			this.setState({ menus: res.data, });
		})
		.catch( err => {
			console.log(err);
		})
  }

  addMenu = (name) => {
		axios.post("/api/menus", {name})
		.then( res => {
			this.setState({menus: [...this.state.menus, res.data]});
		})
  }

  updateMenu = (menu) => {
    axios.put(`/api/menus/${menu.id}`, {name: menu.name})
    .then( res => {
      const menus = this.state.menus.map( m => {
				if (m.id === id)
					return res.data;
				return m;
			});
			this.setState({ menus, });
		})
  }

  deleteMenu = (id) => {
		axios.delete(`/api/menus/${id}`)
    .then( res => {
      const { menus, } = this.state;
      this.setState({ menus: menus.filter(m => m.id !== id), })
    })
	}
	
	addItem = (item) =>{
		axios.post(`/api/menus/${item.menu_id}/items`, {item})
		.then( res => {
			this.setState(
				{menus: this.menus.map( menu => {
					if(menu.id === item.menu_id)
						return {items: [...menu.items, item], ...menu}
				}
			)});
		})
	}

	deleteItem = (item) =>{
		axios.delete(`/api/menus/${item.menu_id}/items${item.id}`, {item})
		.then( res => {
			this.setState(
				{menus: this.menus.map( menu => {
					if(menu.id === item.menu_id)
						return {items: menu.items.filter( i => {
							if(i.id !== item.id) return i;
							return null;
						}) , ...menu}
				}
			)});
		})
	}

	updateItem = (item) =>{
		axios.put(`/api/menus/${item.menu_id}/items${item.id}`, {item})
		.then( res => {
			this.setState(
				{menus: this.menus.map( menu => {
					if(menu.id === item.menu_id)
						return {items: menu.items.map( i => {
							if(i.id === item.id) return item;
							return i;
						}) , ...menu}
				}
			)});
		})
	}

  render() {
    return (
      <Container style={{ padding: "30px 0", }}>
        <MenuForm addMenu={this.addItem} />
        <br />
        <br />
				<Grid columns={3} divided>
					{this.state.menus.map(m => {
						<Grid.Column>
						<Menu
							menu={m}
							updateMenu={this.updateTodo}
							deleteMenu={this.deleteTodo}
						/>
						</Grid.Column>
					})}
				</Grid>
      </Container>
    );
  }
}

export default App;
