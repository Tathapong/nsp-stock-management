// Library
import React, { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

// Component
import Spinner from "../components/Spinner";

// Service
import { getAirtableMachines, getAirtableSection } from "../services/api";

// Type
import type { SectionRecord, MachineRecord } from "../services/responseType";
import { AxiosError } from "axios";

function Issue() {
  const [sections, setSections] = useState<SectionRecord[]>([]);
  const [selectedSection, setSelectedSection] = useState<SectionRecord | null>(null);

  const [machines, setMachines] = useState<MachineRecord[]>([]);
  const [selectedMachine, setSelectedMachine] = useState("");

  const [parts, setParts] = useState([]);
  console.log(setParts);
  const [selectedPart, setSelectedPart] = useState<string>("");

  const fetchSections = useCallback(async () => {
    try {
      const { records } = await getAirtableSection();
      setSections(records);
      if (records.length !== 0) setSelectedSection(records[0]);
    } catch (error) {
      if (error instanceof AxiosError) console.log(error);
    }
  }, []);

  const fetchMachines = useCallback(async () => {
    try {
      const { records } = await getAirtableMachines(selectedSection?.fields.name);
      setMachines(records);
    } catch (error) {
      if (error instanceof AxiosError) console.log(error);
    }
  }, [selectedSection]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  useEffect(() => {
    if (selectedSection) {
      setSelectedMachine("");
      fetchMachines();
    }
  }, [selectedSection, fetchMachines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSection && selectedMachine && selectedPart) {
      alert(`Searching for:\nSection: ${selectedSection}\nMachine: ${selectedMachine}\nPart: ${selectedPart}`);
    } else {
      alert("Please complete all selections!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-4 shadow-lg md:p-6">
      <h2 className="mb-6 text-center text-3xl font-bold text-blue-600">ฟอร์มเบิก</h2>

      {/* Section - Card Buttons */}
      <div className="mb-6">
        <p className="mb-2 font-medium text-gray-700">หน่วยงาน (Section)</p>
        {sections.length === 0 ? (
          <Spinner text="กำลังโหลด" />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {sections.map((sec) => (
              <button
                type="button"
                key={sec.id}
                onClick={() => setSelectedSection(sec)}
                className={twMerge(
                  "cursor-pointer rounded-xl border px-2 py-4 shadow-md transition",
                  selectedSection === sec
                    ? "border-blue-700 bg-blue-600 text-white"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100",
                )}
              >
                {sec.fields.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Machine Dropdown */}
      {selectedSection && (
        <div className="mb-6">
          <label htmlFor="machine" className="mb-2 block font-medium text-gray-700">
            เครื่องจักร
          </label>
          <select
            id="machine"
            value={selectedMachine}
            onChange={(e) => {
              setSelectedMachine(e.target.value);
              setSelectedPart("");
            }}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-md outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:text-gray-400"
            required
            disabled={machines.length === 0}
          >
            <option value="" className="hidden">
              กรุณาระบุเครื่องจักร
            </option>
            {machines.map((m) => (
              <option key={m.id} value={m.fields.name}>
                {m.fields.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Part Dropdown */}
      {selectedMachine && (
        <div className="mb-6">
          <label htmlFor="part" className="b-2 block font-medium text-gray-700">
            ชิ้นส่วน/อะไหล่
          </label>
          <select
            id="part"
            value={selectedPart}
            onChange={(e) => setSelectedPart(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-md outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:text-gray-400"
            required
            disabled={parts.length === 0}
          >
            <option value="" className="hidden">
              กรุณาระบุชิ้นส่วน/อะไหล่
            </option>
            {/* {partData[selectedMachine].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))} */}
          </select>
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition hover:bg-blue-700"
        >
          ตรวจสอบ
        </button>
      </div>
    </form>
  );
}
export default Issue;
