// Library
import { useCallback, useState, type Dispatch, type SetStateAction } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "react-toastify";

// Component
import Modal from "../../components/Modal";
import { createAirtableStockTransaction } from "../../services/api";
import { AxiosError } from "axios";
import type { MasterItemRecord, SectionRecord } from "../../services/responseType";

type PartCardProps = {
  name: string;
  description: string;
  picture?: string;
  code: string;
  stock: number;
  location: string;
  selectedPart: string;
  selectedMachine: string;
  selectedSection: SectionRecord | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setPartDetail: Dispatch<SetStateAction<MasterItemRecord | null>>;
};

function PartCard({
  code,
  description,
  location,
  name,
  picture,
  stock,
  setIsLoading,
  selectedPart,
  selectedMachine,
  selectedSection,
  setPartDetail,
}: PartCardProps) {
  const [number, setNumber] = useState(1);

  const [modal, setModal] = useState(false);

  const handleCancel = () => {
    setNumber(1);
    setModal(false);
  };

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      if (selectedSection) {
        await createAirtableStockTransaction({
          item: [selectedPart],
          machines: [selectedMachine],
          quantity: number,
          status: "stock_out",
          createdDate: new Date().toISOString(),
          section: [selectedSection.id],
        });

        setPartDetail((prev) => {
          if (prev) prev.fields.stock -= number;
          return prev;
        });
      }
      setModal(false);
      toast.success("ทำรายการสำเร็จ");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("ทำรายการไม่สำเร็จ");
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, selectedMachine, selectedPart, number, selectedSection]);

  const min = 1;
  const max = stock;

  return (
    <div className="overflow-hidden">
      {/* รูปภาพ */}
      <div className="mx-auto flex min-h-52 w-full max-w-xs items-center justify-center rounded bg-gray-100 p-2">
        {picture ? (
          <img src={picture} alt={name} className="h-full w-full rounded object-contain" />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* เนื้อหา */}
      <div className="mt-4 space-y-2 rounded border p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        {description && <p className="text-sm text-gray-600">{description}</p>}

        <div className="flex justify-between text-sm">
          <span className="font-medium">รหัส:</span>
          <span>{code}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="font-medium">จำนวนคงเหลือ:</span>
          <span className={`font-semibold ${stock > 0 ? "text-green-600" : "text-red-500"}`}>{stock}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="font-medium">ตำแหน่ง:</span>
          <span>{location}</span>
        </div>

        {/* ปุ่มเบิก */}
        <button
          onClick={() => setModal(true)}
          disabled={stock <= 0}
          className="mt-3 w-full cursor-pointer rounded bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-400"
        >
          เบิก
        </button>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="เบิก">
        <div>
          <div className="grid grid-cols-4 gap-x-4">
            {/* ปุ่มลด */}
            <button
              disabled={number <= min}
              onClick={() => setNumber((prev) => prev - 1)}
              className="cursor-pointer rounded-lg bg-red-500 p-4 text-white hover:bg-red-600 disabled:bg-red-500/30"
            >
              <Minus className="mx-auto h-6 w-6" />
            </button>

            {/* จำนวน */}
            <input
              type="number"
              value={number}
              min={min}
              max={max}
              readOnly
              className="col-span-2 w-full rounded-lg border border-gray-300 p-4 py-1 text-center text-3xl font-bold shadow"
            />

            {/* ปุ่มเพิ่ม */}
            <button
              disabled={number >= max}
              onClick={() => setNumber((prev) => prev + 1)}
              className="cursor-pointer rounded-lg bg-blue-500 p-4 text-white hover:bg-blue-600 disabled:bg-blue-600/30"
            >
              <Plus className="mx-auto h-6 w-6" />
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4">
            <button
              onClick={handleSubmit}
              className="cursor-pointer rounded-xl bg-green-600 p-4 text-xl text-white hover:bg-green-700"
            >
              ตกลง
            </button>
            <button
              onClick={handleCancel}
              className="cursor-pointer rounded-xl bg-gray-200 p-4 text-xl hover:bg-gray-300"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PartCard;
