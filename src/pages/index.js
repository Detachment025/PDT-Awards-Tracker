// Next.js libraries
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Cookies
import Cookies from 'js-cookie';

// Home definition
export default function Home() {
  // Set cookies
  useEffect(() => {
    Cookies.set("selectedTracker", "Awards");
  }, []);

  // Variable declaration and initialization
  const router = useRouter();

  // Push user to the view page
  useEffect(() => {router.push("/view")}, [])

  // Return nothing
  return (<div></div>)
}
