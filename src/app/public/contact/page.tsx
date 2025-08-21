import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="bg-[#F36DA3] text-white hover:bg-[#E7324A] mb-4">Contacto</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-6">
            Hablemos de tu <span className="text-[#E7324A]">marca</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">¿Listo para llevar tu marca al siguiente nivel? Nuestro equipo de expertos está aquí para ayudarte a crear una estrategia de marca exitosa.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#0A0A0A]">Envíanos un mensaje</CardTitle>
              <CardDescription className="text-gray-600">Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                    Nombre
                  </label>
                  <Input id="firstName" placeholder="Tu nombre" className="border-gray-300 focus:border-[#E7324A] focus:ring-[#E7324A]" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                    Apellido
                  </label>
                  <Input id="lastName" placeholder="Tu apellido" className="border-gray-300 focus:border-[#E7324A] focus:ring-[#E7324A]" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="tu@email.com" className="border-gray-300 focus:border-[#E7324A] focus:ring-[#E7324A]" />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Empresa (opcional)
                </label>
                <Input id="company" placeholder="Nombre de tu empresa" className="border-gray-300 focus:border-[#E7324A] focus:ring-[#E7324A]" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Asunto
                </label>
                <Input id="subject" placeholder="¿En qué podemos ayudarte?" className="border-gray-300 focus:border-[#E7324A] focus:ring-[#E7324A]" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Mensaje
                </label>
                <Textarea id="message" placeholder="Cuéntanos más sobre tu proyecto..." rows={5} className="border-gray-300 focus:border-[#E7324A] focus:ring-[#E7324A]" />
              </div>

              <Button className="w-full bg-[#E7324A] hover:bg-[#E7344C] text-white font-semibold py-3 cursor-pointer">
                <Send className="w-4 h-4 mr-2" />
                Enviar mensaje
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#0A0A0A]">Información de contacto</CardTitle>
                <CardDescription className="text-gray-600">Múltiples formas de ponerte en contacto con nosotros.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#F36DA3] p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A] mb-1">Email</h3>
                    <p className="text-gray-600">hola@brandflow.com</p>
                    <p className="text-gray-600">soporte@brandflow.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#E7324A] p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A] mb-1">Teléfono</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#F36DA3] p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A] mb-1">Oficina</h3>
                    <p className="text-gray-600">123 Brand Street</p>
                    <p className="text-gray-600">Creative District, CD 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#E7324A] p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A] mb-1">Horarios</h3>
                    <p className="text-gray-600">Lun - Vie: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sáb: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#E7324A] to-[#F36DA3] text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">¿Necesitas ayuda urgente?</h3>
                <p className="mb-6 opacity-90">Para consultas urgentes o soporte técnico inmediato, contáctanos directamente.</p>
                <Button variant="outline" className="bg-white text-[#E7324A] border-white hover:bg-gray-100 cursor-pointer">
                  Llamar ahora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
