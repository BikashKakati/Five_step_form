import { usePagination } from "@/context/PaginationContext";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

const NextPrevButton = ({ formPart = true }: { formPart?: boolean }) => {
  const { goToNextPage, goToPreviousPage, currentPage, pages } =
    usePagination();
  return (
    <div className="flex items-center justify-start gap-[5rem] w-full">
      <Button
        type="button"
        variant="ghost"
        onClick={goToPreviousPage}
        disabled={currentPage === 0}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="ml-[1px]">Back</span>
      </Button>
      <Button
        disabled={pages === currentPage}
        type={formPart ? "submit" : "button"}
        className="w-fit px-8"
        onClick={formPart ? () => {} : goToNextPage}
      >
        <span className="">Next</span>
      </Button>
    </div>
  );
};

export default NextPrevButton;
