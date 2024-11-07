import { ManageType, TaskType, ViewType } from "@/types";
import { CircleUser, LayoutList, LayoutTemplate, PersonStanding, Users } from "lucide-react";

export const clientNames = [
    {
        id:1,
        name:"Client One",
    },
    {
        id:2,
        name:"Client Two",
    },
    {
        id:3,
        name:"Client Three",
    },
]

export const viewTypesList: ViewType[] = [
    {
      id:1,
      title: "List",
      icon: LayoutList,
    },
    {
      id:2,
      title: "Board",
      icon: LayoutTemplate,
    },
  ];

  export const whoManageProjectTypeList :ManageType[] = [
    {
      id:1,
      title: "Everyone",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit soluta eum enim quae architecto cum",
      icon: PersonStanding,
    },
    {
      id:2,
      title: "Only Admin's",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit soluta eum enim quae architecto cum",
      icon: CircleUser,
    },
    {
      id:3,
      title: "Only to Specific people",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit soluta eum enim quae architecto cum",
      icon: Users,
    },
  ];

 export const taskItemsList:TaskType[] = [
    {
      id: 123,
      selected:false,
      taskName: "Review team assignments",
    },
    {
      id:323,
      selected:false,
      taskName: "Schedule client meeting",
    },
  ];

  export const ID_KEY = "Unique_ID";