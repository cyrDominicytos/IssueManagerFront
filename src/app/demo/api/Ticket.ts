export interface Ticket {
    id:         number;
    title:      string;
    content:    string;
    state:      string;
    created_at: string;
    user:       User;
    tags:       Tag[];
   /*assignedSupports: Support[];*/
    assignedSupports: User[];
}

export interface Tag {
    id:              number;
    name:            string;
    textColor:       string;
    backgroundColor: string;
    created_at:      string;
}

export interface User {
    id:         number;
    name:       string;
    email:      string;
    role:       string;
    created_at: string;
}

export interface Support {
    id:         number;
    name:       string;
    email:      string;
    role:       string;
    created_at: string;
}