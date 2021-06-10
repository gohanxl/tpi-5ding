import React from "react";

export const TableHeadComponent = (props) => {
  const { headers } = props;

  return (
    <thead>
      <tr>
        {headers.map((th) => (
          <th key={th}>{th}</th>
        ))}
      </tr>
    </thead>
  );
};
