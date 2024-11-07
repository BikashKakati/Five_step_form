import { usePagination } from "@/context/PaginationContext";
import { Children, ReactNode } from "react";

type PaginationContainerPropType =  { children: ReactNode}
const PaginationContainer = ({ children}:PaginationContainerPropType) => {

  
  const {currentPage} = usePagination();
  const pages = Children.toArray(children);


  return (
    <div className="w-full min-h-[25rem] flex flex-col items-center justify-start">
      <div className="mb-6 flex-1 w-full flex flex-col">{pages[currentPage]}</div>
      <div className="w-full self-end">
        <div className="flex items-center justify-center">
          {pages.map((_, index: number) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full mx-1 transition-all duration-200 ${
                index === currentPage ? "bg-foreground/50 w-4" : "bg-gray-300"
              }`}
              aria-current={index === currentPage ? "page" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginationContainer;
