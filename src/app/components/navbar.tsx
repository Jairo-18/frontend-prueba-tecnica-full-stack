'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');

  // Revisar si hay token en localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { method: 'POST' });
      localStorage.removeItem('token');
      setIsLoggedIn(false);

      setLogoutMessage('Sesión finalizada');
      setTimeout(() => setLogoutMessage(''), 3000);

      window.location.href = '/';
    } catch (err) {
      console.error('Error al cerrar sesión', err);
    }
  };

  return (
    <nav className="bg-[#FAFAFA] border-b border-[#E7324A]/20 sticky top-0 z-50">
      {logoutMessage && <div className="fixed top-16 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50">{logoutMessage}</div>}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#E7324A] to-[#F36DA3] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#0A0A0A]">BrandFlow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/public/services" className="text-[#0A0A0A] hover:text-[#E7324A] transition-colors font-medium">
              Servicios
            </a>
            <a href="/public/successStories" className="text-[#0A0A0A] hover:text-[#E7324A] transition-colors font-medium">
              Casos de Éxito
            </a>
            <a href="/public/contact" className="text-[#0A0A0A] hover:text-[#E7324A] transition-colors font-medium">
              Contacto
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/admin/users">
                  <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white">Panel Administrativo</Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="border-[#E7324A] text-[#E7324A] hover:bg-[#E7324A] hover:text-white bg-transparent">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" className="border-[#E7324A] text-[#E7324A] hover:bg-[#E7324A] hover:text-white bg-transparent">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white">Comenzar Gratis</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#0A0A0A]">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E7324A]/20">
            <div className="flex flex-col space-y-4">
              <a href="/public/services" className="text-[#0A0A0A] hover:text-[#E7324A] transition-colors font-medium">
                Servicios
              </a>
              <a href="/public/successStories" className="text-[#0A0A0A] hover:text-[#E7324A] transition-colors font-medium">
                Casos de Éxito
              </a>
              <a href="/public/contact" className="text-[#0A0A0A] hover:text-[#E7324A] transition-colors font-medium">
                Contacto
              </a>
              <div className="flex flex-col space-y-2 pt-4 w-full">
                {isLoggedIn ? (
                  <>
                    <Link href="/admin/dashboard">
                      <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white !w-full">Panel Administrativo</Button>
                    </Link>
                    <Button onClick={handleLogout} variant="outline" className="border-[#E7324A] text-[#E7324A] hover:bg-[#E7324A] hover:text-white bg-transparent !w-full">
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="outline" className="border-[#E7324A] text-[#E7324A] hover:bg-[#E7324A] hover:text-white bg-transparent !w-full">
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link href="/auth/login">
                      <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white !w-full">Comenzar Gratis</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
