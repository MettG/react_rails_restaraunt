import React, {useState} from 'react';
import Item from './Item';
import { Card, Button, Input } from 'semantic-ui-react';
import { render } from 'react-dom';
import ItemForm from './ItemForm';

const Menu = ({ menu, updateMenu, deleteMenu, updateItem, deleteItem, updatingMenu, addItem}) => {

	const [itemForm, setItemForm] = useState(nil);
	return (
		<>
			{updatingMenu ? 
				<Input 
					value={menu.name}
					onChange={() => updateMenu(menu.name)}
				>
				</Input>
				: <Header as="h1">{menu.name}</Header> 
			}
			<Button 
				icon 
				color="red" 
				size="tiny" 
				onClick={() => deleteMenu(menu.id)}
				>
				<Icon name="trash" />
			</Button>
			<Button 
				icon
				color="blue"
				size="tiny"
				onClick={() => updateMenu(menu.id)}
			>
				<Icon name="pencil" />
			</Button>
			<Card.Group>
				{ menu.items.map( item => 
						{
							if(item.id !== itemForm) {
								<Item
									key={item.id}
									{...item}
									updateItem={updateItem}
									deleteItem={deleteItem}
									renderForm={setItemForm}
								/>
							}
							else {
								<ItemForm
									menu_id={menu.id}
									addItem={addItem}
								/>
							}
						}
					)
				}
			</Card.Group>
		</>
	)
}

export default Menu;