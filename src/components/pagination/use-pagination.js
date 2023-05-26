import {useMemo} from 'react';



function usePagination({totalCount, perPage, currentPage}) {

  const pageList = useMemo(() => {
    const pagesCount = Math.ceil(totalCount / perPage);
    const maxInRow = 5;
    const siblingCount = 1;
    const pages = [];

    if (pagesCount <= maxInRow) {
      for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
      }
      return pages
    }

    if (currentPage < maxInRow - 1) {
      for (let i = 1; i < maxInRow; i++) {
        pages.push(i);
      }
      pages.push('...', pagesCount);
      return pages;
    }

    if (currentPage > 3 && !(pagesCount - currentPage < 3)) {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pagesCount )
      return pages
    }

    if (pagesCount - currentPage < maxInRow) {
      pages.push(1, '...');
      for (let i = (pagesCount - 3); i <= pagesCount; i++) {
        pages.push(i);
      }
      return pages
    }

    return pages
  }, [totalCount, perPage, currentPage])
  return pageList;
}

export default usePagination;
