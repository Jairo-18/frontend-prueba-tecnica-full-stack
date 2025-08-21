'use client';

import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { BrandData, StateType } from '@/app/user/interface/interface';
import { User } from '../interface/user.interface';

export default function AdminMarcasPage() {
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<BrandData[]>([]);
  const [stateTypes, setStateTypes] = useState<StateType[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Estados para búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para edición
  const [editingBrand, setEditingBrand] = useState<BrandData | null>(null);
  const [newStateId, setNewStateId] = useState<string>('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // const router = useRouter();

  // 🔹 Función para obtener el usuario propietario de una marca
  const getBrandOwner = useCallback(
    (userId: number): User | null => {
      const owner = users.find((user) => Number(user.id) === Number(userId));
      if (!owner) {
        console.warn(`⚠️ Usuario con ID ${userId} no encontrado`);
      }
      return owner || null;
    },
    [users],
  );

  // 🔹 Función para obtener el estado de una marca
  const getBrandState = useCallback(
    (stateTypeId: number): StateType | null => {
      const state = stateTypes.find((st) => Number(st.id) === Number(stateTypeId));
      if (!state) {
        console.warn(`⚠️ Estado con ID ${stateTypeId} no encontrado`);
      }
      return state || null;
    },
    [stateTypes],
  );

  // 🔹 Cargar todos los datos al mismo tiempo
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No hay token de autenticación');
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        // Ejecutar todas las peticiones en paralelo para mejor rendimiento
        const [brandsRes, stateTypesRes, usersRes] = await Promise.all([fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand/`, { headers }), fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand/state-types/`, { headers }), fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, { headers })]);

        // Validar todas las respuestas
        if (!brandsRes.ok) throw new Error(`Error cargando marcas: ${brandsRes.status}`);
        if (!stateTypesRes.ok) throw new Error(`Error cargando estados: ${stateTypesRes.status}`);
        if (!usersRes.ok) throw new Error(`Error cargando usuarios: ${usersRes.status}`);

        // Procesar respuestas
        const brandsData = await brandsRes.json();
        const stateTypesData = await stateTypesRes.json();
        const usersData = await usersRes.json();

        console.log('📊 Datos cargados:');
        console.log('Marcas:', brandsData);
        console.log('Estados:', stateTypesData);
        console.log('Usuarios:', usersData);

        // Extraer marcas según estructura de respuesta
        let extractedBrands: BrandData[] = [];
        if (Array.isArray(brandsData)) {
          extractedBrands = brandsData;
        } else if (brandsData.brands && Array.isArray(brandsData.brands)) {
          extractedBrands = brandsData.brands;
        } else if (brandsData.data && Array.isArray(brandsData.data)) {
          extractedBrands = brandsData.data;
        }

        // Extraer usuarios según estructura de respuesta
        let extractedUsers: User[] = [];
        if (Array.isArray(usersData)) {
          extractedUsers = usersData;
        } else if (usersData.users && Array.isArray(usersData.users)) {
          extractedUsers = usersData.users;
        } else if (usersData.data && Array.isArray(usersData.data)) {
          extractedUsers = usersData.data;
        }

        // Extraer estados según estructura de respuesta
        let extractedStates: StateType[] = [];
        if (Array.isArray(stateTypesData)) {
          extractedStates = stateTypesData;
        } else if (stateTypesData.stateTypes && Array.isArray(stateTypesData.stateTypes)) {
          extractedStates = stateTypesData.stateTypes;
        } else if (stateTypesData.data && Array.isArray(stateTypesData.data)) {
          extractedStates = stateTypesData.data;
        }

        console.log('✅ Datos procesados:');
        console.log(`- ${extractedBrands.length} marcas`);
        console.log(`- ${extractedUsers.length} usuarios`);
        console.log(`- ${extractedStates.length} estados`);

        setBrands(extractedBrands);
        setUsers(extractedUsers);
        setStateTypes(extractedStates);
      } catch (err) {
        console.error('❌ Error cargando datos:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // 🔹 Efecto para filtrar marcas por término de búsqueda
  useEffect(() => {
    let filtered = brands;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = brands.filter((brand) => {
        const owner = getBrandOwner(brand.user_id);
        const state = getBrandState(brand.state_type_id);

        return brand.brand_title.toLowerCase().includes(term) || brand.id.toString().includes(term) || owner?.fullName.toLowerCase().includes(term) || owner?.username.toLowerCase().includes(term) || state?.name.toLowerCase().includes(term);
      });
    }

    setFilteredBrands(filtered);
    setCurrentPage(1); // Resetear a primera página cuando se filtra
  }, [brands, searchTerm, getBrandOwner, getBrandState]);

  // 🔹 Calcular datos para paginación
  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBrands = filteredBrands.slice(startIndex, endIndex);

  // 🔹 Renderizar badge del estado con mejor diseño
  const getStatusBadge = (stateTypeId: number) => {
    const state = getBrandState(stateTypeId);
    const status = state?.name || 'Desconocido';

    const statusConfig = {
      'En Revisión': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '🔄' },
      'en revisión': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '🔄' },
      'Sin Revisar': { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: '⏳' },
      'sin revisar': { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: '⏳' },
      Aprobado: { color: 'bg-green-100 text-green-800 border-green-200', icon: '✅' },
      aprobado: { color: 'bg-green-100 text-green-800 border-green-200', icon: '✅' },
      Rechazado: { color: 'bg-red-100 text-red-800 border-red-200', icon: '❌' },
      rechazado: { color: 'bg-red-100 text-red-800 border-red-200', icon: '❌' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-100 text-gray-600 border-gray-200', icon: '❓' };

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <span>{config.icon}</span>
        {status}
      </span>
    );
  };

  // 🔹 Función para eliminar marca con mejor UX
  const handleDeleteBrand = async (brand: BrandData) => {
    const owner = getBrandOwner(brand.user_id);
    const confirmMessage = `¿Estás seguro de eliminar la marca &quot;${brand.brand_title}&quot; de ${owner?.fullName || 'Usuario desconocido'}?`;

    if (!confirm(confirmMessage)) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand/${brand.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) throw new Error('Error al eliminar la marca');

      setBrands((prevBrands) => prevBrands.filter((b) => b.id !== brand.id));
      console.log(`✅ Marca &quot;${brand.brand_title}&quot; eliminada correctamente`);
    } catch (err) {
      console.error('❌ Error al eliminar marca:', err);
      alert('No se pudo eliminar la marca. Inténtalo de nuevo.');
    }
  };

  // 🔹 Función para abrir el diálogo de edición
  const handleEditBrand = (brand: BrandData) => {
    setEditingBrand(brand);
    setNewStateId(brand.state_type_id.toString());
    setIsEditDialogOpen(true);
  };

  // 🔹 Función para actualizar el estado de la marca
  const handleUpdateBrandState = async () => {
    if (!editingBrand || !newStateId) return;

    setIsUpdating(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand/${editingBrand.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand_title: editingBrand.brand_title,
          state_type_id: parseInt(newStateId),
          user_id: editingBrand.user_id,
        }),
      });

      if (!res.ok) throw new Error('Error al actualizar la marca');

      // Actualizar el estado local
      setBrands((prevBrands) => prevBrands.map((brand) => (brand.id === editingBrand.id ? { ...brand, state_type_id: parseInt(newStateId) } : brand)));

      setIsEditDialogOpen(false);
      setEditingBrand(null);
      console.log(`✅ Estado de marca &quot;${editingBrand.brand_title}&quot; actualizado`);
    } catch (err) {
      console.error('❌ Error al actualizar marca:', err);
      alert('No se pudo actualizar el estado de la marca. Inténtalo de nuevo.');
    } finally {
      setIsUpdating(false);
    }
  };

  // 🔹 Función para cambiar página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 🔹 Generar números de página para mostrar
  const getPageNumbers = () => {
    const delta = 2; // Número de páginas a mostrar a cada lado de la página actual
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex justify-center items-center h-40">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando datos del sistema...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-lg font-medium">Error al cargar los datos</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
            <Button onClick={() => window.location.reload()} className="cursor-pointer">
              Reintentar
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
            <CardTitle className="text-2xl">Administración de Marcas</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {filteredBrands.length} de {brands.length} marca{brands.length !== 1 ? 's' : ''}
              {searchTerm && <> (filtradas por &quot;{searchTerm}&quot;)</>}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.reload()} className="cursor-pointer">
              🔄 Actualizar
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Barra de búsqueda */}
          <div className="mb-6">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Input placeholder="Buscar por nombre, ID, propietario o estado..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4" />
            </div>
          </div>

          {filteredBrands.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                {searchTerm ? (
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ) : (
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{searchTerm ? 'No se encontraron marcas' : 'No hay marcas registradas'}</h3>
              <p className="text-gray-500">{searchTerm ? <>No hay marcas que coincidan con &quot;{searchTerm}&quot;</> : 'Las marcas registradas por los usuarios aparecerán aquí'}</p>
              {searchTerm && (
                <Button variant="outline" onClick={() => setSearchTerm('')} className="mt-4 cursor-pointer">
                  Limpiar búsqueda
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">ID</TableHead>
                      <TableHead>Nombre de la Marca</TableHead>
                      <TableHead className="w-40">Estado</TableHead>
                      <TableHead>Propietario</TableHead>
                      <TableHead className="w-48 text-center">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentBrands.map((brand) => {
                      const owner = getBrandOwner(brand.user_id);
                      return (
                        <TableRow key={brand.id} className="hover:bg-gray-50">
                          <TableCell className="font-mono text-sm">#{brand.id}</TableCell>
                          <TableCell className="font-medium">{brand.brand_title}</TableCell>
                          <TableCell>{getStatusBadge(brand.state_type_id)}</TableCell>
                          <TableCell>
                            {owner ? (
                              <div className="flex flex-col">
                                <span className="font-medium text-gray-900">{owner.fullName}</span>
                                <span className="text-xs text-gray-500">
                                  @{owner.username} • ID: {owner.id}
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col">
                                <span className="text-gray-400 font-medium">Usuario desconocido</span>
                                <span className="text-xs text-red-500">ID: {brand.user_id} (No encontrado)</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex gap-2 justify-center">
                              <Button variant="outline" size="sm" onClick={() => handleEditBrand(brand)} className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 cursor-pointer">
                                ✏️ Editar
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteBrand(brand)} className="hover:bg-red-600 cursor-pointer">
                                🗑️ Eliminar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-500">
                    Mostrando {startIndex + 1} a {Math.min(endIndex, filteredBrands.length)} de {filteredBrands.length} resultados
                  </div>

                  <div className="flex items-center space-x-1">
                    <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="cursor-pointer">
                      Anterior
                    </Button>

                    {totalPages <= 7
                      ? // Si hay pocas páginas, mostrar todas
                        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button key={page} variant={currentPage === page ? 'default' : 'outline'} size="sm" onClick={() => handlePageChange(page)} className="cursor-pointer">
                            {page}
                          </Button>
                        ))
                      : // Si hay muchas páginas, mostrar con puntos suspensivos
                        getPageNumbers().map((page, index) => (
                          <Button key={index} variant={currentPage === page ? 'default' : 'outline'} size="sm" onClick={() => (typeof page === 'number' ? handlePageChange(page) : undefined)} disabled={page === '...'} className="cursor-pointer">
                            {page}
                          </Button>
                        ))}

                    <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="cursor-pointer">
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Diálogo de edición de estado */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Estado de la Marca</DialogTitle>
            <DialogDescription>Cambiar el estado de la marca &quot;{editingBrand?.brand_title}&quot;</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand-title" className="text-right">
                Marca
              </Label>
              <Input id="brand-title" value={editingBrand?.brand_title || ''} disabled className="col-span-3 bg-gray-50" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state-select" className="text-right">
                Estado
              </Label>
              <Select value={newStateId} onValueChange={setNewStateId}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {stateTypes.map((state) => (
                    <SelectItem key={state.id} value={state.id.toString()}>
                      <div className="flex items-center gap-2">{getStatusBadge(state.id)}</div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {editingBrand && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Propietario</Label>
                <div className="col-span-3 text-sm text-gray-600">{getBrandOwner(editingBrand.user_id)?.fullName || 'Usuario desconocido'}</div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isUpdating}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateBrandState} disabled={isUpdating || !newStateId}>
              {isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Actualizando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
