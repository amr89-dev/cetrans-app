export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  image: string;
  phone?: string;
  nationalId?: string;
  role?: string;
  isComplete: boolean;
}
