'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirige automáticamente a Home
    router.replace('/');
  }, [router]);

  return null; // O un loader si quieres
}
