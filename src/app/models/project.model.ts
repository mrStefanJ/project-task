export interface Project {
    item: Project;
    id: number;
    name: string;
    date: string;
    taskList: number[];
}


export interface Task {
    id: number;
    taskName: string;
    taskDescription: string;
    date: string;
    estimate: string;
}