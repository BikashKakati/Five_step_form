import { X } from "lucide-react";
import PaginationContainer from "./components/PaginationContainer";
import { Button } from "./components/ui/button";
import CreateProjectPage from "./pages/CreateProjectPage";
import ManageProjectPage from "./pages/ManageProjectPage";
import SelectViewPage from "./pages/SelectViewPage";
import TasksPage from "./pages/TasksPage";

const App = () => {
  return (
    <main className="max-w-[30rem] bg-background w-full mx-auto pb-6 pt-10 px-8 rounded-xl shadow-even relative">
      <Button variant="ghost" size={"icon"} className="absolute top-2 right-2"><X className="h-4 w-4"/></Button>
      <PaginationContainer >
        <CreateProjectPage
        />
        <SelectViewPage
        />
        <ManageProjectPage/>
        <TasksPage/>
      </PaginationContainer>
    </main>
  );
};

export default App;
