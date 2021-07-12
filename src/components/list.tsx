import React from 'react';
import { ItemInterface } from '../types/item';
import Item from './item';

interface ItemsProps{
    items: ItemInterface[]
}

const ItemsList:React.FC<ItemsProps> = ({ items }: ItemsProps) => (
  <>
    {
        items.map((item) => (
          <Item item={item} key={item.id} />
        ))
    }
  </>
);

export default ItemsList;
