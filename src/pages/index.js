// Imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  // Variable declaration and initialization
  const router = useRouter();

  // Push user to the view page
  useEffect(() => {router.push("/view")}, [])

  return (<div></div>)
}
