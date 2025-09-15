import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { getAirtableMachines, getAirtableSection } from "./services/api";

type Machine = "Machine 1" | "Machine 2" | "Machine 3";

import type { SectionRecord } from "./services/responseType";
import { AxiosError } from "axios";

const partData: Record<Machine, string[]> = {
  "Machine 1": ["Push button", "Gripper"],
  "Machine 2": ["Rotage", "Vacuum Sensor"],
  "Machine 3": ["Conveyor", "Camera"]
};

const machines: Machine[] = ["Machine 1", "Machine 2", "Machine 3"];

export default function SearchForm() {
  const [sections, setSections] = useState<SectionRecord[]>([]);
  const [selectedSection, setSelectedSection] = useState<SectionRecord | null>(null);

  const [selectedMachine, setSelectedMachine] = useState<Machine | "">("");
  const [selectedPart, setSelectedPart] = useState<string>("");

  const fetchSections = useCallback(async () => {
    try {
      const { records } = await getAirtableSection();
      setSections(records);
    } catch (error) {
      if (error instanceof AxiosError) console.log(error);
    }
  }, []);

  const fetchMachines = useCallback(async () => {
    try {
      const {} = await getAirtableMachines();
    } catch (error) {
      if (error instanceof AxiosError) console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSection && selectedMachine && selectedPart) {
      alert(`Searching for:\nSection: ${selectedSection}\nMachine: ${selectedMachine}\nPart: ${selectedPart}`);
    } else {
      alert("Please complete all selections!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">ฟอร์มเบิก</h2>

        {/* Section - Card Buttons */}
        <div className="mb-6">
          <p className="mb-2 text-gray-700 font-medium">เลือกเซคชั่น</p>
          <div className="grid grid-cols-4 gap-4">
            {sections.map((sec) => (
              <button
                type="button"
                key={sec.id}
                onClick={() => setSelectedSection(sec)}
                className={`rounded-xl p-4 shadow-md border transition ${
                  selectedSection === sec ? "bg-blue-600 text-white border-blue-700" : "bg-gray-50 hover:bg-gray-100 border-gray-300"
                }`}
              >
                {sec.fields.name}
              </button>
            ))}
          </div>
        </div>

        {/* Machine Dropdown */}
        <div className="mb-6">
          <label htmlFor="machine" className="block text-sm font-medium text-gray-700 mb-1">
            Select Machine
          </label>
          <select
            id="machine"
            value={selectedMachine}
            onChange={(e) => {
              setSelectedMachine(e.target.value as Machine);
              setSelectedPart("");
            }}
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 px-3 py-2"
            required
          >
            <option value="">-- Select Machine --</option>
            {machines.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Part Dropdown */}
        {selectedMachine && (
          <div className="mb-6">
            <label htmlFor="part" className="block text-sm font-medium text-gray-700 mb-1">
              Select Part
            </label>
            <select
              id="part"
              value={selectedPart}
              onChange={(e) => setSelectedPart(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 px-3 py-2"
              required
            >
              <option value="">-- Select Part --</option>
              {partData[selectedMachine].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
