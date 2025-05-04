import PageHeader from "@/components/page-header"

export default function PoliticaPrivacidadPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Política de Privacidad" />
      
      <div className="mt-12 prose prose-lg max-w-none">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-primary mb-6">Información General</h2>
          
          <p className="mb-4">
            AGRADO, S.L., se reserva el derecho de modificar cualquier tipo de información que pudiera aparecer en el sitio web, 
            sin que exista obligación de preavisar o poner en conocimiento de los usuarios dichas obligaciones, entendiéndose como
            suficiente con la publicación en el sitio web de AGRADO, S.L.
          </p>
          
          <h2 className="text-xl font-bold text-primary mt-8 mb-4">Datos Identificativos</h2>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Denominación social:</strong> AGRADO, S.L.</li>
            <li><strong>Nombre comercial:</strong> CUADRA AGRADO</li>
            <li><strong>NIF:</strong> B28181329</li>
            <li><strong>Domicilio:</strong> Ctra. M507, km. 20,500</li>
            <li><strong>Email:</strong> yeguada@agrado.es</li>
          </ul>
          
          <h2 className="text-xl font-bold text-primary mt-8 mb-4">Objeto</h2>
          <p className="mb-6">
            A través del Sitio Web, les ofrecemos a los Usuarios la posibilidad de acceder a la información 
            de nuestra cuadra de competición de caballos de carreras dentro del territorio nacional e internacional.
          </p>
          
          <h2 className="text-xl font-bold text-primary mt-8 mb-4">Privacidad y Tratamiento de Datos</h2>
          <p className="mb-6">
            Cuando para el acceso a determinados contenidos o servicio sea necesario facilitar datos de carácter personal, 
            los Usuarios garantizarán su veracidad, exactitud, autenticidad y vigencia. La empresa dará a dichos datos 
            el tratamiento automatizado que corresponda en función de su naturaleza o finalidad, en los términos indicados 
            en la sección de Política de Privacidad.
          </p>
          
          <h2 className="text-xl font-bold text-primary mt-8 mb-4">Protección de Datos</h2>
          <p className="mb-6">
            Para utilizar algunos de los Servicios, el Usuario debe proporcionar previamente ciertos datos de 
            carácter personal. La empresa tratará automatizadamente estos datos y aplicará las correspondientes 
            medidas de seguridad, todo ello en cumplimiento del RGPD, LOPDGDD y LSSI. El Usuario puede acceder a 
            la política seguida en el tratamiento de los datos personales, así como el establecimiento de las finalidades 
            previamente establecidas, en las condiciones definidas en la Política de Privacidad.
          </p>
          
          <h2 className="text-xl font-bold text-primary mt-8 mb-4">Declaraciones y Garantías</h2>
          <p className="mb-6">
            En general, los contenidos y servicios ofrecidos en el Espacio Web tienen carácter meramente informativo. 
            Por consiguiente, al ofrecerlos, no se otorga garantía ni declaración alguna en relación con los contenidos 
            y servicios ofrecidos en el Espacio web, incluyendo, a título enunciativo, garantías de licitud, fiabilidad, 
            utilidad, veracidad, exactitud, o comerciabilidad, salvo en la medida en que por ley no puedan excluirse 
            tales declaraciones y garantías.
          </p>
          
          <h2 className="text-xl font-bold text-primary mt-8 mb-4">Fuerza Mayor</h2>
          <p className="mb-6">
            La empresa no será responsable en todo en caso de imposibilidad de prestar servicio, si ésta se debe a 
            interrupciones prolongadas del suministro eléctrico, líneas de telecomunicaciones, conflictos sociales, 
            huelgas, rebelión, explosiones, inundaciones, actos y omisiones del Gobierno, y en general todos los 
            supuestos de fuerza mayor o de caso fortuito.
          </p>
          
          <h2 className="text-xl font-bold text-primary mt-8 mb-4">Resolución de Controversias. Ley Aplicable y Jurisdicción</h2>
          <p className="mb-6">
            Las presentes Condiciones Generales de Uso, así como el uso del Espacio Web, se regirán por la legislación española. 
            Para la resolución de cualquier controversia las partes se someterán a los Juzgados y Tribunales del domicilio 
            social del Responsable del sitio web.
          </p>
          
          <p className="mb-6">
            En el supuesto de que cualquier estipulación de las presentes Condiciones Generales de Uso resultara inexigible 
            o nula en virtud de la legislación aplicable o como consecuencia de una resolución judicial o administrativa, 
            dicha inexigibilidad o nulidad no hará que las presentes Condiciones Generales de Uso resulten inexigibles o 
            nulas en su conjunto. En dichos casos, la empresa procederá a la modificación o sustitución de dicha estipulación 
            por otra que sea válida y exigible y que, en la medida de lo posible, consiga el objetivo y pretensión reflejados 
            en la estipulación original.
          </p>
          
          <h2 className="text-xl font-bold text-primary mt-8 mb-4">Contacto</h2>
          <p>
            Si tiene alguna duda sobre nuestra política de privacidad, puede contactarnos a través del correo electrónico 
            yeguada@agrado.es o por teléfono al +34 616 05 39 04.
          </p>
        </div>
      </div>
    </div>
  )
}