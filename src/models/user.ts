interface User {
  id: string;
  email: string;
  username: string;
  passwordHash?: string;
  googleId?: string;
  linkedinId?: string;
  role: 'USER' | 'ADMIN';
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
