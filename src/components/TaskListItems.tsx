import { TaskType } from "@/types";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

const TaskListItems = ({
  item,
  index,
  taskListLen,
  handleTaskCheck,
  handleTaskDelete,
}: {
  item: TaskType;
  index: number;
  taskListLen: number;
  handleTaskDelete: (value: number) => void;
  handleTaskCheck: (value: number) => void;
}) => {
  return (
    <li
      key={item.taskName}
      className={`flex items-center justify-between px-4 py-3 ${
        index !== taskListLen - 1 ? "border-b-2 border-gray-200" : ""
      }`}
    >
      <div className="flex items-center space-x-3">
        <Checkbox
          id={`item-${index}`}
          defaultChecked={item.selected}
          onCheckedChange={() => {
            handleTaskCheck(item.id);
          }}
        />
        <label
          htmlFor={`item-${index}`}
          className="text-sm font-medium leading-none"
        >
          {item.taskName}
        </label>
      </div>
      <Button
        variant="ghost"
        onClick={() => {
          handleTaskDelete(item.id);
        }}
        disabled={!item.selected}
        className={`p-2 h-auto ${item.selected && "bg-zinc-200"}`}
      >
        <X className="h-4 w-4" />
      </Button>
    </li>
  );
};

export default TaskListItems;
