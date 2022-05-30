import { ID } from "@datorama/akita";

export class Notification {
    _id: ID;
    message: string;
    user: string;
    room: string;
    date: Date;
    read: boolean;

    constructor(message: string, user: string, room: string, date: Date, id: number) {
        this._id = id;
        this.message = message;
        this.user = user;
        this.room = room;
        this.date = date;
        this.read = false;
    }
}
