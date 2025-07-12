export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  category: 'Marketing' | 'Technical' | 'Support' | 'Administration';
  status: 'In Progress' | 'Postponed' | 'Completed';
  dueDate: string;
  assignedTo: User;
  assignedBy: User;
  completedBy?: User;
  completedAt?: string;
  attachments: Attachment[];
  comments: Comment[];
  createdAt: string;
}

export interface Attachment {
  filename: string;
  originalName: string;
  path: string;
  uploadedAt: string;
}

export interface Comment {
  _id: string;
  user: User;
  text: string;
  createdAt: string;
}

export interface TaskStats {
  'In Progress': number;
  'Postponed': number;
  'Completed': number;
  'Overdue': number;
}