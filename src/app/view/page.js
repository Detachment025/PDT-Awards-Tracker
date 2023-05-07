'use client';

// Custom components
import DataCheck from '@/components/datacheck';
import PageTitle from '@/components/pagetitle';
import Sidebar from '@/components/sidebar';

// Next.js libraries
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Cookies
import Cookies from 'js-cookie';

export default function ViewPage() {

  // Set cookies
  useEffect(() => {
    Cookies.set("selectedTracker", "Awards");
    Cookies.set("data", "");
  }, []);

  // Variable declaration and initialization
  const router = useRouter();

  return (
    <div className="relative flex flex-row h-screen">
      <Sidebar/>
      <div className="m-10 h-auto w-full">
        <PageTitle/>  
        <DataCheck/>
      </div>
    </div>
  )
}
