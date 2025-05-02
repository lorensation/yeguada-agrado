-- Insert mock data for articles table

-- Make sure to run create_articles_table.sql first before running this file

-- Use the bowcreek-peek.jpg for all mock articles
INSERT INTO articles (title, slug, summary, content, image_url, published)
VALUES 
(
  'Nueva adquisición: Caballo PRE de élite se une a nuestra yeguada',
  'nueva-adquisicion-caballo-pre-elite',
  'Nos complace anunciar la llegada de un magnífico ejemplar Pura Raza Española a nuestras instalaciones, fortaleciendo nuestra línea genética.',
  '<h2>Un ejemplar extraordinario</h2>
  <p>Con gran orgullo anunciamos la incorporación a nuestra yeguada de un magnífico semental Pura Raza Española con líneas de sangre excepcionales. Este ejemplar de 6 años destaca por su impresionante morfología, movimientos elegantes y un temperamento dócil que lo hace perfecto para la reproducción.</p>
  <p>Proviene de una de las ganaderías más prestigiosas de Andalucía y ha sido adquirido tras un minucioso proceso de selección. Sus características físicas y su genealogía prometen aportar grandes mejoras a nuestra línea genética.</p>
  <h3>Características destacadas</h3>
  <ul>
    <li>Línea genética premiada en múltiples certámenes nacionales</li>
    <li>Excelente conformación ósea y muscular</li>
    <li>Temperamento equilibrado y noble</li>
    <li>Movimientos elegantes y cadenciosos</li>
  </ul>
  <p>Estará disponible para servicios de cubrición a partir del próximo mes. No duden en contactarnos para más información.</p>',
  'https://syfaiwgnspbngjetidej.supabase.co/storage/v1/object/public/images/bowcreek-peek.jpg',
  true
),
(
  'Éxito rotundo en el Campeonato Nacional de Morfología 2025',
  'exito-campeonato-nacional-morfologia-2025',
  'Nuestros ejemplares obtuvieron tres primeros premios en el Campeonato Nacional de Morfología celebrado en Sevilla.',
  '<h2>Reconocimiento a la excelencia</h2>
  <p>El pasado fin de semana, Yeguada Agrado participó en el prestigioso Campeonato Nacional de Morfología 2025 celebrado en las instalaciones de SICAB en Sevilla. Con gran orgullo podemos anunciar que nuestros ejemplares han sido premiados en tres categorías diferentes, consolidando nuestra posición como una de las yeguadas de referencia en España.</p>
  <p>El jurado, compuesto por expertos de renombre internacional, destacó la excelente conformación, movimientos y presencia de nuestros caballos, fruto de años de dedicación y un riguroso programa de cría selectiva.</p>
  <h3>Premios obtenidos</h3>
  <ul>
    <li>Primer premio en la categoría "Potras de 3 años" con nuestra yegua "Estrella de Agrado"</li>
    <li>Primer premio en la categoría "Sementales de 4-6 años" con nuestro caballo "Duque de Agrado"</li>
    <li>Premio especial a la mejor movilidad con "Rayo de Agrado"</li>
  </ul>
  <p>Queremos agradecer a todo el equipo su dedicación y profesionalidad, sin los cuales estos logros no serían posibles.</p>',
  'https://syfaiwgnspbngjetidej.supabase.co/storage/v1/object/public/images/bowcreek-peek.jpg',
  true
),
(
  'Nuevos servicios de doma y entrenamiento para 2025',
  'nuevos-servicios-doma-entrenamiento-2025',
  'Ampliamos nuestra oferta de servicios con nuevos programas de doma clásica y vaquera adaptados a diferentes niveles.',
  '<h2>Evolución en nuestros servicios</h2>
  <p>En Yeguada Agrado estamos en constante evolución para ofrecer los mejores servicios a nuestros clientes. A partir de marzo de 2025, ampliamos nuestra oferta con nuevos programas de doma clásica y vaquera, diseñados para adaptarse a diferentes niveles de experiencia y objetivos.</p>
  <p>Nuestro equipo de profesionales, con amplia experiencia en competiciones nacionales e internacionales, se encargará personalmente del entrenamiento de cada caballo, asegurando un progreso constante y respetando siempre el bienestar del animal.</p>
  <h3>Nuevos programas disponibles</h3>
  <ul>
    <li>Doma básica para potros (desbrave y primeras ayudas)</li>
    <li>Doma clásica nivel intermedio</li>
    <li>Doma clásica nivel avanzado</li>
    <li>Doma vaquera completa</li>
    <li>Preparación para competiciones</li>
  </ul>
  <p>Además, ofrecemos la posibilidad de impartir clases particulares para jinetes que deseen mejorar su técnica con sus propios caballos. Para más información sobre tarifas y disponibilidad, no duden en contactarnos.</p>',
  'https://syfaiwgnspbngjetidej.supabase.co/storage/v1/object/public/images/bowcreek-peek.jpg',
  true
),
(
  'Temporada de nacimientos 2025: Nuevos potros en Yeguada Agrado',
  'temporada-nacimientos-2025-nuevos-potros',
  'La temporada de partos ha sido un éxito con el nacimiento de seis saludables potros que ya corretean por nuestras instalaciones.',
  '<h2>Nueva generación de excelencia</h2>
  <p>La primavera ha llegado a Yeguada Agrado con una magnífica temporada de nacimientos. Nos complace anunciar que nuestras yeguas han dado a luz a seis saludables potros durante los últimos dos meses, todos ellos exhibiendo las características de excelencia que definen a nuestra ganadería.</p>
  <p>Cada uno de estos nuevos ejemplares representa el fruto de nuestro cuidadoso programa de cría, donde seleccionamos las mejores líneas genéticas para obtener caballos de morfología excepcional y temperamento equilibrado.</p>
  <h3>Nuestros nuevos potros</h3>
  <ul>
    <li>"Luna de Agrado" - Potra alazana, hija de Duque de Agrado y Estrella</li>
    <li>"Tornado de Agrado" - Potro tordo, hijo de Rayo y Dulcinea</li>
    <li>"Valiente de Agrado" - Potro castaño, hijo de Sultán y Mariposa</li>
    <li>"Bella de Agrado" - Potra torda, hija de Príncipe y Dama</li>
    <li>"Relámpago de Agrado" - Potro negro, hijo de Trueno y Aurora</li>
    <li>"Perla de Agrado" - Potra perlina, hija de Duque y Diamante</li>
  </ul>
  <p>Tanto las yeguas como los potros gozan de excelente salud y ya disfrutan de nuestros verdes pastos. En unos meses, comenzaremos con la fase inicial de su educación.</p>',
  'https://syfaiwgnspbngjetidej.supabase.co/storage/v1/object/public/images/bowcreek-peek.jpg',
  true
),
(
  'Jornada de puertas abiertas: Ven a conocer Yeguada Agrado',
  'jornada-puertas-abiertas-conoce-yeguada-agrado',
  'Organizamos una jornada especial para que el público pueda visitar nuestras instalaciones y conocer a nuestros ejemplares.',
  '<h2>Una experiencia única</h2>
  <p>El próximo sábado 24 de mayo, Yeguada Agrado abrirá sus puertas al público en una jornada especial diseñada para que los amantes de los caballos puedan conocer de cerca nuestro trabajo y nuestros ejemplares.</p>
  <p>Durante la visita, nuestros especialistas guiarán a los asistentes por las diferentes áreas de la yeguada, explicando nuestro programa de cría, las características de la raza Pura Raza Española y los cuidados específicos que requieren estos magníficos animales.</p>
  <h3>Actividades programadas</h3>
  <ul>
    <li>10:00 - Recepción y bienvenida</li>
    <li>10:30 - Visita guiada por las instalaciones</li>
    <li>12:00 - Exhibición de doma clásica</li>
    <li>13:30 - Presentación de nuestros sementales principales</li>
    <li>14:30 - Aperitivo campestre</li>
    <li>16:00 - Demostración de trabajo con potros jóvenes</li>
    <li>17:30 - Sesión de preguntas y respuestas con nuestros especialistas</li>
  </ul>
  <p>La entrada es gratuita, pero es necesario confirmar asistencia previamente a través de nuestro formulario de contacto o llamando al teléfono 123-456-789. ¡Les esperamos!</p>',
  'https://syfaiwgnspbngjetidej.supabase.co/storage/v1/object/public/images/bowcreek-peek.jpg',
  true
);