// Library
import { useCallback, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

// Component
import Spinner from "../../components/Spinner";

// Service
import {
  getAirtableMachines,
  getAirtableMasterItemById,
  getAirtableMasterItems,
  getAirtableSection,
} from "../../services/api";

// Type
import type { SectionRecord, MachineRecord, MasterItemsRecord, MasterItemRecord } from "../../services/responseType";
import { AxiosError } from "axios";
import PartCard from "./PartCard";

function Issue() {
  const [sections, setSections] = useState<SectionRecord[]>([]);
  const [selectedSection, setSelectedSection] = useState<SectionRecord | null>(null);

  const [machines, setMachines] = useState<MachineRecord[]>([]);
  const [selectedMachine, setSelectedMachine] = useState("");

  const [parts, setParts] = useState<MasterItemsRecord[]>([]);
  const [selectedPart, setSelectedPart] = useState("");

  const [partDetail, setPartDetail] = useState<MasterItemRecord | null>(null);

  const fetchSections = useCallback(async () => {
    const { records } = await getAirtableSection();
    setSections(records);
  }, []);

  const fetchMachines = useCallback(async () => {
    const { records } = await getAirtableMachines();
    setMachines(records);
  }, []);

  const fetchMasterItems = useCallback(async () => {
    const { records } = await getAirtableMasterItems();
    setParts(records);
  }, []);

  const fetchPartById = useCallback(async () => {
    try {
      setPartDetail(null);
      const data = await getAirtableMasterItemById(selectedPart);
      setPartDetail(data);
    } catch (error) {
      if (error instanceof AxiosError) console.log(error);
    }
  }, [selectedPart]);

  const fetchAll = useCallback(async () => {
    try {
      await Promise.all([fetchSections(), fetchMachines(), fetchMasterItems()]);
    } catch (error) {
      if (error instanceof AxiosError) console.log(error);
    }
  }, [fetchMachines, fetchSections, fetchMasterItems]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    setSelectedMachine("");
  }, [selectedSection]);

  useEffect(() => {
    setSelectedPart("");
  }, [selectedMachine]);

  useEffect(() => {
    if (selectedPart) fetchPartById();
    else setPartDetail(null);
  }, [fetchPartById, selectedPart]);

  const isReady = useMemo(() => sections.length !== 0, [sections]);
  const filteredMachines = useMemo(
    () =>
      machines.filter((mc) => {
        if (selectedSection && mc.fields.section.includes(selectedSection.id)) return mc;
      }),
    [selectedSection, machines],
  );

  const filteredParts = useMemo(
    () =>
      parts.filter((part) => {
        if (selectedMachine && part.fields.machine.includes(selectedMachine)) return part;
      }),
    [parts, selectedMachine],
  );

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-4 shadow-lg">
      <h2 className="text-center text-3xl font-bold text-blue-600">ฟอร์มเบิก</h2>

      {/* Section - Card Buttons */}
      {isReady ? (
        <div
          className={twMerge("mt-4 rounded-xl p-4", selectedSection ? "border-2 border-blue-500 bg-blue-500/10" : "")}
        >
          <p className="mb-2 font-medium text-gray-700">หน่วยงาน (Section)</p>
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
        </div>
      ) : (
        <Spinner text="กำลังโหลด" />
      )}

      {/* Machine Dropdown */}
      <div
        className={twMerge(
          "rounded-xl p-4 transition-all duration-150",
          selectedSection ? "mt-4 h-auto opacity-100" : "h-0 opacity-0",
          selectedMachine ? "border-2 border-blue-500 bg-blue-500/10" : "",
        )}
      >
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
          className={twMerge(
            "w-full rounded-lg border px-4 py-2 shadow-md outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:text-gray-400",
            selectedMachine ? "border-blue-700 bg-blue-600 text-white" : "border-gray-300",
          )}
          required
          disabled={machines.length === 0}
        >
          <option value="" className="hidden">
            กรุณาระบุเครื่องจักร
          </option>
          {filteredMachines.map((m) => (
            <option key={m.id} value={m.id} className="bg-white text-black">
              {m.fields.name}
            </option>
          ))}
        </select>
      </div>

      {/* Part Dropdown */}
      <div
        className={twMerge(
          "rounded-xl p-4 transition-all duration-150",
          selectedMachine ? "mt-4 h-auto opacity-100" : "h-0 opacity-0",
          selectedPart ? "border-2 border-blue-500 bg-blue-500/10" : "",
        )}
      >
        <label htmlFor="part" className="b-2 block font-medium text-gray-700">
          ชิ้นส่วน/อะไหล่
        </label>
        <select
          id="part"
          value={selectedPart}
          onChange={(e) => setSelectedPart(e.target.value)}
          className={twMerge(
            "w-full rounded-lg border px-4 py-2 shadow-md outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:text-gray-400",
            selectedPart ? "border-blue-700 bg-blue-600 text-white" : "border-gray-300",
          )}
          required
          disabled={parts.length === 0}
        >
          <option value="" className="hidden">
            กรุณาระบุชิ้นส่วน/อะไหล่
          </option>
          {filteredParts.map((p) => (
            <option key={p.id} value={p.id} className="bg-white text-black">
              {p.fields.name}
            </option>
          ))}
        </select>
      </div>

      {selectedPart &&
        (partDetail ? (
          <div className="mt-4">
            <PartCard
              key={partDetail.id}
              code={partDetail.fields.code}
              description={partDetail.fields.description}
              name={partDetail.fields.name}
              location={partDetail.fields.location}
              picture={partDetail.fields.picture && partDetail.fields.picture[0].url}
              stock={partDetail.fields.stock}
            />
          </div>
        ) : (
          <div className="mt-4">
            <Spinner text="กำลังโหลดข้อมูล" />
          </div>
        ))}
    </div>
  );
}
export default Issue;
