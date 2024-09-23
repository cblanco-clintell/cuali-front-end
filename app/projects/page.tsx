"use client";
import { SidebarLayout } from '@/components/common';
import React, { useState } from 'react';
import Projects from '@/components/projects/Projects';


export default function Page() {

  return (
    <SidebarLayout>
        <Projects/>
    </SidebarLayout>
  );
}