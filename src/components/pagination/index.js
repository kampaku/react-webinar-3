import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import usePagination from "./use-pagination";
import "./style.css";

function Pagination({ totalCount, perPage, currentPage, onChangePage }) {
  const cn = bem("Pagination");
  const pageList = usePagination({ totalCount, perPage, currentPage });

  return (
    <div className={cn()}>
      {pageList.map((page) => {
        if (page === "...") {
          return <span key={page + Math.random()}>{page}</span>;
        }
        return (
          <button
            key={page}
            className={cn("button", { active: currentPage === page })}
            onClick={() => onChangePage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

Pagination.propTypes = {
  totalCount: PropTypes.number,
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  onChangePage: PropTypes.func
}

export default memo(Pagination);
