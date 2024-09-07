export interface Todo {
    firebaseId?: any;
    title: string;
    description: string;
    dueDate: Date;
    priority: string;
    status: string;
    notes: string;
    isOverDue?: boolean;
}
