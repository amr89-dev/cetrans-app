export enum UserRole {
  ADMIN = "ADMIN",
  DRIVER = "DRIVER",
  CLIENT = "CLIENT",
  SUPPORT = "SUPPORT",
}

export enum VehicleType {
  SEDAN = "SEDAN",
  SUV = "SUV",
  VAN = "VAN",
  PICKUP = "PICKUP",
  MOTORCYCLE = "MOTORCYCLE",
}

export enum TripStatus {
  REQUESTED = "REQUESTED",
  AVAILABLE = "AVAILABLE",
  ASSIGNED = "ASSIGNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
}

export enum PaymentMethod {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
  TRANSFER = "TRANSFER",
  DIGITAL_WALLET = "DIGITAL_WALLET",
}

export enum ExpenseCategory {
  FUEL = "FUEL",
  MAINTENANCE = "MAINTENANCE",
  INSURANCE = "INSURANCE",
  PARKING = "PARKING",
  TOLLS = "TOLLS",
  OTHER = "OTHER",
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;

  phone?: string | null;
  nationalId?: string | null;
  role: UserRole;
  isComplete: boolean;

  createdAt?: Date;
  updatedAt?: Date;

  firstName?: string | null;
  lastName?: string | null;
  address?: Address[];
  birthDate?: Date | null;
  gender?: string | null;
  emergencyContact?: EmergencyContact[];
  isActive: boolean;
  isVerified?: boolean;
  rating?: number;
  totalRatings?: number;
  accounts?: Account[];
  sessions?: Session[];
  vehicles?: Vehicle[];
  tripsAsDriver?: Trip[];
  tripsAsClient?: Trip[];
  expenses?: Expense[];
  documents?: Document[];
  notifications?: Notification[];
  bankAccounts?: BankAccount[];
  ratings?: Rating[];
  givenRatings?: Rating[];
  payments?: Payment[];
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  user: User;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface Address {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  street: string;
  complement?: string | null;
  neighborhood?: string | null;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  userId?: string;
  user?: User;
}

export interface EmergencyContact {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  phone: string;
  name: string;
  userId?: string;
  user?: User;
}
export interface Vehicle {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: VehicleType;
  brand: string;
  model: string;
  year: number;
  plate: string;
  color: string;
  capacity: number;
  isActive: boolean;
  insurance?: string | null;
  technicalReview?: string | null;
  lastInspection?: Date | null;
  userId: string;
  user: User;
  trips?: Trip[];
  documents?: Document[];
}
export interface Trip {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  startAddress: string;
  endAddress: string;
  startLocationId: string;
  endLocationId: string;
  startLocation: Location;
  endLocation: Location;
  date: Date;
  status: TripStatus;
  notes?: string | null;
  distance?: number | null;
  duration?: number | null;
  baseAmount: number;
  taxAmount: number;
  totalAmount: number;
  commission: number;
  driverId?: string | null;
  driver?: User | null;
  clientId: string;
  client: User;
  vehicleId?: string | null;
  vehicle?: Vehicle | null;
  payment?: Payment | null;
  rating?: Rating | null;
}
export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  reference?: string | null;
  tripsAsStart?: Trip[];
  tripsAsEnd?: Trip[];
}
export interface Payment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string | null;
  tripId: string;
  trip: Trip;
  userId: string;
  user: User;
}
export interface Expense {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  amount: number;
  date: Date;
  category: ExpenseCategory;
  imageUrl?: string | null;
  notes?: string | null;
  userId: string;
  user: User;
}
export interface Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  number?: string | null;
  expiryDate?: Date | null;
  fileUrl: string;
  isVerified: boolean;
  verifiedAt?: Date | null;
  verifiedBy?: string | null;
  userId: string;
  user: User;
  vehicleId?: string | null;
  vehicle?: Vehicle | null;
}
export interface Rating {
  id: string;
  createdAt: Date;
  score: number;
  comment?: string | null;
  tripId: string;
  trip: Trip;
  userId: string;
  user: User;
  giverId: string;
  giver: User;
}
export interface Notification {
  id: string;
  createdAt: Date;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  readAt?: Date | null;
  userId: string;
  user: User;
}
export interface BankAccount {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  bankName: string;
  accountType: string;
  accountNumber: string;
  holderName: string;
  isDefault: boolean;
  isVerified: boolean;
  userId: string;
  user: User;
}

type UserInput = Omit<
  User,
  | "id"
  | "name"
  | "email"
  | "emailVerified"
  | "image"
  | "createdAt"
  | "updatedAt"
  | "accounts"
  | "sessions"
  | "vehicles"
  | "tripsAsDriver"
  | "tripsAsClient"
  | "expenses"
  | "documents"
  | "notifications"
  | "bankAccounts"
  | "ratings"
  | "givenRatings"
  | "payments"
  | "isComplete"
  | "isActive"
  | "isVerified"
  | "rating"
  | "totalRatings"
>;

export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface AddressSelectProps {
  onSelect: (address: string, lat: number, lng: number) => void;
}
