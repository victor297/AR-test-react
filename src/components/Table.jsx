import { useState } from "react";
import Table from "react-bootstrap/Table";
import { MdCheck, MdDelete, MdEdit } from "react-icons/md";

function TableComp() {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  return (
    <Table striped bordered hover size="sm" className="mt-4">
      <thead>
        <tr>
          <th className="bg-secondary">#</th>
          <th className="bg-secondary">Shape</th>
          <th className="bg-secondary">Username</th>
          <th className="bg-secondary">Actions</th>
        </tr>
      </thead>
      <tbody>
        {[
          { id: 1, shape: "square", username: "victor" },
          { id: 2, shape: "circle", username: "salyan" },
          { id: 3, shape: "triangle", username: "grace" },
          { id: 4, shape: "square", username: "victor" },
          { id: 5, shape: "circle", username: "salyan" },
          { id: 6, shape: "triangle", username: "grace" },
        ].map((item, index) => (
          <tr key={index} onClick={() => handleRowClick(index)}>
            <td
              style={{
                backgroundColor: selectedRow === index ? "#d3d3d3" : "white",
              }}
            >
              {item.id}
            </td>
            <td
              style={{
                backgroundColor: selectedRow === index ? "#d3d3d3" : "white",
              }}
            >
              {item.shape}
            </td>
            <td
              style={{
                backgroundColor: selectedRow === index ? "#d3d3d3" : "white",
              }}
            >
              {item.username}
            </td>
            <td
              style={{
                backgroundColor: selectedRow === index ? "#d3d3d3" : "white",
              }}
              className="d-flex p-2 justify-content-between"
            >
              <MdCheck size={20} color="green" />
              <MdEdit size={20} color="orange" />
              <MdDelete size={20} color="red" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableComp;
