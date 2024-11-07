import NextPrevButton from "@/components/NextPrevButton";
import PageHeader from "@/components/PageHeader";
import TaskListItems from "@/components/TaskListItems";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ID_KEY, taskItemsList } from "@/constant";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { taskSchema, TaskSchemaType } from "@/ZodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const TasksPage = () => {
  const TASK_KEY = "Task_Details";
  const [taskList, setTaskList] = useState(taskItemsList);
  const { saveDataToStorage, getStoredData } = useLocalStorage();
  const storedId = getStoredData(ID_KEY);

  useEffect(() => {
    saveDataToStorage(TASK_KEY, taskList);
  }, [taskList]);

  const form = useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskName: "",
    },
  });

  function handleTaskSubmit(value: TaskSchemaType) {
    setTaskList((prev) => [
      ...prev,
      {
        id: Date.now(),
        taskName: value.taskName,
        selected: false,
        _id: storedId,
      },
    ]);
    form.reset();
  }

  function handleTaskCheck(taskId: number) {
    const updatedList = taskList.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          selected: !task.selected,
        };
      } else {
        return task;
      }
    });
    setTaskList(updatedList);
  }
  function handleTaskDelete(taskId: number) {
    const filterList = taskList.filter((task) => task.id !== taskId);
    setTaskList(filterList);
  }
  return (
    <div className="flex-1 flex flex-col items-center justify-start">
      <PageHeader mainTitle="Tasks" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleTaskSubmit)}
          className="space-y-5 w-full flex-1"
        >
          <FormField
            control={form.control}
            name="taskName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Task Name</FormLabel>
                <FormControl className="w-full">
                  <div className="w-full flex items-center gap-5">
                    <Input placeholder="Enter task name here" {...field} />
                    <Button type="submit" className="px-8">
                      Add
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ScrollArea className="h-[18rem]">
            <ul className="w-full mx-auto rounded-lg overflow-y-auto">
              {taskList.map((item, index) => (
                <TaskListItems
                key={item.id}
                  taskListLen={taskList.length}
                  item={item}
                  index={index}
                  handleTaskCheck={handleTaskCheck}
                  handleTaskDelete={handleTaskDelete}
                />
              ))}
            </ul>
          </ScrollArea>
          <NextPrevButton formPart={false} />
        </form>
      </Form>
    </div>
  );
};

export default TasksPage;
