import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Users, BarChart3, Shield, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-[#ea9696]">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <Badge className="mb-6 bg-[#F36DA3]/10 text-[#E7324A] border-[#F36DA3]/20 hover:bg-[#F36DA3]/20">✨ Plataforma líder en gestión de marcas</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-[#0A0A0A] mb-6 leading-tight">
                Transforma tu marca en una
                <span className="text-[#E7324A]"> experiencia memorable</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">Gestiona, analiza y potencia tu marca con herramientas inteligentes que te ayudan a crear conexiones auténticas con tu audiencia.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth/login">
                  <Button size="lg" className="bg-[#E7324A] hover:bg-[#E7344C] text-white px-8 py-3 text-lg cursor-pointer">
                    Comenzar Gratis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F36DA3]/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E7324A]/5 rounded-full blur-3xl -z-10"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">Todo lo que necesitas para gestionar tu marca</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Herramientas poderosas diseñadas para hacer crecer tu marca de manera inteligente y eficiente.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-[#E7324A]/30 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#E7324A]/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-[#E7324A]" />
                  </div>
                  <CardTitle className="text-[#0A0A0A]">Automatización Inteligente</CardTitle>
                  <CardDescription>Automatiza tareas repetitivas y enfócate en lo que realmente importa: hacer crecer tu marca.</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-[#E7324A]/30 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#F36DA3]/10 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-[#F36DA3]" />
                  </div>
                  <CardTitle className="text-[#0A0A0A]">Analytics Avanzados</CardTitle>
                  <CardDescription>Obtén insights profundos sobre el rendimiento de tu marca con métricas que realmente importan.</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-[#E7324A]/30 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#E7344C]/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-[#E7344C]" />
                  </div>
                  <CardTitle className="text-[#0A0A0A]">Gestión de Audiencia</CardTitle>
                  <CardDescription>Conoce a tu audiencia como nunca antes y crea experiencias personalizadas que conecten.</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-[#E7324A]/30 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#F36DA3]/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-[#F36DA3]" />
                  </div>
                  <CardTitle className="text-[#0A0A0A]">Protección de Marca</CardTitle>
                  <CardDescription>Monitorea y protege tu marca en tiempo real con alertas inteligentes y análisis de reputación.</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-[#E7324A]/30 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#E7324A]/10 rounded-lg flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-[#E7324A]" />
                  </div>
                  <CardTitle className="text-[#0A0A0A]">Experiencia Premium</CardTitle>
                  <CardDescription>Interfaz intuitiva y soporte 24/7 para que nunca tengas que preocuparte por nada más.</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-[#E7324A]/30 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#E7344C]/10 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-[#E7344C]" />
                  </div>
                  <CardTitle className="text-[#0A0A0A]">Resultados Garantizados</CardTitle>
                  <CardDescription>Metodología probada que ha ayudado a más de 10,000 marcas a alcanzar sus objetivos.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#E7324A] to-[#E7344C]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para transformar tu marca?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Únete a miles de empresas que ya están potenciando sus marcas con BrandFlow. Comienza tu prueba gratuita hoy mismo.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/login">
                <Button size="lg" className="bg-white text-[#E7324A] hover:bg-gray-100 px-8 py-3 text-lg font-semibold cursor-pointer">
                  Comenzar Prueba Gratuita
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0A0A0A] text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#E7324A] to-[#F36DA3] rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">BrandFlow</span>
                </div>
                <p className="text-gray-400">La plataforma líder para la gestión inteligente de marcas.</p>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 BrandFlow. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
