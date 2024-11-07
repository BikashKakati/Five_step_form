import React, { createContext, useContext, useState, ReactNode } from "react";

interface PaginationContextType {
  currentPage: number;
  pages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined
);

export const usePagination = (): PaginationContextType => {
    const context = useContext(PaginationContext);
    if (!context) {
      throw new Error('usePagination must be used within a PaginationProvider');
    }
    return context;
  };
  

export const PaginationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = 3;

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <PaginationContext.Provider
      value={{ currentPage, pages, goToNextPage, goToPreviousPage }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
