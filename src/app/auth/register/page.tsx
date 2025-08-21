'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, username, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error al registrar');
      }

      setSuccess('¡Registro exitoso! Redirigiendo al login...');

      // Redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="space-y-1 text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#E7324A] to-[#F36DA3] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-[#0A0A0A]">Crear cuenta</CardTitle>
            <CardDescription className="text-gray-600">Únete a BrandFlow y gestiona tus marcas</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Inputs */}
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-sm font-medium text-[#0A0A0A]">
                  Nombre completo
                </Label>
                <Input id="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Tu nombre completo" className="h-11 border-gray-200 focus:border-[#E7324A] focus:ring-[#E7324A]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-[#0A0A0A]">
                  Nombre de usuario
                </Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="@usuario" className="h-11 border-gray-200 focus:border-[#E7324A] focus:ring-[#E7324A]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-[#0A0A0A]">
                  Correo electrónico
                </Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="h-11 border-gray-200 focus:border-[#E7324A] focus:ring-[#E7324A]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-[#0A0A0A]">
                  Contraseña
                </Label>
                <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="h-11 border-gray-200 focus:border-[#E7324A] focus:ring-[#E7324A]" />
              </div>

              {/* Mensajes */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <Button type="submit" className="w-full h-11 bg-[#E7324A] hover:bg-[#E7344C] text-white font-medium">
                Crear cuenta
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link href="/auth/login" className="text-[#E7324A] hover:text-[#E7344C] font-medium">
                Iniciar sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
