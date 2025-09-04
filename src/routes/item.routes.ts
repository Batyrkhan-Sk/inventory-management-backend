import { Router } from 'express';
import * as itemController from '../controllers/item.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router({ mergeParams: true });

router.post('/', authMiddleware, itemController.createItem);

router.get('/', itemController.getItemsByInventoryId);

router.put('/:itemId', authMiddleware, itemController.updateItem);

router.delete('/:itemId', authMiddleware, itemController.deleteItem);

export default router;