'use client';

// Imports
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import PageTitle from '@/components/pagetitle';
import Cookies from 'js-cookie';

export default function Home() {

  // Variable declaration and initialization
  const router = useRouter();

  return (
    <div className="relative flex flex-row h-full">
      <Sidebar/>
      <div className="m-10 w-full">
        <PageTitle/>    
      </div>
    </div>
  )
}
