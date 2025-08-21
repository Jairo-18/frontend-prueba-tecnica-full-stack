'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, Edit, Trash2, Search } from 'lucide-react';
import { User } from '../interface/user.interface';

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [formUser, setFormUser] = useState({ name: '', user: '', email: '', password: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [message, setMessage] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const skip = (currentPage - 1) * perPage;
      const res = await fetch(`${API_URL}/users?skip=${skip}&limit=${perPage}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Error al cargar usuarios');
      const data = await res.json();
      const usersArray: User[] = Array.isArray(data) ? data : data.users || [];
      setUsers(usersArray);

      const totalItems = data.total || usersArray.length;
      setTotalPages(Math.ceil(totalItems / perPage) || 1);
    } catch (err) {
      console.error(err);
      showMessage('Error al cargar usuarios ❌');
      setUsers([]);
    }
  }, [currentPage, perPage, API_URL]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpenAddDialog = () => {
    setEditingUser(null);
    setFormUser({ name: '', user: '', email: '', password: '' });
    setIsDialogOpen(true);
  };

  const handleEditUser = async (userId: number) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/users/${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Error al cargar usuario');
      const data: User = await res.json();
      setEditingUser(userId);
      setFormUser({ name: data.name, user: data.user, email: data.email, password: '' });
      setIsDialogOpen(true);
    } catch (err) {
      console.error(err);
      showMessage('Error al cargar usuario ❌');
    }
  };

  const handleSaveUser = async () => {
    const token = localStorage.getItem('token');
    try {
      if (editingUser) {
        await fetch(`${API_URL}/users/${editingUser}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(formUser),
        });
        showMessage('Usuario actualizado correctamente ✅');
      } else {
        await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(formUser),
        });
        showMessage('Usuario agregado correctamente ✅');
      }
      setIsDialogOpen(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      showMessage('Error al guardar usuario ❌');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      showMessage('Usuario eliminado correctamente ✅');
      fetchUsers();
    } catch (err) {
      console.error(err);
      showMessage('Error al eliminar usuario ❌');
    }
  };

  const filteredUsers = users.filter((u) => (u.name || u.user).toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative">
      {message && <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow z-50">{message}</div>}

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-[#0A0A0A] hover:text-[#E7324A] transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver al inicio
              </Link>
              <h1 className="text-xl font-semibold text-[#0A0A0A]">Panel Administrativo</h1>
            </div>

            <div className="flex items-center space-x-2">
              <Link href="/admin/brand">
                <Button className="bg-[#743742] hover:bg-[#E7344C] text-white">
                  <Plus className="h-4 w-4 mr-2" /> Gestionar Marcas
                </Button>
              </Link>

              <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white" onClick={handleOpenAddDialog}>
                <Plus className="h-4 w-4 mr-2" /> Agregar Usuario
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Buscar usuarios..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre Completo</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name || user.user}</TableCell>
                  <TableCell>{user.user}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditUser(user.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <Button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              Anterior
            </Button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
              Siguiente
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Nombre Completo</Label>
              <Input value={formUser.name} onChange={(e) => setFormUser({ ...formUser, name: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Username</Label>
              <Input value={formUser.user} onChange={(e) => setFormUser({ ...formUser, user: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" value={formUser.email} onChange={(e) => setFormUser({ ...formUser, email: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input type="password" value={formUser.password} onChange={(e) => setFormUser({ ...formUser, password: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white" onClick={handleSaveUser}>
              {editingUser ? 'Actualizar Usuario' : 'Agregar Usuario'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
