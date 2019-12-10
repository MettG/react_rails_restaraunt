import React from 'react';
import { Card, Label, } from 'semantic-ui-react';

const Item = ({ id, name, description, price, renderForm, deleteItem }) => (
  <Card>
		<Card.Content>
			<Card.Header>{ name }</Card.Header>
			<Label as="a" color='red' ribbon='right'>{price}</Label>
			<Card.Description>{description}</Card.Description>
		</Card.Content>
		<Card.Content extra>
			<Button 
				icon 
				color="red" 
				size="tiny" 
				onClick={() => deleteItem(id)}
				>
				<Icon name="trash" />
			</Button>
			<Button 
				icon
				color="blue"
				size="tiny"
				onClick={() => renderForm(id)}
			>
				<Icon name="pencil" />
			</Button>
		</Card.Content>
  </Card>
)

export default Item;