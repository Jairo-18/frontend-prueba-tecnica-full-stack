'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { RoleType, User, UsersResponse } from '../interface/user.interface';

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [formUser, setFormUser] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role_type_id: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // Función para obtener el nombre del rol por ID
  const getRoleName = (roleId: number): string => {
    switch (roleId) {
      case 1:
        return 'Usuario';
      case 2:
        return 'Administrador';
      case 3:
        return 'Moderador';
      default:
        return 'Desconocido';
    }
  };

  // Fetch de roles
  const fetchRoles = useCallback(async () => {
    setLoadingRoles(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/brand/role-types/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Error al cargar roles');
      const data: RoleType[] = await res.json();
      setRoles(data);
    } catch (err) {
      console.error(err);
      showMessage('Error al cargar roles ❌');
      // Si falla la API, usar roles por defecto
      setRoles([
        { roleTypeId: 1, name: 'Usuario', code: 'USE' },
        { roleTypeId: 2, name: 'Administrador', code: 'ADM' },
        { roleTypeId: 3, name: 'Moderador', code: 'MOD' },
      ]);
    } finally {
      setLoadingRoles(false);
    }
  }, [API_URL]);

  // Fetch de usuarios
  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const token = localStorage.getItem('token');
      const skip = (currentPage - 1) * perPage;
      const res = await fetch(`${API_URL}/users?skip=${skip}&limit=${perPage}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Error al cargar usuarios');
      const data: UsersResponse = await res.json();
      const usersArray: User[] = data.users || [];

      // Enriquecer usuarios con información del rol
      const usersWithRoleInfo = usersArray.map((user) => ({
        ...user,
        roleName: getRoleName(user.role_type_id),
      }));

      setUsers(usersWithRoleInfo);
      setTotalPages(data.pages || Math.ceil(data.total / perPage) || 1);
    } catch (err) {
      console.error(err);
      showMessage('Error al cargar usuarios ❌');
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  }, [currentPage, perPage, API_URL]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    if (roles.length > 0) {
      fetchUsers();
    }
  }, [fetchUsers, roles, currentPage]);

  const handleOpenAddDialog = () => {
    setEditingUser(null);
    setFormUser({
      fullName: '',
      username: '',
      email: '',
      password: '',
      role_type_id: 0,
    });
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
      setFormUser({
        fullName: data.fullName || '',
        username: data.username || '',
        email: data.email || '',
        password: '',
        role_type_id: data.role_type_id || 0,
      });

      setIsDialogOpen(true);
    } catch (err) {
      console.error(err);
      showMessage('Error al cargar usuario ❌');
    }
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSaveUser = async () => {
    // Validaciones
    if (!formUser.fullName.trim()) return showMessage('El nombre completo es requerido ❌');
    if (!formUser.username.trim()) return showMessage('El username es requerido ❌');
    if (!formUser.email.trim()) return showMessage('El email es requerido ❌');
    if (!isValidEmail(formUser.email)) return showMessage('El email no es válido ❌');
    if (!editingUser && !formUser.password.trim()) return showMessage('La contraseña es requerida ❌');
    if (!formUser.role_type_id || formUser.role_type_id === 0) {
      return showMessage('El rol es requerido ❌');
    }

    const token = localStorage.getItem('token');
    if (!token) return showMessage('No tienes autorización ❌');

    try {
      const payload = editingUser
        ? {
            fullName: formUser.fullName.trim(),
            username: formUser.username.trim(),
            email: formUser.email.trim(),
            role_type_id: formUser.role_type_id,
          }
        : {
            fullName: formUser.fullName.trim(),
            username: formUser.username.trim(),
            email: formUser.email.trim(),
            password: formUser.password,
            role_type_id: formUser.role_type_id,
          };

      const res = await fetch(editingUser ? `${API_URL}/users/${editingUser}` : `${API_URL}/users`, {
        method: editingUser ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || 'Error al guardar usuario');
      }

      showMessage(editingUser ? 'Usuario actualizado correctamente ✅' : 'Usuario agregado correctamente ✅');
      setIsDialogOpen(false);
      setFormUser({ fullName: '', username: '', email: '', password: '', role_type_id: 0 });
      await fetchUsers();
    } catch (err) {
      console.error(err);
      showMessage(err instanceof Error ? err.message : 'Error al guardar usuario ❌');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;

    const token = localStorage.getItem('token');
    if (!token) return showMessage('No tienes autorización ❌');

    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || 'Error al eliminar usuario');
      }

      showMessage('Usuario eliminado correctamente ✅');
      await fetchUsers();
    } catch (err) {
      console.error(err);
      showMessage(err instanceof Error ? err.message : 'Error al eliminar usuario ❌');
    }
  };

  const filteredUsers = users.filter((u) => {
    const name = u.fullName || '';
    const user = u.username || '';
    const email = u.email || '';
    const search = searchTerm || '';
    return name.toLowerCase().includes(search.toLowerCase()) || user.toLowerCase().includes(search.toLowerCase()) || email.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative">
      {message && <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow z-50">{message}</div>}

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-[#0A0A0A]">Panel Administrativo</h1>
            <div className="flex items-center space-x-2">
              <Link href="/admin/brand">
                <Button variant="outline" className="border-[#E7324A] text-[#E7324A] hover:bg-[#E7324A] hover:text-white bg-transparent cursor-pointer">
                  Gestionar Marcas
                </Button>
              </Link>
              <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white cursor-pointer" onClick={handleOpenAddDialog}>
                <Plus className="h-4 w-4 mr-2" /> Agregar Usuario
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Buscar usuarios..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre Completo</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingUsers ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Cargando usuarios...
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No se encontraron usuarios
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.fullName || user.username}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleName(user.role_type_id)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditUser(user.id)} className="cursor-pointer">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-700 cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-4 px-4 py-2">
            <Button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} variant="outline" className="cursor-pointer">
              Anterior
            </Button>
            <span className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </span>
            <Button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} variant="outline" className="cursor-pointer">
              Siguiente
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Nombre Completo *</Label>
              <Input value={formUser.fullName} onChange={(e) => setFormUser({ ...formUser, fullName: e.target.value })} placeholder="Ingresa el nombre completo" />
            </div>
            <div className="grid gap-2">
              <Label>Username *</Label>
              <Input value={formUser.username} onChange={(e) => setFormUser({ ...formUser, username: e.target.value })} placeholder="Ingresa el username" />
            </div>
            <div className="grid gap-2">
              <Label>Email *</Label>
              <Input type="email" value={formUser.email} onChange={(e) => setFormUser({ ...formUser, email: e.target.value })} placeholder="ejemplo@correo.com" />
            </div>
            {!editingUser && (
              <div className="grid gap-2">
                <Label>Password *</Label>
                <Input type="password" value={formUser.password} onChange={(e) => setFormUser({ ...formUser, password: e.target.value })} placeholder="Ingresa la contraseña" />
              </div>
            )}
            <div className="grid gap-2">
              <Label>Rol *</Label>
              <select value={formUser.role_type_id} onChange={(e) => setFormUser({ ...formUser, role_type_id: Number(e.target.value) })} className="border border-gray-300 rounded px-3 py-2 w-full">
                <option value={0}>Selecciona un rol</option>
                <option value={1}>Usuario</option>
                <option value={2}>Administrador</option>
                <option value={3}>Moderador</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="cursor-pointer">
              Cancelar
            </Button>
            <Button className="bg-[#E7324A] hover:bg-[#E7344C] text-white cursor-pointer" onClick={handleSaveUser}>
              {editingUser ? 'Actualizar Usuario' : 'Agregar Usuario'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
