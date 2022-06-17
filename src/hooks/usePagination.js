import { useState } from 'react';

export const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    // 始点
    const begin = (currentPage - 1) * itemsPerPage;
    // 終点
    const end = begin + itemsPerPage;
    // 切り取り
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
};
