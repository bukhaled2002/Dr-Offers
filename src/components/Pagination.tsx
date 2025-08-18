import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  totalPages?: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages = 5 }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const isArabic = i18n.language === "ar";
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", page.toString());
      navigate({ search: newParams.toString() });
    }
  };

  const renderPageNumbers = (): React.ReactNode[] => {
    const pages: React.ReactNode[] = [];
    const showPages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <Button
          key={1}
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(1)}
          className="w-8 h-8 p-0 text-gray-600 hover:bg-gray-100"
        >
          1
        </Button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-2 text-gray-400">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "ghost"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className={`w-8 h-8 p-0 ${
            i === currentPage
              ? "bg-primary text-white hover:bg-primary"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-2 text-gray-400">
            ...
          </span>
        );
      }

      pages.push(
        <Button
          key={totalPages}
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          className="w-8 h-8 p-0 text-gray-600 hover:bg-gray-100"
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <div
      className={`flex items-center justify-center mt-8 ${
        isArabic ? "flex-row space-x-reverse space-x-1" : "space-x-1"
      }`}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          handlePageChange(isArabic ? currentPage + 1 : currentPage - 1)
        }
        disabled={isArabic ? currentPage === totalPages : currentPage === 1}
        className="w-8 h-8 p-0 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isArabic ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </Button>

      {renderPageNumbers()}

      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          handlePageChange(isArabic ? currentPage - 1 : currentPage + 1)
        }
        disabled={isArabic ? currentPage === 1 : currentPage === totalPages}
        className="w-8 h-8 p-0 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isArabic ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </Button>
    </div>
  );
};

export default Pagination;
