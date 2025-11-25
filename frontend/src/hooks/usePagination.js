import { useState } from "react";

export default function usePagination(initialPage = 1, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const paginate = (items) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  };

  const getTotalPages = (totalItems) => Math.ceil(totalItems / itemsPerPage);

  const resetPage = () => setCurrentPage(1);

  return {
    currentPage,
    setCurrentPage,
    paginate,
    getTotalPages,
    resetPage,
    itemsPerPage
  };
}