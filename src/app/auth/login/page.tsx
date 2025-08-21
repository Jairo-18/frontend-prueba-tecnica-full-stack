'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Error al iniciar sesión');
      }

      const data = await res.json();
      // Guardar token en localStorage
      localStorage.setItem('token', data.access_token);

      // Mensaje de bienvenida
      setSuccess('¡Bienvenido! Redirigiendo...');

      // Redirigir a home después de 2 segundos
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-[#0A0A0A] hover:text-[#E7324A] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <Card className="border-0 shadow-xl bg-white">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#E7324A] to-[#F36DA3] rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-[#0A0A0A]">Iniciar Sesión</CardTitle>
              <CardDescription className="text-gray-600 mt-2">Accede a tu cuenta de BrandFlow</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#0A0A0A] font-medium">
                  Correo electrónico
                </Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="border-gray-200 focus:border-[#E7324A] focus:ring-[#E7324A] h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#0A0A0A] font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="border-gray-200 focus:border-[#E7324A] focus:ring-[#E7324A] h-12 pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#E7324A] transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <Button type="submit" className="w-full h-12 bg-[#E7324A] hover:bg-[#E7344C] text-white font-semibold transition-all duration-200 transform hover:scale-[1.02]">
                Iniciar Sesión
              </Button>
            </form>

            <div className="text-center mt-4 text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link href="/auth/register" className="text-[#E7324A] hover:text-[#F36DA3] font-semibold transition-colors">
                Regístrate gratis
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
