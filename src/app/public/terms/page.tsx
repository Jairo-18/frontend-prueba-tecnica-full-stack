import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/auth/login">
            <Button variant="ghost" className="mb-4 text-[#0A0A0A] hover:bg-[#F36DA3]/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-[#0A0A0A] mb-2">Términos y Condiciones</h1>
          <p className="text-gray-600">Última actualización: Enero 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">1. Aceptación de los Términos</h2>
            <p className="text-gray-700 mb-6">Al acceder y utilizar BrandFlow, usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.</p>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">2. Descripción del Servicio</h2>
            <p className="text-gray-700 mb-6">BrandFlow es una plataforma de gestión de marcas que permite a los usuarios crear, administrar y optimizar sus estrategias de marca. Proporcionamos herramientas para el análisis de marca, gestión de identidad visual y seguimiento de rendimiento.</p>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">3. Registro y Cuenta de Usuario</h2>
            <p className="text-gray-700 mb-4">Para utilizar ciertos aspectos del servicio, debe registrarse y crear una cuenta. Usted es responsable de:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Proporcionar información precisa y actualizada</li>
              <li>Mantener la seguridad de su contraseña</li>
              <li>Todas las actividades que ocurran bajo su cuenta</li>
              <li>Notificar inmediatamente cualquier uso no autorizado</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">4. Uso Aceptable</h2>
            <p className="text-gray-700 mb-4">Usted se compromete a no utilizar el servicio para:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Actividades ilegales o no autorizadas</li>
              <li>Violar derechos de propiedad intelectual</li>
              <li>Transmitir contenido malicioso o dañino</li>
              <li>Interferir con el funcionamiento del servicio</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">5. Propiedad Intelectual</h2>
            <p className="text-gray-700 mb-6">Todo el contenido, características y funcionalidad del servicio son propiedad de BrandFlow y están protegidos por derechos de autor, marcas comerciales y otras leyes de propiedad intelectual.</p>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">6. Limitación de Responsabilidad</h2>
            <p className="text-gray-700 mb-6">BrandFlow no será responsable de daños indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar el servicio.</p>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">7. Modificaciones</h2>
            <p className="text-gray-700 mb-6">Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.</p>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">8. Contacto</h2>
            <p className="text-gray-700 mb-6">
              Si tiene preguntas sobre estos términos y condiciones, puede contactarnos en:
              <span className="text-[#E7324A] font-medium"> legal@brandflow.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
