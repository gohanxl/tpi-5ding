import React from "react";
import { TableHeadComponent } from "./TableHead.component";
import { TableBodyComponent } from "./TableBody.component";
import { TableFootComponent } from "./TableFoot.component";

export const TableComponent = (props) => {
  const { headers, data } = props;
  return (
    <table className="table is-hoverable is-fullwidth">
      <TableHeadComponent headers={headers} />
      <TableFootComponent />
      <TableBodyComponent data={data} />
    </table>
  );
};
