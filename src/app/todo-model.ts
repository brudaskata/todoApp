export interface Todo {
    firebaseId?: any;
    title: string;
    description: string;

    // refact in a way that duesDate is a boolean, the calculation of the dueDate is done in the backend
    // rename duesDate to isDueDateOver
    dueDate: Date;
    priority: string;
    status: string;
    notes: string;
    isOverDue?: boolean;
}
