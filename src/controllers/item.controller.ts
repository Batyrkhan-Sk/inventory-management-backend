import { Response } from 'express';
import * as itemService from '../services/item.service';
import { AuthRequest } from '../types/express';

export const createItem = async (req: AuthRequest, res: Response) => {
  try {
    const { inventoryId, title, price, quantity, description, category, imageUrl, customId } = req.body;
    const createdById = req.user?.id;

    if (!inventoryId) {
      return res.status(400).json({ success: false, message: 'inventoryId is required' });
    }

    if (!createdById) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (!title) {
      return res.status(400).json({ success: false, message: 'title is required' });
    }

    if (price === undefined || isNaN(Number(price))) {
      return res.status(400).json({ success: false, message: 'valid price is required' });
    }

    if (quantity === undefined || isNaN(Number(quantity))) {
      return res.status(400).json({ success: false, message: 'valid quantity is required' });
    }

    if (customId && inventoryId && await itemService.findByCustomId(inventoryId, customId)) {
    return res.status(400).json({
    success: false,
    message: 'customId must be unique'
  });
}
    const newItem = await itemService.createItem({
      inventoryId,
      title,
      price: Number(price),
      quantity: Number(quantity),
      description: description || null,
      category: category || null,
      imageUrl: imageUrl || null,
      customId: req.body.customId || null,
      createdById
    });

    return res.status(201).json({
      success: true,
      data: newItem,
      message: 'Item created successfully'
    });
  } catch (error: any) {
    console.error('Error creating item:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create item',
      error: error.message
    });
  }
};

export const getItemsByInventoryId = async (req: AuthRequest, res: Response) => {
  try {
    const { inventoryId } = req.params;
    const items = await itemService.getItemsByInventoryId(inventoryId);
    res.status(200).json({
      success: true,
      data: items,
      message: 'Items fetched successfully'
    });
  } catch (error: any) {
    console.log("Error fetching items:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch items',
      error: error.message
    });
  }
};

export const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    const { itemId } = req.params;
    const updateData = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const updatedItem = await itemService.updateItem(itemId, updateData);
    res.status(200).json({
      success: true,
      data: updatedItem,
      message: 'Item updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update item',
      error: error.message
    });
  }
};

export const deleteItem = async (req: AuthRequest, res: Response) => {
  try {
    const { itemId } = req.params;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    await itemService.deleteItem(itemId);
    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete item',
      error: error.message
    });
  }
};