import React, { useState } from 'react';
import { CopyIcon, CheckIcon, ZapIcon } from 'lucide-react';
interface StratumInstructionsProps {
  stratumUrl: string;
  workerName: string;
  progress: number;
}
export const StratumInstructions = ({
  stratumUrl,
  workerName,
  progress
}: StratumInstructionsProps) => {
  const [copiedStratum, setCopiedStratum] = useState(false);
  const [copiedWorker, setCopiedWorker] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const copyToClipboard = (text: string, setStateFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setStateFn(true);
    setTimeout(() => setStateFn(false), 2000);
  };
  const minerConfig = `{
  "url": "${stratumUrl}",
  "user": "${workerName}",
  "pass": "x"
}`;
  return <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 md:p-6 shadow-sm">
      <div className="flex items-center mb-5">
        <ZapIcon size={24} className="text-blue-600 mr-3" />
        <h3 className="text-lg font-medium">Mining Instructions</h3>
      </div>
      {progress >= 100 ? <div className="text-center py-8 px-4 bg-green-50 rounded-lg">
          <CheckIcon size={48} className="mx-auto text-green-500 mb-3" />
          <p className="text-xl font-medium text-gray-800 mb-2">
            Mining Complete!
          </p>
          <p className="text-gray-600 max-w-md mx-auto">
            Your order is being processed for fulfillment and will ship soon.
          </p>
        </div> : <>
          <p className="text-gray-700 mb-5">
            Connect your mining software to our stratum server using the
            information below:
          </p>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Stratum URL
              </label>
              <div className="flex">
                <input type="text" value={stratumUrl} readOnly className="flex-grow px-3 py-2.5 bg-white border border-gray-300 rounded-l-md focus:outline-none text-gray-700 font-mono text-sm" />
                <button onClick={() => copyToClipboard(stratumUrl, setCopiedStratum)} className="px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 transition-colors flex items-center justify-center min-w-[60px]" aria-label="Copy stratum URL">
                  {copiedStratum ? <CheckIcon size={18} className="text-green-600" /> : <CopyIcon size={18} className="text-gray-600" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Worker Name
              </label>
              <div className="flex">
                <input type="text" value={workerName} readOnly className="flex-grow px-3 py-2.5 bg-white border border-gray-300 rounded-l-md focus:outline-none text-gray-700 font-mono text-sm" />
                <button onClick={() => copyToClipboard(workerName, setCopiedWorker)} className="px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 transition-colors flex items-center justify-center min-w-[60px]" aria-label="Copy worker name">
                  {copiedWorker ? <CheckIcon size={18} className="text-green-600" /> : <CopyIcon size={18} className="text-gray-600" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Sample Config (JSON)
              </label>
              <div className="relative">
                <pre className="bg-gray-800 text-gray-100 p-4 rounded-md text-sm overflow-x-auto font-mono">
                  {minerConfig}
                </pre>
                <button onClick={() => copyToClipboard(minerConfig, setCopiedConfig)} className="absolute top-2 right-2 p-1.5 bg-gray-700 rounded hover:bg-gray-600 transition-colors" aria-label="Copy config">
                  {copiedConfig ? <CheckIcon size={16} className="text-green-400" /> : <CopyIcon size={16} className="text-gray-300" />}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-700">
                Mining Progress:
              </p>
              <p className="text-sm font-medium text-gray-700">
                {progress.toFixed(0)}%
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div className="bg-blue-600 h-4 transition-all duration-500 ease-out" style={{
            width: `${progress}%`
          }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Mining speed may vary based on your hardware.
            </p>
          </div>
        </>}
    </div>;
};