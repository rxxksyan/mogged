import { Router } from 'express';
import { 
  getCart, 
  addItemToCart, 
  updateItemQuantity, 
  removeItemFromCart, 
  clearUserCart,
  getCartItemCount 
} from '../controllers/controller_cart';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Получить корзину (только для авторизованных)
router.get('/', requireAuth, getCart);

// Получить количество товаров в корзине
router.get('/count', getCartItemCount);

// Добавить товар в корзину (только для авторизованных)
router.post('/', requireAuth, addItemToCart);

// Изменить количество товара (только для авторизованных)
router.put('/', requireAuth, updateItemQuantity);

// Удалить товар из корзины (только для авторизованных)
router.delete('/:productId', requireAuth, removeItemFromCart);

// Очистить корзину (только для авторизованных)
router.delete('/', requireAuth, clearUserCart);

export default router;