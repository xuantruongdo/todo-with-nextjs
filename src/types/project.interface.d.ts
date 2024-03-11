import { ITask } from "./task.interface";
import { IUser } from "./user.interface";

export interface IProject {
    id: number;
    name: string;
    tasks: ITask[],
    createdBy: IUser;
    createdAt: Date
}

export interface ICreateProject{
    name: string;
}