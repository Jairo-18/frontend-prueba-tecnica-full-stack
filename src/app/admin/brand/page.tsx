'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Input } from '@/components/ui/input';
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { ArrowLeft, Plus, Edit, Trash2, Search, Building2 } from 'lucide-react';

export default function BrandsPanel() {
  //   const [brands, setBrands] = useState<any[]>([]);
  //   const [searchTerm, setSearchTerm] = useState('');
  //   const [isDialogOpen, setIsDialogOpen] = useState(false);
  //   const [editingBrand, setEditingBrand] = useState<number | null>(null);
  //   const [formBrand, setFormBrand] = useState({
  //     brand_title: '',
  //     user_id: '',
  //     state_type_id: '1',
  //   });

  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [perPage] = useState(5);
  //   const [totalPages, setTotalPages] = useState(1);

  //   const [message, setMessage] = useState('');

  //   const API_URL = process.env.NEXT_PUBLIC_API_URL;

  //   const showMessage = (msg: string) => {
  //     setMessage(msg);
  //     setTimeout(() => setMessage(''), 3000);
  //   };

  //   // 🔹 Traer marcas con paginación
  //   const fetchBrands = async () => {
  //     try {
  //       const skip = (currentPage - 1) * perPage;
  //       const res = await fetch(`${API_URL}/brand?skip=${skip}&limit=${perPage}`);
  //       if (!res.ok) throw new Error('Error al cargar marcas');
  //       const data = await res.json();

  //       const brandsArray = Array.isArray(data) ? data : data.brands || [];
  //       setBrands(brandsArray);

  //       // calcular totalPages según cantidad
  //       setTotalPages(Math.ceil((data.total || brandsArray.length) / perPage) || 1);
  //     } catch (error) {
  //       console.error(error);
  //       showMessage('Error al cargar marcas ❌');
  //       setBrands([]);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchBrands();
  //   }, [currentPage]);

  //   const handleOpenAddDialog = () => {
  //     setEditingBrand(null);
  //     setFormBrand({ brand_title: '', user_id: '', state_type_id: '1' });
  //     setIsDialogOpen(true);
  //   };

  //   const handleEditBrand = (brandId: number) => {
  //     const brand = brands.find((b) => b.id === brandId);
  //     if (brand) {
  //       setEditingBrand(brandId);
  //       setFormBrand({
  //         brand_title: brand.brand_title || '',
  //         user_id: brand.user_id?.toString() || '',
  //         state_type_id: brand.state_type_id?.toString() || '1',
  //       });
  //       setIsDialogOpen(true);
  //     }
  //   };

  //   const handleSaveBrand = async () => {
  //     try {
  //       if (editingBrand) {
  //         await fetch(`${API_URL}/brand/${editingBrand}`, {
  //           method: 'PUT',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify(formBrand),
  //         });
  //         showMessage('Marca actualizada correctamente ✅');
  //       } else {
  //         await fetch(`${API_URL}/brand`, {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify(formBrand),
  //         });
  //         showMessage('Marca agregada correctamente ✅');
  //       }
  //       setIsDialogOpen(false);
  //       fetchBrands();
  //     } catch (err) {
  //       console.error(err);
  //       showMessage('Error al guardar marca ❌');
  //     }
  //   };

  //   const handleDeleteBrand = async (brandId: number) => {
  //     if (!confirm('¿Seguro que quieres eliminar esta marca?')) return;
  //     try {
  //       await fetch(`${API_URL}/brand/${brandId}`, { method: 'DELETE' });
  //       showMessage('Marca eliminada correctamente ✅');
  //       fetchBrands();
  //     } catch (err) {
  //       console.error(err);
  //       showMessage('Error al eliminar marca ❌');
  //     }
  //   };

  //   const getStatusBadge = (state_type_id: string | number) => {
  //     const statusConfig: any = {
  //       1: { color: 'bg-green-100 text-green-800', text: 'Activa' },
  //       2: { color: 'bg-yellow-100 text-yellow-800', text: 'Pendiente' },
  //       3: { color: 'bg-red-100 text-red-800', text: 'Suspendida' },
  //       4: { color: 'bg-gray-100 text-gray-800', text: 'Inactiva' },
  //     };
  //     const config = statusConfig[state_type_id] || statusConfig[1];
  //     return <Badge className={`${config.color} border-0`}>{config.text}</Badge>;
  //   };

  //   const filteredBrands = brands.filter((b) => b.brand_title.toLowerCase().includes(searchTerm.toLowerCase()) || b.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    // <div className="min-h-screen bg-[#FAFAFA] relative">
    //   {/* Mensaje de notificación */}
    //   {message && <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow z-50">{message}</div>}

    //   {/* Header */}
    //   <div className="bg-white border-b border-gray-200">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="flex items-center justify-between h-16">
    //         <div className="flex items-center space-x-4">
    //           <Link href="/admin" className="flex items-center text-[#0A0A0A] hover:text-[#E7324A] transition-colors">
    //             <ArrowLeft className="h-5 w-5 mr-2" />
    //             Volver al panel
    //           </Link>
    //           <div className="flex items-center space-x-2">
    //             <Building2 className="h-6 w-6 text-[#E7324A]" />
    //             <h1 className="text-xl font-semibold text-[#0A0A0A]">Gestión de Marcas</h1>
    //           </div>
    //         </div>
    //         <Link href="/admin/users">
    //           <Button className="bg-[#743742] hover:bg-[#E7344C] text-white">
    //             <Plus className="h-4 w-4 mr-2" /> Gestionar Usuarios
    //           </Button>
    //         </Link>

    //         <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white" onClick={handleOpenAddDialog}>
    //           <Plus className="h-4 w-4 mr-2" /> Agregar Marca
    //         </Button>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    //     {/* Search */}
    //     <div className="flex items-center space-x-2 mb-6">
    //       <div className="relative flex-1 max-w-sm">
    //         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    //         <Input placeholder="Buscar marcas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
    //       </div>
    //     </div>

    //     {/* Brands Table */}
    //     <div className="bg-white rounded-lg shadow-sm border">
    //       <Table>
    //         <TableHeader>
    //           <TableRow>
    //             <TableHead>Nombre de la Marca</TableHead>
    //             <TableHead>Titular</TableHead>
    //             <TableHead>Estado</TableHead>
    //             <TableHead className="text-right">Acciones</TableHead>
    //           </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //           {filteredBrands.map((brand) => (
    //             <TableRow key={brand.id}>
    //               <TableCell className="font-medium">{brand.brand_title}</TableCell>
    //               <TableCell>{brand.user?.name || 'Sin titular'}</TableCell>
    //               <TableCell>{getStatusBadge(brand.state_type_id)}</TableCell>
    //               <TableCell className="text-right">
    //                 <div className="flex items-center justify-end space-x-2">
    //                   <Button variant="outline" size="sm" onClick={() => handleEditBrand(brand.id)}>
    //                     <Edit className="h-4 w-4" />
    //                   </Button>
    //                   <Button variant="outline" size="sm" onClick={() => handleDeleteBrand(brand.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
    //                     <Trash2 className="h-4 w-4" />
    //                   </Button>
    //                 </div>
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>

    //       {/* Pagination */}
    //       <div className="flex justify-between mt-4">
    //         <Button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
    //           Anterior
    //         </Button>
    //         <span>
    //           Página {currentPage} de {totalPages}
    //         </span>
    //         <Button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
    //           Siguiente
    //         </Button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Dialog para agregar/editar */}
    //   <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    //     <DialogContent className="sm:max-w-[425px]">
    //       <DialogHeader>
    //         <DialogTitle>{editingBrand ? 'Editar Marca' : 'Agregar Nueva Marca'}</DialogTitle>
    //       </DialogHeader>
    //       <div className="grid gap-4 py-4">
    //         <div className="grid gap-2">
    //           <Label htmlFor="brand_title">Nombre de la Marca</Label>
    //           <Input id="brand_title" value={formBrand.brand_title} onChange={(e) => setFormBrand({ ...formBrand, brand_title: e.target.value })} />
    //         </div>
    //         <div className="grid gap-2">
    //           <Label htmlFor="user_id">Titular (User ID)</Label>
    //           <Input id="user_id" value={formBrand.user_id} onChange={(e) => setFormBrand({ ...formBrand, user_id: e.target.value })} />
    //         </div>
    //         <div className="grid gap-2">
    //           <Label htmlFor="state_type_id">Estado de la Marca</Label>
    //           <Select value={formBrand.state_type_id} onValueChange={(value) => setFormBrand({ ...formBrand, state_type_id: value })}>
    //             <SelectTrigger>
    //               <SelectValue placeholder="Seleccionar estado" />
    //             </SelectTrigger>
    //             <SelectContent>
    //               <SelectItem value="1">Activa</SelectItem>
    //               <SelectItem value="2">Pendiente</SelectItem>
    //               <SelectItem value="3">Suspendida</SelectItem>
    //               <SelectItem value="4">Inactiva</SelectItem>
    //             </SelectContent>
    //           </Select>
    //         </div>
    //       </div>
    //       <DialogFooter>
    //         <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
    //           Cancelar
    //         </Button>
    //         <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white" onClick={handleSaveBrand}>
    //           {editingBrand ? 'Actualizar Marca' : 'Agregar Marca'}
    //         </Button>
    //       </DialogFooter>
    //     </DialogContent>
    //   </Dialog>
    // </div>
    <div>
      <p>hola que ases</p>
    </div>
  );
}
