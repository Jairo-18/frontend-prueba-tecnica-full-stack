'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BrandData, StateType } from '../interface/interface';

export default function MisMarcasPage() {
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [stateTypes, setStateTypes] = useState<StateType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔹 Cargar marcas
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) throw new Error('Error cargando marcas');
        const data = await res.json();

        // 👇 tu backend devuelve { brands: [...] }
        setBrands(Array.isArray(data.brands) ? data.brands : []);
      } catch (err) {
        console.error(err);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // 🔹 Cargar stateTypes
  useEffect(() => {
    const fetchStateTypes = async () => {
      try {
        // 👇 revisa si es /statetype/ o /statetypes/
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand/state-types/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) throw new Error('Error cargando stateTypes');
        const data = await res.json();
        setStateTypes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setStateTypes([]);
      }
    };

    fetchStateTypes();
  }, []);

  // 🔹 Renderizar badge del estado
  const getStatusBadge = (status: string) => {
    const base = 'px-2 py-1 rounded text-xs font-medium';
    switch (status) {
      case 'En Revisión':
        return <span className={`${base} bg-yellow-200 text-yellow-800`}>{status}</span>;
      case 'Sin Revisar':
        return <span className={`${base} bg-gray-200 text-gray-800`}>{status}</span>;
      case 'Aprobado':
        return <span className={`${base} bg-green-200 text-green-800`}>{status}</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-600`}>{status}</span>;
    }
  };

  if (loading) return <p>Cargando marcas...</p>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Mis Marcas</CardTitle>
          <Button onClick={() => router.push('/user/brand')}>Nueva Marca</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>{brand.id}</TableCell>
                  <TableCell>{brand.brand_title}</TableCell>
                  <TableCell>{getStatusBadge(stateTypes.find((st) => st.id === brand.state_type_id)?.name || '-')}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={async () => {
                        if (!confirm('¿Seguro deseas eliminar esta marca?')) return;

                        try {
                          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand/${brand.id}`, {
                            method: 'DELETE',
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                          });

                          if (!res.ok) throw new Error('Error al eliminar la marca');

                          // ✅ Actualizar la lista en frontend
                          setBrands((prev) => prev.filter((b) => b.id !== brand.id));

                          alert('Marca eliminada correctamente ✅');
                        } catch (err) {
                          console.error(err);
                          alert('No se pudo eliminar la marca ❌');
                        }
                      }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
