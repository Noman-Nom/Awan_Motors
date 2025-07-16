export default function CarTable({ cars, onEdit, onDelete }) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">#</th>
          <th className="p-2 border">Registration No</th>
          <th className="p-2 border">Model</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Remarks</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car, index) => (
          <tr key={car.registration_no}>
            <td className="p-2 border">{index + 1}</td>
            <td className="p-2 border">{car.registration_no}</td>
            <td className="p-2 border">{car.model}</td>
            <td className="p-2 border">{car.status}</td>
            <td className="p-2 border">{car.remarks}</td>
            <td className="p-2 border">
              <button
                onClick={() => onEdit(car)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(car.registration_no)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
