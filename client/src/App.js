import React, { Component, } from 'react';
import axios from 'axios';
import MenuForm from './components/MenuForm';
import Menu from './components/Menu';
import { Container, Grid, Divider } from "semantic-ui-react";

class App extends Component {
  state = { menus: [], };
  componentDidMount() {
		axios.get("/api/menus")
		.then( res => {
			this.setState({ menus: res.data.map( d => {
				return {...d, items:[]}
			}), });
		})
		.then( () => {
			this.state.menus.map( menu => {
				this.getItems(menu)
			})
		})
		.catch( err => {
			console.log(err);
		})
	}
	
	getItems(menu) {
		axios.get(`/api/menus/${menu.id}/items`)
		.then( res => {
			this.setState({ menus: this.state.menus.map( m => {
				if(m.id === menu.id) 
					return {...m, items: res.data}
				return m
			}), });
		})
		.catch( err => {
			console.log(err);
		})
	}

  addMenu = (name) => {
		axios.post("/api/menus", name)
		.then( res => {
			this.setState({menus: [...this.state.menus, {...res.data, items:[] }] });
		})
  }

  updateMenu = (menu) => {
    axios.put(`/api/menus/${menu.id}`, {name: menu.name})
    .then( res => {
      const menus = this.state.menus.map( m => {
				if (m.id === menu.id)
					return {...res.data, items:[]};
				return m;
			});
			this.setState({ menus, });
		}).then( () => {
			this.state.menus.map( m => {
				this.getItems(m)
			})
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
				{menus: this.state.menus.map( menu => {
					if(menu.id === item.menu_id)
						return {items: [...menu.items, res.data], ...menu}
					return menu
				}
			)});
		})
	}

	deleteItem = (menu_id, id) =>{
		axios.delete(`/api/menus/${menu_id}/items/${id}`)
		.then( res => {
			this.setState(
				{menus: this.state.menus.map( menu => {
					if(menu.id === menu_id)
						return {items: menu.items.filter( i => {
							if(i.id !== id) return i;
							return null;
						}) , ...menu}
					return menu
				}
			)});
		})
	}

	updateItem = (item) =>{
		axios.put(`/api/menus/${item.menu_id}/items${item.id}`, {item})
		.then( res => {
			this.setState(
				{menus: this.state.menus.map( menu => {
					if(menu.id === item.menu_id)
						return {items: menu.items.map( i => {
							if(i.id === item.id) return res.data;
							return i;
						}) , ...menu}
					return menu
				}
			)});
		})
	}

  render() {
    return (
      <Container style={{ padding: "30px 0", }}>
        <MenuForm addMenu={this.addMenu} />
        <br />
        <br />
				<Divider />
				<Grid columns={3} divided>
					{this.state.menus.map(m => {
						return(
							<Grid.Column>
								<Menu
									menu={m}
									updateMenu={this.updateMenu}
									deleteMenu={this.deleteMenu}
									updateItem={this.updateItem}
									deleteItem={this.deleteItem}
									addItem={this.addItem}
								/>
							</Grid.Column>
						)
					})}
				</Grid>
      </Container>
    );
  }
}

export default App;
