// Carrier types
export interface Carrier {
  id: number;
  name: string;
  code: number;
}

// Phone types
export interface Phone {
  id: number;
  number: string;
  carrierId: number;
  name: string;
  description: string;
  document: string;
}

export interface CreatePhoneData {
  number: string;
  carrierId: number;
  name: string;
  description: string;
  document: string;
}

export interface PhoneWithCarrier extends Omit<Phone, 'carrierId'> {
  carrier: Carrier;
  recharges?: Recharge[];
}

// Recharge types
export interface Recharge {
  id: number;
  phoneId: number;
  amount: number;
  timestamp: string;
}

export interface CreateRechargeData {
  phoneId: number;
  amount: number;
}

// Summary types
export interface Summary {
  document: string;
  phones: PhoneWithCarrier[];
}

// Database connection type
export interface DatabaseConfig {
  connectionString: string;
} 