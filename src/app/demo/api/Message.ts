import { User } from "./Ticket";

export interface Message {
    id:         number;
    content:    string;
    ticketId:   number;
    user:       User;
    created_at: string;
}
