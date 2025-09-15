import "./App.css";

function App() {
  return (
    <div>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Stock Request htmlForm</h2>
        <div>
          <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
            Section
          </label>
          <select
            id="section"
            name="section"
            required
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select Section --</option>
            <option value="Electrical">Electrical</option>
            <option value="Robot">Robot</option>
            <option value="Mechanics">Mechanics</option>
          </select>
        </div>

        <div>
          <label htmlFor="machine" className="block text-sm font-medium text-gray-700 mb-1">
            Machine
          </label>
          <select
            id="machine"
            name="machine"
            required
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select Machine --</option>
            <option value="Machine 1">Machine 1</option>
            <option value="Machine 2">Machine 2</option>
            <option value="Machine 3">Machine 3</option>
          </select>
        </div>

        <div>
          <label htmlFor="item" className="block text-sm font-medium text-gray-700 mb-1">
            Item
          </label>
          <select id="item" name="item" required className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">-- Select Item --</option>
            <option value="Push button">Push button</option>
            <option value="Gripper">Gripper</option>
            <option value="Rotage">Rotage</option>
            <option value="Vacuum Sensor">Vacuum Sensor</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            required
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Stock_out" selected>
              Stock_out
            </option>
            <option value="Stock_in">Stock_in</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            required
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
          />
        </div>

        <div className="md:col-span-2 flex justify-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
