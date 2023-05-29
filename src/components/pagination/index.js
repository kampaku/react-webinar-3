import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import createPageList from "./create-pages";
import "./style.css";

function Pagination({ currentPage, onChangePage, pagesCount }) {
  const cn = bem("Pagination");
  const pageList = createPageList({ currentPage, pagesCount });

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
  pagesCount: PropTypes.number,
  currentPage: PropTypes.number,
  onChangePage: PropTypes.func
}

Pagination.defaultProps = {
  pagesCount: 1,
  currentPage: 1,
  onChangePage: () => {}
}

export default memo(Pagination);
