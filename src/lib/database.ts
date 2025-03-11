
// Simple in-memory database simulation
interface User {
  username: string;
  password: string;
}

interface DataEntry {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
}

// Dummy users data
export const users: User[] = [
  { username: "admin", password: "admin123" },
];

// Dummy database entries
export let dataEntries: DataEntry[] = [
  {
    id: 1,
    name: "John Doe",
    company: "Tech Corp",
    phone: "123-456-7890",
    email: "john@techcorp.com"
  },
  {
    id: 2,
    name: "Jane Smith",
    company: "Digital Inc",
    phone: "098-765-4321",
    email: "jane@digital.com"
  }
];

export const standardColumns = {
  name: "Name",
  company: "Company",
  phone: "Phone",
  email: "Email"
};

export const addEntry = (entry: Omit<DataEntry, "id">) => {
  const newEntry = {
    id: dataEntries.length + 1,
    ...entry
  };
  dataEntries.push(newEntry);
  return newEntry;
};

