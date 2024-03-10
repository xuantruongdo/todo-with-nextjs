import { ITask } from "./task.interface";

export interface ICheckList {
    id: number;
    title: string;
    checked: boolean;
    task: ITask;
    taskId: number;
}
