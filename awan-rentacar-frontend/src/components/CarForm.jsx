import { useState } from 'react';

export default function CarForm({ onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(
    initialData || { registration_no: '', model: '', status: '', remarks: '' }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit Car' : 'Add Car'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="registration_no"
            placeholder="Registration No"
            value={form.registration_no}
            onChange={handleChange}
            disabled={!!initialData}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="remarks"
            placeholder="Remarks"
            value={form.remarks}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {initialData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
