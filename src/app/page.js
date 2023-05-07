'use client';

// Imports
import { useRouter } from 'next/navigation';

// Home page definition
export default function Home() {

  // Variable declaration and initialization
  const router = useRouter();

  // Go to the view page
  router.push("/view");

  return (<div></div>);
}
