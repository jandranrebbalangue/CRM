export interface ClientsProps {
  id: string,
  name: string,
  contact: number,
  avatar?: string,
  organization: string,
  assignedUser: string,
  status: string,
  createdBy: string,
}

export const USER_KEY = "CLIENT_USER"

export const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];
