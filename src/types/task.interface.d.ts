import { ICheckList } from "./checklist.interface";
import { IProject } from "./project.interface";
import { IUser } from "./user.interface";

export interface ITask {
  id: number;
  name: string;
  status: string;
  deadline: Date;
  assignees: {
    id: number;
    user: IUser;
  }[];
  assigneeId: number;
  createdBy: IUser;
  createdId: number;
  project: IProject;
  projectId: number;
  checklists: ICheckList[];
}

export interface ICreateTask {
  name: string;
  deadline: Date;
  projectId: number;
  assigneeIds: number[];
}


export interface IUpdateTask extends ICreateTask {
  status: string;
}
