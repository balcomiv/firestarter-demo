export interface Board {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
  uid?: string; //  Fix Me -- Tutorial doesn't have this, but sends it in updates...
}

export interface Task {
  description?: string;
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}
