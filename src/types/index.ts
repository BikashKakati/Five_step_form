import { LucideIcon } from "lucide-react";

export type PageHeaderPropType = {
    mainTitle:string,
    subTitle?:string
}

export type pagePropType = {
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    currentPage: number;
  };

export type ViewType = {
    id: number;
    title: string;
    icon: LucideIcon;
  };
export type ManageType = {
    id:number;
    title:string;
    description:string;
    icon:LucideIcon
}

export type TaskType = {
    id:number;
    taskName:string;
    selected:boolean;
}
