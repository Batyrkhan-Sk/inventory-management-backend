import express from 'express';
import cors from 'cors';
import passport from './auth/google';
import inventoryRoutes from './routes/inventory.routes';
import authRoutes from './routes/auth';

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/api/inventories', inventoryRoutes);

export default app;