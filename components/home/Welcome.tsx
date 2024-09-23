import React from 'react';

const Welcome = () => {
  return (
    <div className="h-auto">
      {/* Time and Studies Summary - Two cards in the same row */}
      <div className="px-8 flex gap-4">
        {/* Total Time */}
        <div className="flex-1 bg-white rounded-lg shadow border border-gray-200 p-4 flex flex-col">
          <div className="text-gray-900 text-base font-semibold">Total Time</div>
          <div className="flex items-end gap-3 mt-2">
            <div className="text-gray-900 text-2xl font-bold">1hr 12m</div>
            <div className="text-xs font-bold">últimos 30 días</div>
          </div>
          <div className="mt-3">
            <span className="text-violet-400 text-sm font-semibold">Upgrade your plan</span>
          </div>
        </div>

        {/* Total Studies */}
        <div className="flex-1 bg-white rounded-lg shadow border border-gray-200 p-4 flex flex-col">
          <div className="text-gray-900 text-base font-bold">Total Studies Created</div>
          <div className="text-gray-900 text-2xl font-bold mt-2">6</div>
        </div>
      </div>

      {/* Onboarding Section */}
      <div className="px-8 mt-6">
        <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
          <div className="text-gray-900 text-xl font-semibold">
            Know more about how to use our platform
          </div>
          <div className="text-slate-600 text-sm mt-2">
            Here is a quick onboarding for knowing how to use our platform.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;