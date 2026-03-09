import express from 'express';
import session from 'express-session';
import path from 'path';
import authRoutes from './routes/auth';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

const app = express();
const PORT = 3000;

// Логирование всех запросов для отладки
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройка сессии с правильными параметрами
app.use(session({
  secret: 'your-secret-key-wot-shop-2026',
  resave: true, // Изменено на true
  saveUninitialized: true, // Изменено на true
  cookie: { 
    secure: false, 
    maxAge: 10 * 60 * 1000, // 10 минут по ТЗ
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// ========== API РОУТЫ (до static файлов!) ==========
app.use('/api/auth', authRoutes);

import catalogRoutes from './routes/route_catalog';
import cartRoutes from './routes/route_cart';
import deliveryRoutes from './routes/route_delivery';

app.use('/api/catalog', catalogRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/delivery', deliveryRoutes);

// Статические файлы
app.use(express.static(path.join(__dirname, '../public')));

// SPA - все остальные роуты ведут на index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});