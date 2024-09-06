"use client";
import { SidebarLayout } from '@/components/common';
import React, { useState } from 'react';
import { studyDetails } from '@/data';
import ProjectList from "@/components/placeholders/summary/ProjectList";


export default function Page() {

  return (
    <SidebarLayout>
        <div className='grid grid-cols-2 pt-10'>
            <div>
                <h2 className="text-3xl font-bold">Welcome</h2>
                <div className="h-52 px-6 py-5 mt-5 bg-sky-100 rounded-xl shadow border border-gray-200 justify-start items-center gap-4 flex">
                    <div className="flex-col justify-start items-center gap-5 inline-flex">
                        <div className="self-stretch flex-col justify-start items-center gap-2 flex">
                        <div className="self-stretch text-gray-900 text-xl font-semibold leading-loose">Know more about how to use our platform</div>
                        <div className="self-stretch text-slate-600 text-sm font-normal leading-tight">Here is a quick onboarding for knowing how to use our platform. </div>
                        </div>
                        <div className="self-stretch justify-start items-start gap-3 inline-flex">
                        <div className="rounded-lg justify-start items-start flex">
                            <div className=" px-4 py-2.5 bg-white rounded-lg shadow border border-gray-300 justify-center items-center gap-2 flex">
                                <div className="text-slate-700 text-base font-semibold leading-normal">Learn More</div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div />
                    </div>
                <div className="h-24 pr-3 justify-start items-center gap-3 flex mt-5">
                    <div className="grow shrink basis-0 self-stretch px-3 py-4 bg-white rounded-lg shadow border border-gray-200 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="self-stretch justify-start items-start gap-2 inline-flex">
                        <div className="grow shrink basis-0 text-gray-900 text-base font-bold leading-normal">Total Studies Created</div>
                        </div>
                        <div className="self-stretch justify-start items-end gap-4 inline-flex">
                        <div className="justify-start items-center gap-3 flex">
                            <div className="text-gray-900 text-2xl font-bold leading-9">5</div>
                        </div>
                        </div>
                    </div>
                    <div className="grow shrink basis-0 self-stretch px-3 py-4 bg-white rounded-lg shadow border border-gray-200 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="self-stretch justify-start items-start gap-2 inline-flex">
                        <div className="grow shrink basis-0 text-gray-900 text-base font-semibold leading-normal">Total time</div>
                        </div>
                        <div className="self-stretch justify-start items-end gap-4 inline-flex">
                        <div className="justify-start items-center gap-3 flex">
                            <div className="text-gray-900 text-2xl font-bold leading-9">1hr 12 m</div>
                            <div className="h-4 justify-start items-center gap-2 flex">
                            <div className="grow shrink basis-0 text-xs font-bold leading-none">últimos 30 días</div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-10'>
                <h2 className="text-3xl font-bold">Studies</h2>
                <ProjectList />
            </div>
        </div>
    </SidebarLayout>
  );
}