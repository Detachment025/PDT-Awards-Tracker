// Custom components
import DataCheck from '@/components/datacheck';
import PageTitle from '@/components/pagetitle';
import Sidebar from '@/components/sidebar';

// Next.js libraries
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Cookies
import Cookies from 'js-cookie';

export default function AddPage() {

  // Variable declaration and initialization
  const router = useRouter();

  return (
    <div className="relative flex flex-row h-screen">
      <Sidebar/>
      <div className="m-10 w-full">
        <PageTitle/>    
        <DataCheck/>
      </div>
    </div>
  )
}
