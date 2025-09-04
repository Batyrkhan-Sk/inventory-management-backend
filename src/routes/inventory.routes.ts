import { Router } from 'express';
import * as inventoryController from '../controllers/inventory.controller';
import itemRoutes from './item.routes';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', inventoryController.getInventories);
router.get('/:id', inventoryController.getInventoryById);

router.post('/', authMiddleware, inventoryController.createInventory);
router.put('/:id', authMiddleware, inventoryController.updateInventory);
router.delete('/:id', authMiddleware, inventoryController.deleteInventory);

router.use('/:inventoryId/items', itemRoutes);

export default router;
