import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Target, TrendingUp, Users, Megaphone, BarChart3, Lightbulb, CheckCircle } from 'lucide-react';

export default function ServiciosPage() {
  const servicios = [
    {
      icon: Palette,
      title: 'Identidad Visual',
      description: 'Creamos identidades visuales únicas que reflejan la esencia de tu marca',
      features: ['Diseño de logotipo', 'Manual de marca', 'Paleta de colores', 'Tipografías corporativas'],
      precio: 'Desde $2,500',
      popular: false,
    },
    {
      icon: Target,
      title: 'Estrategia de Marca',
      description: 'Desarrollamos estrategias integrales para posicionar tu marca en el mercado',
      features: ['Análisis de mercado', 'Posicionamiento', 'Propuesta de valor', 'Arquitectura de marca'],
      precio: 'Desde $3,500',
      popular: true,
    },
    {
      icon: TrendingUp,
      title: 'Rebranding',
      description: 'Renovamos y modernizamos marcas existentes para mantenerlas relevantes',
      features: ['Auditoría de marca', 'Rediseño visual', 'Migración de identidad', 'Comunicación del cambio'],
      precio: 'Desde $4,000',
      popular: false,
    },
    {
      icon: Users,
      title: 'Experiencia de Cliente',
      description: 'Optimizamos cada punto de contacto para crear experiencias memorables',
      features: ['Customer journey', 'Touchpoints', 'Protocolos de servicio', 'Capacitación de equipo'],
      precio: 'Desde $2,800',
      popular: false,
    },
    {
      icon: Megaphone,
      title: 'Marketing Digital',
      description: 'Implementamos estrategias digitales para amplificar tu presencia de marca',
      features: ['Redes sociales', 'Content marketing', 'SEO/SEM', 'Email marketing'],
      precio: 'Desde $1,800',
      popular: false,
    },
    {
      icon: BarChart3,
      title: 'Monitoreo de Marca',
      description: 'Seguimiento continuo del rendimiento y percepción de tu marca',
      features: ['Métricas de brand awareness', 'Análisis de competencia', 'Reportes mensuales', 'Recomendaciones'],
      precio: 'Desde $1,200',
      popular: false,
    },
  ];

  const paquetes = [
    {
      name: 'Startup',
      precio: '$5,999',
      descripcion: 'Perfecto para nuevas empresas que necesitan establecer su identidad',
      servicios: ['Identidad Visual', 'Estrategia Básica', 'Marketing Digital Inicial'],
      destacado: false,
    },
    {
      name: 'Growth',
      precio: '$12,999',
      descripcion: 'Para empresas en crecimiento que buscan expandir su presencia',
      servicios: ['Identidad Visual', 'Estrategia Completa', 'Marketing Digital', 'Experiencia de Cliente'],
      destacado: true,
    },
    {
      name: 'Enterprise',
      precio: '$24,999',
      descripcion: 'Solución integral para empresas establecidas',
      servicios: ['Todos los servicios', 'Rebranding', 'Monitoreo continuo', 'Soporte prioritario'],
      destacado: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#E7324A] to-[#F36DA3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/20 text-white border-white/30 mb-6">Servicios Profesionales</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Nuestros Servicios</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">Ofrecemos soluciones integrales de gestión de marca para impulsar tu negocio hacia el éxito</p>
        </div>
      </section>

      {/* Servicios Individuales */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">Servicios Especializados</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Cada servicio está diseñado para abordar aspectos específicos de tu marca</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio, index) => (
              <Card key={index} className="relative hover:shadow-lg transition-shadow border-gray-200">
                {servicio.popular && <Badge className="absolute -top-3 left-6 bg-[#E7324A] text-white">Más Popular</Badge>}
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#E7324A]/10 rounded-lg">
                      <servicio.icon className="h-6 w-6 text-[#E7324A]" />
                    </div>
                    <div>
                      <CardTitle className="text-[#0A0A0A]">{servicio.title}</CardTitle>
                      <div className="text-sm font-semibold text-[#F36DA3]">{servicio.precio}</div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600">{servicio.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {servicio.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-[#E7324A] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Paquetes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">Paquetes Integrales</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Combina múltiples servicios y ahorra hasta un 30% con nuestros paquetes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {paquetes.map((paquete, index) => (
              <Card key={index} className={`relative ${paquete.destacado ? 'border-[#E7324A] shadow-lg scale-105' : 'border-gray-200'}`}>
                {paquete.destacado && <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#E7324A] text-white">Recomendado</Badge>}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-[#0A0A0A]">{paquete.name}</CardTitle>
                  <div className="text-3xl font-bold text-[#E7324A] my-4">{paquete.precio}</div>
                  <CardDescription className="text-gray-600">{paquete.descripcion}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {paquete.servicios.map((servicio, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="h-4 w-4 text-[#E7324A] flex-shrink-0" />
                        {servicio}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0A0A0A] to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Lightbulb className="h-16 w-16 text-[#F36DA3] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿No encuentras lo que buscas?</h2>
          <p className="text-xl text-gray-300 mb-8">Creamos soluciones personalizadas para cada cliente. Cuéntanos tu proyecto y diseñaremos una propuesta única.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#E7324A] hover:bg-[#E7344C] text-white cursor-pointer">
              Solicitar Propuesta Personalizada
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0A0A0A] bg-transparent cursor-pointer">
              Agendar Consulta
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
