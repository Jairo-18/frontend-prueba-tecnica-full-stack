'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Check, FileText, ClipboardList } from 'lucide-react';
import { User } from '@/app/admin/interface/user.interface';
import { BrandData } from '../interface/interface';
import { useRouter } from 'next/navigation';

export default function TramitarMarca() {
  const [currentStep, setCurrentStep] = useState(1);
  const [brandData, setBrandData] = useState<BrandData>({
    brand_id: 0,
    brand_title: '',
    state_type_id: 2,
    user_id: 0,
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const steps = [
    { number: 1, title: 'Título de la Marca', icon: FileText },
    { number: 2, title: 'Titular' }, // sin icono: lo manejo para no crashear
    { number: 3, title: 'Resumen', icon: ClipboardList },
  ];

  // ---- Helpers ----
  const showMessage = (msg: string, isError: boolean = false) => {
    setMessage(isError ? `❌ ${msg}` : `✅ ${msg}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const getStoredUserId = (): number | null => {
    try {
      const rawUserData = localStorage.getItem('userData');
      if (rawUserData) {
        const parsed = JSON.parse(rawUserData);
        if (parsed?.user?.id) return Number(parsed.user.id);
        if (parsed?.id) return Number(parsed.id);
      }
      const rawCurrentUser = localStorage.getItem('currentUser');
      if (rawCurrentUser) {
        const parsed = JSON.parse(rawCurrentUser);
        if (parsed?.id) return Number(parsed.id);
      }
      const rawUserId = localStorage.getItem('user_id');
      if (rawUserId) return Number(rawUserId);
    } catch {
      // ignore parse errors
    }
    return null;
  };

  // Obtener usuario actual desde localStorage y luego desde la API /users/{user_id}
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          showMessage('No tienes autorización. Inicia sesión primero.', true);
          setLoadingUser(false);
          return;
        }

        const uid = getStoredUserId();
        if (!uid || Number.isNaN(uid)) {
          showMessage('No se encontró el ID de usuario en tu sesión.', true);
          setLoadingUser(false);
          return;
        }

        const res = await fetch(`${API_URL}/users/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.detail || err.message || 'Error al obtener datos del usuario');
        }

        const userData: User = await res.json();
        setCurrentUser(userData);
        setBrandData((prev) => ({ ...prev, user_id: userData.id }));
      } catch (err) {
        console.error('Error fetching user:', err);
        showMessage('Error al cargar datos del usuario', true);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, [API_URL]);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((s) => s + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('No tienes autorización. Inicia sesión primero.', true);
        return;
      }
      if (!currentUser) {
        showMessage('Error: No se pudo obtener información del usuario', true);
        return;
      }

      const payload = {
        ...brandData,
        user_id: currentUser.id, // asegurar id correcto
      };

      const res = await fetch(`${API_URL}/brand/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(responseData.detail || responseData.message || `Error ${res.status}: ${res.statusText}`);
      }

      showMessage('¡Marca creada exitosamente! ✅');
      // Reset
      setBrandData({
        brand_id: 0,
        brand_title: '',
        state_type_id: 2,
        user_id: currentUser.id,
      });
      setCurrentStep(1);
      router.push('/user/brand-panel');
    } catch (err) {
      console.error('Error creating brand:', err);
      showMessage(err instanceof Error ? err.message : 'Error al crear la marca', true);
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return brandData.brand_title.trim().length > 0;
      case 2:
        return currentUser !== null;
      case 3:
        return true;
      default:
        return false;
    }
  };

  // ---- UI ----
  if (loadingUser) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E7324A] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información del usuario...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: No se pudo cargar la información del usuario</p>
          <Link href="/auth/login">
            <Button className="bg-[#E7324A] hover:bg-[#F36DA3] text-white">Ir al Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Message Notification */}
      {message && <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow z-50 ${message.includes('❌') ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>{message}</div>}

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/user/brand-panel">
              <Button variant="ghost" size="sm" className="text-[#E7324A] hover:bg-[#E7324A] hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Ver Mis Marcas
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#0A0A0A]">Tramitar Nueva Marca</h1>
              <p className="text-gray-600">Complete los pasos para registrar su marca</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                        ${isCompleted ? 'bg-[#E7324A] border-[#E7324A] text-white' : isActive ? 'bg-[#F36DA3] border-[#F36DA3] text-white' : 'bg-white border-gray-300 text-gray-400'}
                      `}
                    >
                      {isCompleted ? <Check className="h-6 w-6" /> : Icon ? <Icon className="h-6 w-6" /> : <span className="font-semibold">{step.number}</span>}
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-sm font-medium ${isActive ? 'text-[#E7324A]' : 'text-gray-500'}`}>Paso {step.number}</p>
                      <p className={`text-xs ${isActive ? 'text-[#0A0A0A]' : 'text-gray-400'}`}>{step.title}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && <div className={`flex-1 h-0.5 mx-4 transition-all ${currentStep > step.number ? 'bg-[#E7324A]' : 'bg-gray-300'}`} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#E7324A] to-[#F36DA3] text-white">
            <CardTitle className="text-xl">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription className="text-white/90">
              {currentStep === 1 && 'Ingrese el nombre de la marca que desea registrar'}
              {currentStep === 2 && 'Confirme los datos del titular de la marca'}
              {currentStep === 3 && 'Revise la información antes de enviar'}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            {/* Step 1: Título de la Marca */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="brand_title" className="text-base font-medium text-[#0A0A0A]">
                    Nombre de la Marca *
                  </Label>
                  <Input id="brand_title" type="text" placeholder="Ej: Mi Marca Innovadora" value={brandData.brand_title} onChange={(e) => setBrandData({ ...brandData, brand_title: e.target.value })} className="mt-2 text-lg py-3" />
                  <p className="text-sm text-gray-500 mt-2">Ingrese el nombre exacto como desea que aparezca registrado</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Consejos para el nombre de marca:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Debe ser único y distintivo</li>
                    <li>• Evite nombres genéricos o descriptivos</li>
                    <li>• Verifique que no existan marcas similares</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 2: Titular */}
            {currentStep === 2 && currentUser && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#0A0A0A] mb-4">Datos del Titular</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Nombre Completo</Label>
                      <p className="text-lg font-medium text-[#0A0A0A] mt-1">{currentUser.fullName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Email</Label>
                      <p className="text-lg font-medium text-[#0A0A0A] mt-1">{currentUser.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Username</Label>
                      <p className="text-lg font-medium text-[#0A0A0A] mt-1">@{currentUser.username}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">ID de Usuario</Label>
                      <p className="text-lg font-medium text-[#0A0A0A] mt-1">#{currentUser.id}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota:</strong> Los datos del titular se toman de su cuenta registrada. Si necesita modificar esta información, actualice su perfil antes de continuar.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Resumen */}
            {currentStep === 3 && currentUser && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border">
                  <h3 className="text-lg font-semibold text-[#0A0A0A] mb-6">Resumen de la Solicitud</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-600">Nombre de la Marca:</span>
                      <span className="text-lg font-semibold text-[#E7324A]">{brandData.brand_title}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-600">Titular:</span>
                      <span className="text-lg font-medium text-[#0A0A0A]">{currentUser.fullName}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-600">Email del Titular:</span>
                      <span className="text-lg font-medium text-[#0A0A0A]">{currentUser.email}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-600">Estado Inicial:</span>
                      <Badge className="bg-blue-100 text-blue-800">Sin Revisar</Badge>
                    </div>

                    <div className="flex justify-between items-center py-3">
                      <span className="font-medium text-gray-600">ID de Usuario:</span>
                      <span className="text-lg font-medium text-[#0A0A0A]">#{currentUser.id}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>¡Listo para enviar!</strong> Revise que toda la información sea correcta antes de proceder.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="border-[#E7324A] text-[#E7324A] hover:bg-[#E7324A] hover:text-white bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>

          {currentStep < 3 ? (
            <Button onClick={handleNext} disabled={!isStepValid()} className="bg-[#E7324A] hover:bg-[#F36DA3] text-white">
              Siguiente
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading || !currentUser} className="bg-gradient-to-r from-[#E7324A] to-[#F36DA3] hover:from-[#F36DA3] hover:to-[#E7324A] text-white px-8">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Enviar Solicitud
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
