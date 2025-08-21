import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Award, Star } from 'lucide-react';
import Image from 'next/image';

export default function CasosDeExito() {
  const casos = [
    {
      id: 1,
      empresa: 'TechFlow Solutions',
      industria: 'Tecnología',
      desafio: 'Rebranding completo y posicionamiento en mercado B2B',
      solucion: 'Estrategia integral de marca, nuevo diseño visual y campaña de lanzamiento',
      resultados: ['300% aumento en reconocimiento de marca', '150% incremento en leads cualificados', '85% mejora en percepción de marca'],
      tiempo: '6 meses',
      imagen: 'https://www.hausvoneden.de/wp-content/uploads/2020/05/smart-city.jpg',
      testimonial: 'BrandFlow transformó completamente nuestra presencia en el mercado. Su enfoque estratégico nos ayudó a diferenciarnos de la competencia.',
      cliente: 'María González',
      cargo: 'CEO, TechFlow Solutions',
    },
    {
      id: 2,
      empresa: 'Verde Orgánico',
      industria: 'Alimentación',
      desafio: 'Expansión a mercados internacionales con identidad coherente',
      solucion: 'Desarrollo de sistema de marca global y adaptación cultural',
      resultados: ['Presencia en 12 países nuevos', '200% crecimiento en ventas internacionales', '95% consistencia de marca global'],
      tiempo: '8 meses',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/960px-New_york_times_square-terabass.jpg',
      testimonial: 'La estrategia global de BrandFlow nos permitió mantener nuestra esencia mientras nos adaptábamos a diferentes culturas.',
      cliente: 'Carlos Mendoza',
      cargo: 'Director de Marketing, Verde Orgánico',
    },
    {
      id: 3,
      empresa: 'FinanceHub',
      industria: 'Fintech',
      desafio: 'Generar confianza en una startup financiera emergente',
      solucion: 'Construcción de marca confiable y estrategia de contenido educativo',
      resultados: ['500% aumento en usuarios registrados', '90% tasa de retención de clientes', '4.8/5 rating de confianza del usuario'],
      tiempo: '4 meses',
      imagen: 'https://earth.org/wp-content/uploads/2022/04/Untitled-design-2022-04-14T155317.295-1200x800.jpg',
      testimonial: 'BrandFlow nos ayudó a construir la confianza que necesitábamos para competir con bancos tradicionales.',
      cliente: 'Ana Rodríguez',
      cargo: 'Fundadora, FinanceHub',
    },
  ];

  const estadisticas = [
    { numero: '150+', descripcion: 'Proyectos Exitosos', icono: Award },
    { numero: '98%', descripcion: 'Satisfacción del Cliente', icono: Star },
    { numero: '250%', descripcion: 'ROI Promedio', icono: TrendingUp },
    { numero: '50+', descripcion: 'Industrias Atendidas', icono: Users },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-[#F36DA3] text-white hover:bg-[#F36DA3]/90 mb-4">Casos de Éxito</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-6">
              Historias de <span className="text-[#E7324A]">Transformación</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">Descubre cómo hemos ayudado a empresas de diferentes industrias a transformar sus marcas y alcanzar resultados extraordinarios.</p>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="py-16 bg-gradient-to-r from-[#E7324A] to-[#F36DA3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {estadisticas.map((stat, index) => {
              const IconComponent = stat.icono;
              return (
                <div key={index} className="text-center text-white">
                  <IconComponent className="w-8 h-8 mx-auto mb-4 opacity-90" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.numero}</div>
                  <div className="text-sm md:text-base opacity-90">{stat.descripcion}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Casos de Éxito */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">Casos Destacados</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Cada proyecto es único. Conoce los desafíos, soluciones y resultados de algunas de nuestras colaboraciones más exitosas.</p>
          </div>

          <div className="space-y-16">
            {casos.map((caso, index) => (
              <Card key={caso.id} className="overflow-hidden border-0 shadow-lg">
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Imagen */}
                  <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <Image src={caso.imagen || '/placeholder.svg'} alt={caso.empresa} width={600} height={400} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Contenido */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                      <Badge variant="outline" className="border-[#E7324A] text-[#E7324A]">
                        {caso.industria}
                      </Badge>
                      <span className="text-sm text-gray-500">{caso.tiempo}</span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-[#0A0A0A] mb-4">{caso.empresa}</h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-[#E7324A] mb-2">Desafío</h4>
                        <p className="text-gray-600">{caso.desafio}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#E7324A] mb-2">Solución</h4>
                        <p className="text-gray-600">{caso.solucion}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#E7324A] mb-3">Resultados</h4>
                        <ul className="space-y-2">
                          {caso.resultados.map((resultado, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-600">
                              <div className="w-2 h-2 bg-[#F36DA3] rounded-full flex-shrink-0" />
                              {resultado}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Testimonial */}
                      <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#E7324A]">
                        <p className="text-gray-700 italic mb-4">{`"${caso.testimonial}"`}</p>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#E7324A] rounded-full flex items-center justify-center text-white font-semibold">{caso.cliente.charAt(0)}</div>
                          <div>
                            <div className="font-semibold text-[#0A0A0A]">{caso.cliente}</div>
                            <div className="text-sm text-gray-500">{caso.cargo}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para ser nuestro próximo caso de éxito?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Cada gran marca comenzó con una visión. Permítenos ayudarte a transformar la tuya en una historia de éxito.</p>
        </div>
      </div>
    </div>
  );
}
