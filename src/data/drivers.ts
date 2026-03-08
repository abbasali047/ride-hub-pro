export interface Driver {
  name: string;
  rating: number;
  trips: number;
  car: string;
  plate: string;
  safetyScore: number;
  avatar: string;
}

export const drivers: Driver[] = [
  { name: "Ramesh Sharma", rating: 4.92, trips: 3847, car: "Maruti Suzuki Dzire", plate: "RJ 14 AB 1234", safetyScore: 98, avatar: "👨‍✈️" },
  { name: "Kaif Khan", rating: 4.85, trips: 2156, car: "Hyundai Aura", plate: "RJ 14 CD 5678", safetyScore: 96, avatar: "🧔" },
  { name: "Suraj Kashyap", rating: 4.78, trips: 1580, car: "Toyota Etios", plate: "RJ 14 EF 9012", safetyScore: 94, avatar: "👨" },
  { name: "Harish Sain", rating: 4.90, trips: 4210, car: "Honda Amaze", plate: "RJ 14 GH 3456", safetyScore: 97, avatar: "👴" },
  { name: "Vikram Singh", rating: 4.88, trips: 2934, car: "Tata Tigor", plate: "RJ 14 IJ 7890", safetyScore: 95, avatar: "🧑" },
  { name: "Deepak Meena", rating: 4.81, trips: 1920, car: "Maruti Suzuki Ertiga", plate: "RJ 14 KL 2345", safetyScore: 93, avatar: "👨‍🦱" },
  { name: "Ajay Yadav", rating: 4.95, trips: 5102, car: "Hyundai Xcent", plate: "RJ 14 MN 6789", safetyScore: 99, avatar: "👷" },
  { name: "Manish Gurjar", rating: 4.73, trips: 1340, car: "Maruti Suzuki Ciaz", plate: "RJ 14 OP 0123", safetyScore: 92, avatar: "🧑‍🦰" },
  { name: "Rohit Patel", rating: 4.87, trips: 2780, car: "Tata Zest", plate: "RJ 14 QR 4567", safetyScore: 96, avatar: "👨‍💼" },
  { name: "Pramod Joshi", rating: 4.82, trips: 2050, car: "Honda City", plate: "RJ 14 ST 8901", safetyScore: 94, avatar: "🧓" },
];

export const getRandomDriver = (): Driver => {
  return drivers[Math.floor(Math.random() * drivers.length)];
};
