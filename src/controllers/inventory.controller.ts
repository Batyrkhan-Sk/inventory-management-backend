import { Response } from 'express';
import * as inventoryService from '../services/inventory.service';
import { AuthRequest } from '../types/express';

export const getInventories = async (req: AuthRequest, res: Response) => {
  try {
    const inventories = await inventoryService.getAllInventories();
    res.status(200).json({
      success: true,
      data: inventories,
      message: 'Inventories fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching inventories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inventories',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getInventoryById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const inventory = await inventoryService.getInventoryById(id);

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: 'Inventory not found'
      });
    }

    res.status(200).json({
      success: true,
      data: inventory,
      message: 'Inventory fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inventory',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const createInventory = async (req: AuthRequest, res: Response) => {
  try {
    const inventoryData = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    if (!inventoryData.title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const ownerId = req.user.id;

    const newInventory = await inventoryService.createInventory(
      {...inventoryData, ownerId},
      ownerId
    );

    res.status(201).json({
      success: true,
      data: newInventory,
      message: 'Inventory created successfully'
    });
  } catch (error) {
    console.error('Error creating inventory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create inventory',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateInventory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const updatedInventory = await inventoryService.updateInventory(id, updateData);

    res.status(200).json({
      success: true,
      data: updatedInventory,
      message: 'Inventory updated successfully'
    });
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update inventory',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const deleteInventory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    await inventoryService.deleteInventory(id);

    res.status(200).json({
      success: true,
      message: 'Inventory deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting inventory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete inventory',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};