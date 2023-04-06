import { authOptions } from '@/config/auth';
import NextAuth from 'next-auth';

export default NextAuth(authOptions);
