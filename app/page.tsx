"use client";

import React, { useState } from 'react';
import { SidebarLayout } from '@/components/common';
import ProjectTable from '@/components/projects/ProjectTable';
import { useGetProjectsQuery } from '@/redux/features/projects/projectApiSlice';
import PageTitle from '@/components/common/PageTitle';
import Header from '@/components/header/Header';
import Welcome from '@/components/home/Welcome';

export default function Page() {
    const { data: projects, isLoading: projectsIsLoading, isError: projectsIsError } = useGetProjectsQuery({});

    return (
        <SidebarLayout>
            <Header />
            <PageTitle title='Welcome, Olivia' description='Here´s an overview of how your studies are going.' />
            <div className='grid grid-cols-2'>
                <div>
                    <Welcome />
                </div>
                <div>
                    <ProjectTable projects={projects} />
                </div>
            </div>
        </SidebarLayout>
    );
}
