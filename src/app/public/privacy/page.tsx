import { Shield, Eye, Lock, Users } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-[#0A0A0A] mb-2">Política de Privacidad</h1>
          <p className="text-gray-600">Última actualización: Enero 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Privacy Highlights */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-[#E7324A] mt-1" />
              <div>
                <h3 className="font-semibold text-[#0A0A0A] mb-1">Datos Seguros</h3>
                <p className="text-sm text-gray-600">Encriptamos y protegemos toda tu información</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Eye className="w-6 h-6 text-[#E7324A] mt-1" />
              <div>
                <h3 className="font-semibold text-[#0A0A0A] mb-1">Transparencia Total</h3>
                <p className="text-sm text-gray-600">Sabes exactamente qué datos recopilamos</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Lock className="w-6 h-6 text-[#E7324A] mt-1" />
              <div>
                <h3 className="font-semibold text-[#0A0A0A] mb-1">Control Total</h3>
                <p className="text-sm text-gray-600">Puedes modificar o eliminar tus datos</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="w-6 h-6 text-[#E7324A] mt-1" />
              <div>
                <h3 className="font-semibold text-[#0A0A0A] mb-1">No Compartimos</h3>
                <p className="text-sm text-gray-600">Nunca vendemos tu información personal</p>
              </div>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">1. Información que Recopilamos</h2>
            <p className="text-gray-700 mb-4">Recopilamos información que usted nos proporciona directamente:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>
                <strong>Información de cuenta:</strong> nombre, email, nombre de usuario
              </li>
              <li>
                <strong>Información de perfil:</strong> datos de empresa, preferencias
              </li>
              <li>
                <strong>Contenido:</strong> proyectos de marca, archivos subidos
              </li>
              <li>
                <strong>Comunicaciones:</strong> mensajes de soporte, feedback
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">2. Cómo Usamos su Información</h2>
            <p className="text-gray-700 mb-4">Utilizamos la información recopilada para:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Proporcionar y mejorar nuestros servicios</li>
              <li>Personalizar su experiencia en la plataforma</li>
              <li>Comunicarnos con usted sobre su cuenta</li>
              <li>Enviar actualizaciones importantes del servicio</li>
              <li>Analizar el uso para mejorar la funcionalidad</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">3. Compartir Información</h2>
            <p className="text-gray-700 mb-6">No vendemos, alquilamos ni compartimos su información personal con terceros para fines comerciales. Solo compartimos información en circunstancias limitadas como cumplimiento legal o protección de derechos.</p>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">4. Seguridad de Datos</h2>
            <p className="text-gray-700 mb-6">Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">5. Cookies y Tecnologías Similares</h2>
            <p className="text-gray-700 mb-6">Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el tráfico del sitio y personalizar el contenido. Puede controlar las cookies a través de la configuración de su navegador.</p>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">6. Sus Derechos</h2>
            <p className="text-gray-700 mb-4">Usted tiene derecho a:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Acceder a su información personal</li>
              <li>Corregir datos inexactos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Portabilidad de datos</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">7. Retención de Datos</h2>
            <p className="text-gray-700 mb-6">Conservamos su información personal solo durante el tiempo necesario para cumplir con los propósitos descritos en esta política, a menos que la ley requiera un período de retención más largo.</p>

            <h2 className="text-xl font-semibold text-[#E7324A] mb-4">8. Contacto</h2>
            <p className="text-gray-700 mb-6">
              Para preguntas sobre esta política de privacidad o para ejercer sus derechos, contáctenos en:
              <span className="text-[#E7324A] font-medium"> privacy@brandflow.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
