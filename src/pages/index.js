// Next.js libraries
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Home definition
export default function Home() {
  // Variable declaration and initialization
  const router = useRouter();

  // Push user to the view page
  useEffect(() => {router.push("/overview")}, [])

  // Return nothing
  return (<div></div>)
}
