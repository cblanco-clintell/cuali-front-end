"use client";

import React, { useState } from 'react';
import { SidebarLayout } from '@/components/common';
import ProjectTable from '@/components/projects/ProjectTable';
import { useGetProjectsQuery } from '@/redux/features/projects/projectApiSlice';
import PageTitle from '@/components/common/PageTitle';
import Header from '@/components/header/Header';
import Welcome from '@/components/home/Welcome';
import { useSelector } from 'react-redux';
import { selectProjects } from '@/redux/features/projects/projectSelectors';

export default function Page() {
    const projects = useSelector(selectProjects);

    return (
        <SidebarLayout>
            <Header breadcrumbs={[{ title: 'Overview' }]} />
            <PageTitle title='Welcome, Olivia' description='Here´s an overview of how your studies are going.' />
            <div className='grid grid-cols-2'>
                <div>
                    <Welcome />
                </div>
                <div>
                  <div className='max-h-[80vh] overflow-y-auto'>
                  <ProjectTable projects={projects} />
                  </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
