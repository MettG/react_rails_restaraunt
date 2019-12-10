import React, {useState} from 'react';
import Item from './Item';
import { Card, Button, Input, Header, Icon } from 'semantic-ui-react';
import ItemForm from './ItemForm';

const Menu = ({ menu, updateMenu, deleteMenu, updateItem, deleteItem, addItem}) => {
	const [itemInForm, setItemForm] = useState(null);
	const [updatingMenu, setUpdatingMenu] = useState(false);
	const [menuName, setMenuName] = useState(menu.name);
	const [addingItem, setAddingItem] = useState(false);
	return (
		<>
			<div style={{display:"flex"}}>
				{updatingMenu ? 
					<Input 
						value={menuName}
						onChange={(e) => {
							setMenuName(e.target.value);
						}}
					>
					</Input>
					: <Header as="h1">{menuName}</Header> 
				}
				<div style={{display:"flex", marginLeft: "auto", padding:"10px"}}>
					<Button 
						icon 
						color="black" 
						size="tiny" 
						onClick={() => deleteMenu(menu.id)}
						>
						<Icon name="trash" />
					</Button>
					<Button 
						icon
						color="black"
						size="tiny"
						onClick={() => {
							if (updatingMenu)
								updateMenu({name: menuName, ...menu})
							setUpdatingMenu(!updatingMenu)
						}}
					>
					<Icon name="pencil" />
				</Button>
				</div>
			</div>
			<Card.Group>
				{ menu.items.map( item => 
						{
							if(item.id !== itemInForm) {
								return <Item
									key={item.id}
									{...item}
									updateItem={updateItem}
									deleteItem={deleteItem}
									renderForm={setItemForm}
								/>
							}
							else {
								return <ItemForm
									item={item}
									addItem={updateItem}
								/>
							}
						}
					)
				}
			</Card.Group>
			<Button
				onClick={() => setAddingItem(!addingItem)}
			>+</Button>
			{addingItem ?
				<ItemForm addItem={addItem} setAdding={setAddingItem} item={{menu_id: menu.id}}/>
				:
				null 
			}
		</>
	)
}

export default Menu;