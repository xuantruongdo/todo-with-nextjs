import { ITask } from "./task.interface";

export interface ICheckList {
    id: number;
    title: string;
    checked: boolean;
    task: ITask;
    taskId: number;
}

export interface ICreateCheckList {
    title: string;
    taskId: number;
}


export interface IUpdateCheckList {
    title: string;
    checked: boolean;
}
