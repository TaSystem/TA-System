import React from "react";
import { useTable, usePagination } from "react-table";
import Axios from "../config/Axios";

export default function Table({ columns, data,del }) {
  // Use the state and functions returned from useTable to build your UI

  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );
  

  // Render the UI for your table
  return (
    <>
      <pre>
        <code hidden>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <table
        {...getTableProps()}
        className="table table-hover table-bordered"
        cellSpacing="0"
        style={{ textAlign: "center" }}
      >
        <thead
          style={{
            position: "sticky",
            top: 0,
            background: "#7a0117",
            color: "#fff",
            fontWeight: "400",
          }}
        >
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              <th>#</th>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={index}>{column.render("Header")} </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            // console.log("i:", row.original.id);
            return (
              <tr {...row.getRowProps()} key={i}>
                <td>
                  {i + 1}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm("ยืนยันการลบบุคลากร")) del(row.original.id);
                    }}
                  >
                    ลบ
                  </button>
                </td>
                {row.cells.map((cell, id) => {
                  return (
                    <td {...cell.getCellProps()} key={index}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
      <div className="pagination">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="page-link"
        >
          {"<<"}
        </button>{" "}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="page-link"
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="page-link"
        >
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="page-link"
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
