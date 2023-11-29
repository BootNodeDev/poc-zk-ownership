"use client";

import {
  BarretenbergBackend,
  CompiledCircuit,
  ProofData,
} from "@noir-lang/backend_barretenberg";
import { InputMap, Noir } from "@noir-lang/noir_js";
import circuit from "./circuit/zkNft.json";
import { useState } from "react";

const backend = new BarretenbergBackend(circuit as CompiledCircuit);
const noir = new Noir(circuit as CompiledCircuit, backend);

const emptyProof: ProofData = {
  publicInputs: new Map<number, string>(),
  proof: new Uint8Array(),
};

const emptyInput: InputMap = {};

export default function Home() {
  const [input, setInput] = useState(emptyInput);
  const [proof, setProof] = useState(emptyProof);

  const generateProof = async () => {
    const proof = await noir.generateFinalProof(input);
    setProof(proof);
    console.log(proof);
  };

  const verifyProof = async () => {
    const verification = await noir.verifyFinalProof(proof);
    console.log(verification);
  };

  const processInput = (input: string): InputMap => {
    try {
      const parsed = JSON.parse(input);
      console.log("parsed", parsed);
      return parsed;
    } catch (e) {
      console.log(e);
      return emptyInput;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <textarea onChange={(e) => setInput(processInput(e.target.value))} />
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <button onClick={generateProof}>Generate Proof</button>
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <button onClick={verifyProof}>Verify Proof</button>
        </div>
      </div>
    </main>
  );
}
