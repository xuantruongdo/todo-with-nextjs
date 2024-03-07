import { IAssignee } from "./assignee.interface";

export interface ITodo {
  id: number;
  name: string;
  status: string;
  deadline: Date;
  assignee: IAssignee;
  assigneeId: number;
}