type PartCardProps = {
  name: string;
  description: string;
  picture?: string;
  code: string;
  stock: number;
  location: string;
  onWithdraw?: () => void;
};

function PartCard({ code, description, location, name, picture, stock, onWithdraw }: PartCardProps) {
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
          onClick={onWithdraw}
          disabled={stock <= 0}
          className="mt-3 w-full cursor-pointer rounded bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-400"
        >
          เบิก
        </button>
      </div>
    </div>
  );
}

export default PartCard;
