import { Request, Response, NextFunction } from 'express';

// Защита роутов
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const session = req.session as { userId?: string };
  if (!session || !session.userId) {
    return res.status(401).json({ message: 'Авторизуйтесь для доступа' });
  }
  next();
};

// Получение ID пользователя
export const getUserId = (req: Request): string | undefined => {
  const session = req.session as { userId?: string };
  return session?.userId;
};