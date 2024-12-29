import React from 'react'

function CircleList() {

    const circles = [];
  return (
    <div className="col-md-6">
    <h2>List of Circles</h2>
    <table className="table table-hover table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {circles.map((circle) => (
          <tr key={circle.id}>
            <th scope="row">{circle.id}</th>
            <td>{circle.name}</td>
            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(circle.id)}
              >
                <i className="bi bi-pencil-square"></i>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(circle.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default CircleList