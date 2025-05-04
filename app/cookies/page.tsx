import PageHeader from "@/components/page-header"
import Link from "next/link"

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Política de Cookies" />
      
      <div className="mt-12 prose prose-lg max-w-none">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md">
          <p className="mb-6 text-primary">
            Utilizamos cookies propias y de terceros para obtener datos estadísticos de la navegación de nuestros usuarios y 
            mejorar nuestros servicios. Si acepta o continúa navegando, consideramos que acepta su uso. Puede cambiar la 
            configuración u obtener más información aquí.
          </p>
          
          <p className="mb-6 text-primary">
            En cumplimiento con lo dispuesto en el artículo 22.2 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad 
            de la Información y de Comercio Electrónico, esta página web le informa, en esta sección, sobre la política de 
            recogida y tratamiento de cookies.
          </p>
          
          <h2 className="text-xl font-bold text-primary mt-8 mb-4">¿QUÉ SON LAS COOKIES?</h2>
          <p className="mb-6 text-primary">
            Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten 
            a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario 
            o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse 
            para reconocer al usuario.
          </p>
          
          <h2 className="text-xl font-bold text-primary mt-8 mb-4">¿QUÉ TIPOS DE COOKIES UTILIZA ESTA PÁGINA WEB?</h2>
          <p className="mb-4 text-primary">Esta página web utiliza los siguientes tipos de cookies:</p>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Cookies de análisis:</h3>
          <p className="mb-6 text-primary">
            Son aquéllas que bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así 
            realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado. Para ello 
            se analiza su navegación en nuestra página web con el fin de mejorar la oferta de productos o servicios que le ofrecemos.
          </p>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Cookies técnicas:</h3>
          <p className="mb-6 text-primary">
            Son aquellas que permiten al usuario la navegación a través del área restringida y la utilización de sus diferentes 
            funciones, como por ejemplo, llevar a cambio el proceso de compra de un artículo.
          </p>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Cookies de personalización:</h3>
          <p className="mb-6 text-primary">
            Son aquellas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas 
            en función de una serie de criterios en el terminal del usuario como por ejemplo serian el idioma o el tipo de navegador 
            a través del cual se conecta al servicio.
          </p>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Cookies publicitarias:</h3>
          <p className="mb-6 text-primary">
            Son aquéllas que, bien tratadas por esta web o por terceros, permiten gestionar de la forma más eficaz posible la oferta 
            de los espacios publicitarios que hay en la página web, adecuando el contenido del anuncio al contenido del servicio 
            solicitado o al uso que realice de nuestra página web. Para ello podemos analizar sus hábitos de navegación en Internet 
            y podemos mostrarle publicidad relacionada con su perfil de navegación.
          </p>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Cookies de publicidad comportamental:</h3>
          <p className="mb-6 text-primary">
            Son aquellas que permiten la gestión, de la forma más eficaz posible, de los espacios publicitarios que, en su caso, 
            el editor haya incluido en una página web, aplicación o plataforma desde la que presta el servicio solicitado. Este 
            tipo de cookies almacenan información del comportamiento de los visitantes obtenida a través de la observación continuada 
            de sus hábitos de navegación, lo que permite desarrollar un perfil específico para mostrar avisos publicitarios en 
            función del mismo.
          </p>
          
          <h2 className="text-xl font-bold text-primary mt-8 mb-4">COOKIES DE TERCEROS</h2>
          <p className="mb-6 text-primary">
            Esta página web utiliza servicios de terceros para recopilar información con fines estadísticos y de uso de la web. 
            Se usan cookies de DoubleClick para mejorar la publicidad que se incluye en el sitio web. Son utilizadas para orientar 
            la publicidad según el contenido que es relevante para un usuario, mejorando así la calidad de experiencia en el uso 
            del mismo.
          </p>
          
          <p className="mb-6 text-primary">
            En concreto, usamos los servicios de Google Adsense y de Google Analytics para nuestras estadísticas y publicidad. 
            Algunas cookies son esenciales para el funcionamiento del sitio, por ejemplo el buscador incorporado.
          </p>
          
          <p className="mb-6 text-primary">
            Nuestro sitio incluye otras funcionalidades proporcionadas por terceros. Usted puede fácilmente compartir el contenido 
            en redes sociales como Instagram, Twitter o Youtube, con los botones que hemos incluido a tal efecto.
          </p>
          
          <h2 className="text-xl font-bold text-primary mt-8 mb-4">DESACTIVAR LAS COOKIES</h2>
          <p className="mb-6 text-primary">
            Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones 
            del navegador instalado en su ordenador.
          </p>
          
          <p className="mb-6 text-primary">
            En la mayoría de los navegadores web se ofrece la posibilidad de permitir, bloquear o eliminar las cookies instaladas 
            en su equipo.
          </p>
          
          <p className="mb-4 text-primary">
            A continuación puede acceder a la configuración de los navegadores webs más frecuentes para aceptar, instalar o desactivar 
            las cookies:
          </p>
          
          <div className="mb-6">
            <ul className="list-disc pl-10">
              <li className="mb-2">
                <Link href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Configurar cookies en Google Chrome
                </Link>
              </li>
              <li className="mb-2">
                <Link href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Configurar cookies en Microsoft Edge
                </Link>
              </li>
              <li className="mb-2">
                <Link href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Configurar cookies en Mozilla Firefox
                </Link>
              </li>
              <li className="mb-2">
                <Link href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Configurar cookies en Safari (Apple)
                </Link>
              </li>
            </ul>
          </div>
          
          <h2 className="text-xl font-bold text-primary mt-8 mb-4">ADVERTENCIA SOBRE ELIMINAR COOKIES</h2>
          <p className="mb-6 text-primary">
            Usted puede eliminar y bloquear todas las cookies de este sitio, pero parte del sitio no funcionará o la calidad 
            de la página web puede verse afectada.
          </p>
          
          <p className="mb-6 text-primary">
            Si tiene cualquier duda acerca de nuestra política de cookies, puede contactar con esta página web a través de 
            nuestros canales de Contacto.
          </p>
        </div>
      </div>
    </div>
  )
}