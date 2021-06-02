import React from "react";

export const TableBodyComponent = (props) => {
  const { data } = props;

  return (
    <tbody>
      {data.map((row) => (
        <tr key={row}>
          {row.map((col) => (
            <td key={col}>{col}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
