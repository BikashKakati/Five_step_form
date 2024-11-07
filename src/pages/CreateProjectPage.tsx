import NextPrevButton from "@/components/NextPrevButton";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { clientNames, ID_KEY } from "@/constant";
import { usePagination } from "@/context/PaginationContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { createProjectSchema, CreateProjectSchemaType } from "@/ZodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const CreateProjectPage = () => {
  const PROJECT_KEY = "Project_Details";

  const { goToNextPage } = usePagination();
  const { saveDataToStorage, getStoredData } = useLocalStorage();

  const [addClientActive, setAddClientActive] = useState(false);
  const [clientNameList, setClientNameList] = useState(clientNames);

  const clientRef = useRef<HTMLInputElement>(null!);

  const form = useForm<CreateProjectSchemaType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      projectName: "",
      client: "",
      notes: "",
    },
  });

  function onSubmit(values: CreateProjectSchemaType) {
    const existProjectsData = getStoredData(PROJECT_KEY);
    const _id = Date.now().toString();
    saveDataToStorage(ID_KEY, _id);

    if (existProjectsData) {
      const updatedProjectsData = [...existProjectsData, { ...values, _id }];
      saveDataToStorage(PROJECT_KEY, updatedProjectsData);
    } else {
      saveDataToStorage(PROJECT_KEY, [{ ...values, _id }]);
    }

    goToNextPage();
  }

  function handleAddNewClient() {
    setClientNameList((prev) => [
      ...prev,
      { id: Date.now(), name: clientRef.current.value},
    ]);
    clientRef.current.value = "";
  }

  return (
    <div className="w-full relative overflow-hidden">
      <PageHeader
        mainTitle="Create Project"
        subTitle="Don't panic you can also customize further"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 flex-1 px-1"
        >
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className={`flex absolute right-0 items-center gap-3 translate-x-full transition-transform duration-300 ${
              addClientActive && "!translate-x-0 !relative !right-auto"
            }`}
          >
            <Input placeholder="Add new client" ref={clientRef} />
            <Button type="button" onClick={handleAddNewClient}>
              Add
            </Button>
            <Button variant={"outline"} type="button" onClick={() => setAddClientActive(false)}>
              Hide
            </Button>
          </div>
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Client</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <div className="flex items-center">
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                      <span className="mx-3 text-foreground/70">or</span>
                      <Button
                        variant="outline"
                        type="button"
                        className=""
                        onClick={() => setAddClientActive(true)}
                      >
                        <Plus className="h-4 w-4" />
                        <span>New Client</span>
                      </Button>
                    </div>
                  </FormControl>
                  <SelectContent>
                    {clientNameList.map((client) => (
                      <SelectItem value={client.name} key={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center w-full justify-between">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[47%] h-[5.2rem]">
                  <FormLabel>Dates</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() ||
                          (form.watch("endDate") &&
                            date > form.watch("endDate"))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span>-</span>
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[47%] h-[5.2rem]">
                  <FormLabel className="invisible">Dates</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() ||
                          (form.watch("startDate") &&
                            date < form.watch("startDate"))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Optional"
                    className="h-[100px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <NextPrevButton />
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectPage;
