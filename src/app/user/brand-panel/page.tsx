'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BrandData, StateType } from '../interface/interface';
import { User } from '@/app/admin/interface/user.interface';

export default function MisMarcasPage() {
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [stateTypes, setStateTypes] = useState<StateType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  // 🔹 Función mejorada para obtener usuario del localStorage
  const getCurrentUser = (): User | null => {
    const possibleKeys = ['userData', 'user', 'currentUser', 'authUser'];

    for (const key of possibleKeys) {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        try {
          const data = JSON.parse(storedData);

          // Buscar usuario en diferentes estructuras posibles
          let userCandidate = null;

          if (data.user && data.user.id) {
            userCandidate = data.user;
          } else if (data.id) {
            userCandidate = data;
          } else if (data.data && data.data.user && data.data.user.id) {
            userCandidate = data.data.user;
          }

          if (userCandidate && userCandidate.id) {
            return {
              id: Number(userCandidate.id),
              fullName: userCandidate.fullName || '',
              username: userCandidate.username || '',
              email: userCandidate.email || '',
              role_type_id: userCandidate.role_type_id || 1,
            };
          }
        } catch (error) {
          console.error(`Error parsing ${key}:`, error);
        }
      }
    }

    // Intentar extraer del token JWT como respaldo
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id || payload.user_id || payload.sub;

        if (userId) {
          return {
            id: Number(userId),
            fullName: payload.fullName || payload.name || 'Usuario',
            username: payload.username || payload.preferred_username || 'usuario',
            email: payload.email || '',
            role_type_id: payload.role_type_id || payload.role_id || 1,
          };
        }
      } catch (e) {
        console.error('Error decoding token:', e);
      }
    }

    return null;
  };

  // 🔹 Obtener usuario actual al montar el componente
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      // Redirigir al login si no hay usuario
      router.push('/login');
    }
  }, [router]);

  // 🔹 Cargar state types
  useEffect(() => {
    const fetchStateTypes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand/state-types/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) throw new Error('Error cargando state types');

        const data = await res.json();
        let states: StateType[] = [];

        if (Array.isArray(data)) {
          states = data;
        } else if (data.stateTypes && Array.isArray(data.stateTypes)) {
          states = data.stateTypes;
        } else if (data.data && Array.isArray(data.data)) {
          states = data.data;
        }

        console.log('State types cargados:', states);
        setStateTypes(states);
      } catch (err) {
        console.error('Error fetching state types:', err);
      }
    };

    fetchStateTypes();
  }, []);

  // 🔹 Cargar marcas del usuario actual
  useEffect(() => {
    const fetchUserBrands = async () => {
      if (!currentUser?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        const data = await res.json();

        // Extraer marcas de la respuesta
        let allBrands: BrandData[] = [];
        if (Array.isArray(data)) {
          allBrands = data;
        } else if (data.brands && Array.isArray(data.brands)) {
          allBrands = data.brands;
        } else if (data.data && Array.isArray(data.data)) {
          allBrands = data.data;
        }

        // Filtrar marcas del usuario actual
        const myBrands = allBrands.filter((brand: BrandData) => {
          const brandUserId = Number(brand.user_id);
          const currentUserId = Number(currentUser.id);
          const isMyBrand = brandUserId === currentUserId;

          return isMyBrand;
        });

        setBrands(myBrands);
      } catch (err) {
        console.error('Error al cargar marcas:', err);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserBrands();
    }
  }, [currentUser]);

  // 🔹 Función para obtener badge del estado
  const getStatusBadge = (stateTypeId: number) => {
    const stateType = stateTypes.find((st: StateType) => st.id === stateTypeId);
    const status = stateType?.name || 'Desconocido';

    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';

    const statusClasses = {
      'en revisión': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'en revision': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'sin revisar': 'bg-gray-100 text-gray-800 border border-gray-200',
      aprobado: 'bg-green-100 text-green-800 border border-green-200',
      rechazado: 'bg-red-100 text-red-800 border border-red-200',
    };

    const statusClass = statusClasses[status.toLowerCase() as keyof typeof statusClasses] || 'bg-gray-100 text-gray-600 border border-gray-200';

    return <span className={`${baseClasses} ${statusClass}`}>{status}</span>;
  };

  // 🔹 Función para eliminar marca
  const handleDeleteBrand = async (brandId: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta marca?')) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand/${brandId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) {
        throw new Error('Error al eliminar la marca');
      }

      // Actualizar estado local
      setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== brandId));
    } catch (err) {
      console.error('Error al eliminar marca:', err);
      alert('No se pudo eliminar la marca. Inténtalo de nuevo.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex justify-center items-center h-40">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando tus marcas...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-red-500 mb-4">No se pudo identificar al usuario</p>
            <Button onClick={() => router.push('/login')} className="cursor-pointer">
              Iniciar Sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-2xl">Mis Marcas</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Usuario: {currentUser.username} (ID: {currentUser.id})
            </p>
          </div>
          <Button onClick={() => router.push('/user/brand')} className="cursor-pointer">
            + Nueva Marca
          </Button>
        </CardHeader>

        <CardContent>
          {brands.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes marcas registradas</h3>
              <p className="text-gray-500 mb-6">Comienza registrando tu primera marca comercial</p>
              <Button onClick={() => router.push('/user/brand')} className="cursor-pointer">
                Crear Mi Primera Marca
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead>Nombre de la Marca</TableHead>
                    <TableHead className="w-32">Estado</TableHead>
                    <TableHead className="w-32 text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brands.map((brand: BrandData) => (
                    <TableRow key={brand.id}>
                      <TableCell className="font-mono text-sm">#{brand.id}</TableCell>
                      <TableCell className="font-medium">{brand.brand_title}</TableCell>
                      <TableCell>{getStatusBadge(brand.state_type_id)}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteBrand(brand.id)} className="hover:bg-red-600 cursor-pointer">
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 text-sm text-gray-500 text-center">
                Total: {brands.length} marca{brands.length !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
