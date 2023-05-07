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

export default function DeletePage() {

  // Variable declaration and initialization
  const router = useRouter();

  return (
    <div className="relative flex flex-row h-full">
      <Sidebar/>
      <div className="m-10 w-full">
        <PageTitle/>    
        <DataCheck/>
      </div>
    </div>
  )
}
