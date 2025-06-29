import React from "react";

const ChildInfoInputs = ({ formData, handleChildNoChange }) => {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700" htmlFor="childNo">
          Child No
        </label>
        <input
          type="text"
          id="childNo"
          name="childNo"
          placeholder="Child No."
          value={formData.childNo}
          onChange={handleChildNoChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700" htmlFor="age">
          Age
        </label>
        <input
          type="text"
          id="age"
          name="age"
          placeholder="Age"
          value={formData.age}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700" htmlFor="gender">
          Gender
        </label>
        <input
          type="text"
          id="gender"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />
      </div>
    </div>
  );
};

export default ChildInfoInputs;
