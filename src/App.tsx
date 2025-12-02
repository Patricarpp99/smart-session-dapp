import { useState } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { CONTRACT } from "./lib/contracts";
import "./index.css";

export default function App() {
  const [value, setValue] = useState("");

  const { data: stored } = useReadContract({
    ...CONTRACT,
    functionName: "get",
  });

  const { writeContract } = useWriteContract();

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">Smart Session dApp</h1>

      <div className="mt-6">
        <p className="text-gray-600">Stored value: {stored?.toString()}</p>
      </div>

      <input
        className="border p-2 mt-4 w-full"
        placeholder="Enter number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white p-2 rounded mt-4"
        onClick={() =>
          writeContract({
            ...CONTRACT,
            functionName: "store",
            args: [BigInt(value)],
          })
        }
      >
        Store via Smart Session
      </button>
    </div>
  );
}