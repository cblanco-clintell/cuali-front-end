import React from 'react';

const Config: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col gap-2 p-4 pb-48 rounded-xl border border-solid shadow-sm bg-neutral-50 border-zinc-300 max-w-[816px] max-md:pb-24">
      {/* Header */}
      <div className="flex overflow-hidden flex-wrap gap-3 items-center w-full max-md:max-w-full">
        <div className="self-stretch my-auto text-lg font-semibold text-zinc-800">
          Study Configuration
        </div>
      </div>

      {/* Study General Info */}
      <div className="flex overflow-hidden flex-col py-3 mt-2 w-full max-md:max-w-full">

        {/* Study Name and Brief */}
        <div className="flex overflow-hidden flex-col mt-3 w-full max-md:max-w-full">
          <div className="flex overflow-hidden relative flex-wrap gap-3 items-start w-full max-md:max-w-full">
            <div className="flex overflow-hidden z-0 flex-col self-end min-w-[240px] text-zinc-800 w-[411px]">
              <div className="text-lg font-semibold">Study name</div>
              <div className="overflow-hidden gap-2 self-stretch px-3 py-2 mt-2 w-full text-sm bg-white rounded-lg border border-solid border-zinc-400">
                Quantum Motors Study
              </div>
            </div>
            <div className="flex overflow-hidden absolute bottom-1.5 z-0 gap-2.5 justify-center items-center self-start py-0.5 w-6 h-6 min-h-[24px] right-[337px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/11553430bd8175ad6746720cd1c3d5b38d5d9a2a9fa7ed44bebedeeb7e619d62?placeholderIfAbsent=true&apiKey=f7e29149ec0d4a46a228424b3e258d04"
                className="object-contain self-stretch my-auto w-5 aspect-square"
                alt="edit icon"
              />
            </div>
          </div>

          <div className="flex overflow-hidden flex-col px-0.5 mt-3 w-full max-md:max-w-full">
            <div className="text-lg font-semibold text-zinc-800">Study brief</div>
            <div className="overflow-hidden flex-1 shrink p-3 mt-2.5 w-full text-sm leading-5 bg-gray-50 rounded-lg border border-solid border-zinc-400 text-neutral-500 max-md:max-w-full">
              This study is conducted by the marketing research company Marketing Wizards. The study aims to answer what is the customer journey for the electric car manufacturer Blue Motors...
            </div>
          </div>

          {/* Objectives */}
          <div className="flex overflow-hidden flex-col mt-3 w-full text-sm max-md:max-w-full">
            <div className="flex overflow-hidden flex-col w-full max-md:max-w-full">
              <div className="text-lg font-semibold text-zinc-800 max-md:max-w-full">Study objectives</div>
              <div className="mt-3 text-zinc-800 max-md:max-w-full">
                These are the main objectives of your study, where cuali.ai will offer you a more amplified view of these points.
              </div>
              <div className="flex overflow-hidden flex-wrap gap-3 items-start mt-3 w-full max-md:max-w-full">
                <div className="flex overflow-hidden flex-col flex-1 shrink basis-0 min-w-[240px]">
                  <div className="font-semibold text-zinc-800">Objective 1</div>
                  <div className="overflow-hidden gap-2.5 self-stretch px-3 py-2 mt-2 w-full bg-gray-50 rounded-lg border border-solid border-zinc-300 text-neutral-500">
                    Understand customer preferences
                  </div>
                </div>
                <div className="flex overflow-hidden flex-col flex-1 shrink basis-0 min-w-[240px]">
                  <div className="font-semibold text-zinc-800">Objective 2</div>
                  <div className="overflow-hidden gap-2.5 self-stretch px-3 py-2 mt-2 w-full bg-gray-50 rounded-lg border border-solid border-zinc-300 text-neutral-500">
                    Identify mobile market friendly
                  </div>
                </div>
              </div>
              <div className="flex overflow-hidden flex-wrap gap-3 items-start mt-3 w-full max-md:max-w-full">
                <div className="flex overflow-hidden flex-col flex-1 shrink basis-0 min-h-[66px] min-w-[240px]">
                  <div className="font-semibold text-zinc-800">Objective 3</div>
                  <div className="overflow-hidden gap-2.5 self-stretch px-3 py-2 mt-2 w-full bg-gray-50 rounded-lg border border-solid border-zinc-300 text-neutral-500">
                    Find the factors that influence customer preferences
                  </div>
                </div>
                <div className="flex overflow-hidden flex-col flex-1 shrink basis-0 min-w-[240px]">
                  <div className="font-semibold text-zinc-800">Objective 4</div>
                  <div className="overflow-hidden gap-2.5 self-stretch px-3 py-2 mt-2 w-full bg-gray-50 rounded-lg border border-solid border-zinc-300 text-neutral-500">
                    How the final customer sees our product
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Config;