'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User } from '../admin/interface/user.interface';

type UserData = {
  role?: { code: string; name: string };
  user?: User;
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [logoutMessage, setLogoutMessage] = useState('');

  // Cargar info del usuario al montar
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { method: 'POST' });
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      setUserData(null);

      setLogoutMessage('Sesión finalizada');
      setTimeout(() => setLogoutMessage(''), 3000);

      window.location.href = '/';
    } catch (err) {
      console.error('Error al cerrar sesión', err);
    }
  };

  // Componente para mostrar el botón según el rol
  const RoleButton = ({ userData }: { userData: UserData }) => {
    if (!userData) return null;

    if (userData.role?.code === 'ADM') {
      return (
        <Link href="/admin/users">
          <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white cursor-pointer">Panel Administrativo</Button>
        </Link>
      );
    }

    // Usuario normal → dos botones
    return (
      <div className="flex space-x-2">
        <Link href="/user/brand">
          <Button variant="outline" className="border-[#E7324A] text-[#E7324A] hover:bg-[#E7324A] hover:text-white bg-transparent cursor-pointer">
            Registar Marca
          </Button>
        </Link>
        <Link href="/user/brand-panel">
          <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white cursor-pointer">Ver Mis Marcas</Button>
        </Link>
      </div>
    );
  };

  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-[#FAFAFA] border-b border-[#E7324A]/20">
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
            <Link href="/" className="text-[#0A0A0A] hover:text-[#E7324A] transition-colors font-medium">
              Inicio
            </Link>
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

          {/* CTA Button Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {userData ? (
              <>
                <RoleButton userData={userData} />
                <Button onClick={handleLogout} variant="outline" className="border-[#E7324A] text-[#E7324A] hover:bg-[#E7324A] hover:text-white bg-transparent cursor-pointer">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" className="border-[#E7324A] text-[#E7324A] hover:bg-[#E7324A] hover:text-white bg-transparent cursor-pointer">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white cursor-pointer">Comenzar Gratis</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#0A0A0A] cursor-pointer">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E7324A]/20">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-[#0A0A0A] hover:text-[#E7324A] transition-colors font-medium">
                Inicio
              </Link>
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
                {userData ? (
                  <>
                    <RoleButton userData={userData} />
                    <Button onClick={handleLogout} variant="outline" className="border-[#E7324A] text-[#E7324A] hover:bg-[#E7324A] hover:text-white bg-transparent !w-full cursor-pointer">
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="outline" className="border-[#E7324A] text-[#E7324A] hover:bg-[#E7324A] hover:text-white bg-transparent !w-full cursor-pointer">
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link href="/auth/login">
                      <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white !w-full cursor-pointer">Comenzar Gratis</Button>
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
