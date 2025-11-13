import { notFound } from "next/navigation"
import SementalHero from "@/components/semental-hero"
import SementalTabs from "@/components/semental-tabs"

interface PageParams {
  id: string;
} 

// Updated props interface for Next.js App Router dynamic routes
interface SementalPageProps {
  params: Promise<PageParams>;
}

// Make the component async to properly handle dynamic params
export default async function SementalPage({ params }: SementalPageProps) {
  // Await the params to satisfy Next.js requirements
  const { id } = await params
  
  const sementales = [
    {
      id: "bowcreek",
      name: "BOW CREEK",
      tagline: "SHAMARDAL X BENEVENTA (MOST WELCOME)",
      fee: "2.500€ PV",
      year: "2023",
      image: "/sementales/bowcreek/hero.jpg",
      description: "Precocidad y velocidad asegurada",
      breed: "Pura Sangre Inglés",
      color: "Castaño",
      height: "1,65m",
      born: "2011",
      origin: "SHAMARDAL X BENEVENTA (MOST WELCOME)",
      achievements: [],
      profile:
        `**BOW CREEK** es hijo de **SHAMARDAL**, uno de los mejores caballos y sementales del siglo XXI y padre de sementales primer nivel mundial como **LOPE DE VEGA**, **BLUE POINT**, **PINATUBO**, **VICTOR LUDORUM**, …\n\nSu historial deportivo está al alcance de muy pocos sementales en España. Millero internacional triple ganador de Grupo, destacó a 3 años ganando su primer **Grupo 2** en Gran Bretaña llamando la atención del gigante Godolphin, quien apostó por el brindándoles dos **Grupos 2** más en Irlanda y Australia.\n\nEn su primera producción como semental en Francia destacó con caballos como **BREIZH EAGLE** (3º Poule d'Essai des Poulains **G1** 2021 y múltiple ganador de Listed Race) y el incansable **WHAT'S UP** en España (**1º Gran Premio Cimera** – Poule de Potros 2021 y triple colocado de **Gran Premio** a 3 años).\n\nPrecocidad y velocidad asegurada.`,
      palmares: [
        {
          edad: "A 2 años",
          logros: ["1º EBF Maiden Stakes 2013 - 1400 m. Chester, Gran Bretaña"],
        },
        {
          edad: "A 3 años",
          logros: [
            "1º International Trial (Listed Race) 2014 – 1400 m. Lingfield, Gran Bretaña",
            "1º Boomerang Mile (Grupo 2) 2014 – 1600 m. Goodwood, Gran Bretaña",
            "1º Celebration Mile (Grupo 2) 2014 – 1600 m. Leopardstown, Irlanda",
            "3º Banhams Thouroughbred Stakes (Grupo 3) 2014 – 1600 m. Goodwood, Gran Bretaña",
          ],
        },
        {
          edad: "A 4 años",
          logros: ["2º Crystal Mile (Grupo 2) 2015 – 1600m. Moonee Valley, Australia"],
        },
        {
          edad: "A 5 años",
          logros: [
            "1º Peter Young Stakes (Grupo 2) 2016 -  1800 m. Caulfield, Australia",
            "4º Doncaster Mile (Grupo 1) 2016 – 1600 m. Randwick, Australia (batido por WINX)",
          ],
        },
      ],
      producciones: [
        {
          nombre: "SERIGRAPHE",
          año: "2020",
          origen: "BOW CREEK X ARCADAN (TÔT OU TARD)",
          ganancias: "688.000€",
          victorias: "11 Victorias – 12 Colocaciones",
          logros: [
            "1º Gran Premio LHAJ Mazgouri Mohamed 2024 - 1900 m. Casablanca, Marruecos",
            "⁠1º Gran Premio Nijinsky 2021 - 1900 m. Casablanca, Marruecos",
            "⁠3º Gran Premio des propriétaires 2021 - 1900 m. Casablanca, Marruecos"
          ],
          imagen: "/sementales/bowcreek/producciones/serigraphe.jpeg",
        },
        {
          nombre: "BREIZH EAGLE",
          año: "2018",
          origen: "BOW CREEK X BREIZH TOUCH (COUNTRY REEL)",
          ganancias: "213.160€",
          victorias: "9 Victorias – 9 Colocaciones",
          logros: [
            "Invicto en sus 3 salidas a 2 años",
            "3º Poule d'Essai des Poulains (Grupo 1) 2021 – 1600 m. Longchamp, Francia",
            "1º Prix Haras Haei Neuve (Listed Race) 2023 – 1600 m. Craon, Francia",
            "2º Prix Irish River (Listed Race) 2023 – 1400 m. Deauville, Francia",
            "3º Prix Luthier (Listed Race) 2023 – 1500 m. Deauville, Francia",
            "3º Prix Ranelagh (Listed Race) 2021 – 1600 m. Longchamp, Francia",
          ],
          imagen: "/sementales/bowcreek/producciones/breizh-eagle.jpg",
        },
        {
          nombre: "WORTH A TEAM",
          año: "2020",
          origen: "BOW CREEK X GRACIEUSE (MUHTATHIR)",
          ganancias: "189.550€",
          victorias: "8 Victorias – 15 Colocaciones",
          logros: [
            "2º Prix Durtain (Listed Race) 2024 – 3600 m. Compiegne, Francia",
            "3º Prix Stanley (Listed Race) 2023 – 3500 m. Auteuil, Francia",
            "4º Prix Aguado (Grupo 3)  2023 – 3500m. Auteuil, Francia",
          ],
          imagen: "/sementales/bowcreek/producciones/wortha.jpg",
        },
        {
          nombre: "WHAT'S UP",
          año: "2018",
          origen: "BOW CREEK X PERFECT BOUNTY (BAHAMIAN BOUNTY)",
          ganancias: "115.250€",
          victorias: "8 Victorias – 14 Colocaciones",
          logros: [
            "1º Gran Premio Cimera - Poule de Potros 2021 – 1600 m. Madrid, España",
            "3º Gran Premio Claudio Carudel 2021 – 1600 m. Madrid, España",
            "3º Gran Premio Gobierno Vasco 2021 – 1600 m. San Sebastián, España",
            "3º Gran Premio de la Hispanidad 2021 – 1600 m. Madrid, España",
          ],
          imagen: "/sementales/bowcreek/producciones/whatsup.jpg",
        },
        {
          nombre: "KALEOCREEK",
          año: "2021",
          origen: "BOW CREEK X BAMIYANE (KOUROUN)",
          ganancias: "84.160€",
          victorias: "4 Victorias – 20 Colocaciones",
          logros: [
            "Primer 2 años ganador en Europa en 2023",
            "1º Prix de Carqueiranne 2023 – 1000 m. Marseille Borely, Francia",
          ],
          imagen: "/sementales/bowcreek/producciones/kaleocreek.jpg",
        },
        {
          nombre: "YORKSHIRE TERRIER",
          año: "2021",
          origen: "BOW CREEK X YORKINDRED SPIRIT (SEA THE STARS)",
          ganancias: "18.000€",
          victorias: "2 Victorias – 0 Colocaciones",
          logros: [
            "Primer 2 años ganador en Gran Bretaña en 2023",
            "1º EBF Novice Stakes 2023 – 1000 m. Southwell, Gran Bretaña",
          ],
          imagen: "/sementales/bowcreek/producciones/yorkshire.jpg",
        },
      ],
      videoUrl: "https://youtu.be/OYYTGyhMz9k?si=LBDo17-IAnGCqGZ3",
      videos: [
        {
          url: "https://youtu.be/OYYTGyhMz9k?si=LBDo17-IAnGCqGZ3",
          title: "Bow Creek - Celebration Mile 2014"
        },
        {
          url: "https://youtu.be/40asc84bTXU?si=Ph-l2RjdGu0yER0H",
          title: "Bow Creek - Peter Young Stakes 2016"
        },
        {
          url: "https://youtu.be/XFmBD3IJ2S0?si=XSsBiJ7CTkt1GCER",
          title: "Breizh Eagle - Prix Haras de Neuve 2021"
        }
      ]
    },
    {
      id: "rodaballo",
      name: "RODABALLO",
      tagline: "LOPE DE VEGA X SHORT AFFAIR (SINGSPIEL)",
      fee: "2.000€ PV",
      year: "2023",
      image: "/sementales/rodaballo/hero.jpg",
      description: "Uno de los mejores caballos del siglo XXI en España",
      breed: "Pura Sangre Inglés",
      color: "Castaño",
      height: "1,63m",
      born: "2017",
      origin: "LOPE DE VEGA X SHORT AFFAIR (SINGSPIEL)",
      achievements: [],
      profile:
        `**RODABALLO** es sin duda uno de los mejores caballos del siglo XXI en España. Hijo de **LOPE DE VEGA**, padre de sementales primer nivel en Europa como **BELARDO** o **PHOENIX OF SPAIN**, además de los prometedores **LUCKY VEGA**, **LOPE Y FERNANDEZ** y **LOOK DE VEGA**, tiene todas las condiciones para transmitir su gran velocidad y excelente cambio de ritmo.\n\nGanador clásico a 3 años al imponerse en el **Gran Premio Cimera** – Poule de Potros 2020, conquistó Alemania ganando **Grupo 2** para posteriormente ganar tres Grandes Premios más y ser nombrado **Mejor caballo del año 2021**. Terminó su carrera deportiva representando a España en los hipódromos más prestigiosos del mundo como Meydan (Dubai), Royal Ascot (Gran Bretaña) o Longchamp (Francia).`,
      palmares: [
        {
          edad: "A 3 años",
          logros: [
            "1º Gran Premio Cimera – Poule de Potros 2020 – 1600 m. Madrid, España",
            "3º Prix Millkom (Listed Race) 2020 – 1600 m. La Teste de Buch, Francia",
            "2º Gran Premio de la Hispanidad 2020 – 1600 m. Madrid, España",
          ],
        },
        {
          edad: "A 4 años",
          logros: [
            "1º Gran Premio Claudio Carudel 2021 – 1600 m. Madrid, España",
            "1º Kronimus Ottingen (Grupo 2) 2021 – 1600 m. Baden Baden, Alemania",
            "1º Gran Premio Antonio Blasco 2021 – 1400 m. Madrid, España",
          ],
        },
        {
          edad: "A 5 años",
          logros: [
            "1º Gran Premio Antonio Blasco 2022 – 1400 m. Madrid, España",
            "2º Gran Premio de la Hispanidad 2022 – 1600 m. Madrid, España",
          ],
        },
        {
          edad: "A 6 años",
          logros: [
            "2º Gran Premio de la Hispanidad 2023 – 1600 m. Madrid, España",
            "3º Gran Premio Antonio Blasco 2023 – 1400 m. Madrid, España",
            "4º Ras Al Khor (Listed Race) 2023 – 1400 m. Meydan, Dubai",
            "4º Dubai Duty Free Stakes (Listed Race) 2023 – 1400 m. Newbury, Gran Bretaña",
          ],
        },
      ],
      producciones: [],
      videoUrl: "https://youtu.be/LqYRUVWlUBw?si=a26-faFERWavCZRe",
      videos: [
        {
          url: "https://youtu.be/LqYRUVWlUBw?si=a26-faFERWavCZRe",
          title: "Rodaballo - Gran Premio Cimera 2020"
        },
        {
          url: "https://youtu.be/59X74cg7-ig?si=9kScurFJj_n1qX3B",
          title: "Rodaballo - Gran Premio Claudio Carudel 2021"
        },
        {
          url: "https://youtu.be/T3KLOUlRNJs?si=7FrbNENdSiL-VwIj",
          title: "Rodaballo - Kronimus Gruppe II 2021"
        },
        {
          url: "https://youtu.be/3BBF4ei6zFs?si=awXSAy2GxINJ944H",
          title: "Rodaballo - Gran Premio Antonio Blasco 2021"
        },
        {
          url: "https://youtu.be/PzusCk0udv0?si=JKvxNPh-0YlBeWcl",
          title: "Rodaballo - Gran Premio Antonio Blasco 2022"
        },
        {
          url: "https://youtu.be/X-sBJ3YeL3g?si=D909cJnFG6O-BRfn",
          title: "Rodaballo - Dubai Duty Free 2023"
        }
      ],
      testimonial:
        '"Rodaballo era un caballo con mucha velocidad y un excelente cambio de ritmo. Corrió bien en todo tipo de terrenos y fue un caballo muy duro, con una cabeza privilegiada" -Guillermo Arizkorreta',
    },
    {
      id: "noozhoh",
      name: "NOOZHOH CANARIAS",
      tagline: "CARADAK  X NOOZHAH (SINGSPIEL)",
      fee: "4.000€ PV",
      year: "2023",
      image: "/sementales/noozhoh/hero.jpg",
      description: "El mejor caballo nacido y criado en España del siglo XXI",
      breed: "Pura Sangre Inglés",
      color: "Alazán",
      height: "1,62m",
      born: "2011",
      origin: "CARADAK X NOOZHAH (SINGSPIEL)",
      achievements: [],
      profile:
        `**NOOZHOH CANARIAS** es el mejor caballo de España del siglo XXI.\n\nCaballo de época, **NOOZHOH CANARIAS** se mantuvo invicto a 2 años hasta que llamó a la puerta de la élite europea al ser **2º** en el **Prix Jean-Luc Lagardère** (**Grupo 1**) en París, marcando el máximo valor de un caballo español en Europa. Su programa a 3 años pasó por los mejores hipódromos de Europa donde dominó hasta los 200 metros las mejores **British 2000 Guineas (Grupo 1\)** que se recuerdan frente a sementales de primer nivel mundial como **NIGHT OF THUNDER**, **KINGMAN** o **AUSTRALIA**. \n\n Amplió su inédito palmarés en competición con varias colocaciones más en **Grupo 1**, **Grupo 3** y **Listed Race** para posteriormente retirarse ganando su primer **Gran Premio** en España.\n\n**Mejor semental de España** en 2024 y 2025, su producción ha heredado su gran calidad sumando más de 1.200.000€ en premios y un **60%** de **ganadores** además de 2 negritas: **ALL IRON** y **Tetuan.**`,
      palmares: [
        {
          edad: "A 2 años",
          logros: [
            "1º Premio Primer Paso 2013 - 800 m. Madrid, España",
            "1º Premio Martorell 2013 - 1200 m. Madrid, España",
            "1º Criterium du Bequet (Listed Race) 2013 - 1200 m. La Teste de Buch, Francia",
            "2º Prix Jean-Luc Lagardère (Grupo 1) - 1400 m. Longchamp, Francia",
          ],
        },
        {
          edad: "A 3 años",
          logros: [
            "1º Premio Torre Arias 2014 – 1400 m. Madrid, España",
            "6º British 2000 Guineas (Grupo 1) 2014 – 1600 m. Newmarket, Gran Bretaña",
            "3º Prix de la Fôret (Grupo 1) 2014 – 1400 m. Longchamp, Francia",
          ],
        },
        {
          edad: "A 4 años",
          logros: [
            "3º Prix Servanne (Listed Race) 2015 – 1200m. Maisons-Laffitte, Francia",
            "3º Prix de la Porte Maillot (Grupo 3) 2015 – 1400m. Longchamp, Francia",
          ],
        },
        {
          edad: "A 5 años",
          logros: [
            "1º Premio Andrés Covarrubias 2016 - 1400 m. Madrid, España",
            "1º Premio Nertal 2016 - 1600 m. Madrid, España",
            "1º Gran Premio Claudio Carudel 2016 - 1600 m. Madrid, España",
            "2º Gran Premio de la Hispanidad 2016 - 1600 m. Madrid, España",
            "2º Gran Premio Antonio Blasco 2016 - 1400 m. Madrid, España",
          ],
        },
      ],
      producciones: [
        {
          nombre: "ARZUA",
          año: "2023",
          origen: "NOOZHOH CANARIAS X ATEGORRIETA (RIP VAN WINKLE)",
          ganancias: "71.000€",
          victorias: "4 Victorias – 1 Colocación",
          logros: [
            "Mejor 2 años de 2025",
            "1º Primer Paso 2025 – 1000 m. Madrid, España",
            "1º Criterium Nacional 2025 – 1400 m. San Sebastián, España",
            "1º Criterium Internacional 2025 – 1500 m. San Sebastián, España",
            "1º Gran Criterium 2025 – 1600 m. Madrid, España",
          ],
          imagen: "/sementales/noozhoh/producciones/arzua.jpg",
        },
        {
          nombre: "TETUAN",
          año: "2021",
          origen: "NOOZHOH CANARIAS X EBALVIYRA (ANABAA)",
          ganancias: "189.900€",
          victorias: "6 Victorias – 7 Colocaciones",
          logros: [
            "Mejor 3 años de 2024",
            "1º Gran Premio Román Martín 2025 – 2000 m. Madrid, España",
            "1º Criterium Nacional 2023 – 1600 m. Madrid, España",
            "1º Gran Premio Nacional 2024 – 2200 m. Madrid, España",
            "1º Gran Premio Villapadierna (Derby Español) 2024 – 2400 m. Madrid, España",
            "2º Gran Premio de Madrid (Listed Race) 2025 – 2400 m. Madrid, España",
          ],
          imagen: "/sementales/noozhoh/producciones/tetuan.jpg",
        },
        {
          nombre: "ALL IRON",
          año: "2020",
          origen: "NOOZHOH CANARIAS X SWEET SUE (NATHANIEL)",
          ganancias: "38.000€",
          victorias: "2 Victorias – 1 Colocaciones",
          logros: [
            "1º Premio Luis Maroto 2022– 1600 m. Madrid, España",
            "1º Derby du Midi (Listed Race) 2023 – 1900 m. Bordeaux Le Bouscat, Francia",
          ],
          imagen: "/sementales/noozhoh/producciones/all-iron.jpg",
        },
        {
          nombre: "BRAVO",
          año: "2019",
          origen: "NOOZHOH CANARIAS X VAMOS ESPAÑA (SIYOUNI)",
          ganancias: "113.000€",
          victorias: "8 Victorias – 33 Colocaciones",
          logros: [
            "1º Premio Pablo Font 2022 – 1200 m. Madrid, España",
            "1º Premio Monet 2022 – 1200 m. Madrid, España",
            "1º Premio Fernando Melchor 2022 – 1600 m. Madrid, España",
            "1º Premio Eduardo Olgado 2023– 1400 m. Madrid, España",
          ],
          imagen: "/sementales/noozhoh/producciones/bravo.jpg",
        },
        {
          nombre: "RONCAL",
          año: "2022",
          origen: "NOOZHOH CANARIAS X ZIGA (AUTHORIZED)",
          ganancias: "55.400€",
          victorias: "3 Victorias – 3 Colocaciones",
          logros: [
            "1º Gran Premio Nacional 2025 – 2200 m. Madrid, España",
            "1º Premio Jose Carlos Fernández 2025 – 1800 m. Madrid, España",
            "2º Gran Premio Villamejor 2025 – 2800 m. Madrid, España",
            "3º Gran Premio Villapadierna (Derby Español) 2025 – 2400 m. Madrid, España",
          ],
          imagen: "/sementales/noozhoh/producciones/roncal.jpg",
        },
        {
          nombre: "CASILDA",
          año: "2019",
          origen: "NOOZHOH CANARIAS X LA COPA (PIVOTAL)",
          ganancias: "59.450€",
          victorias: "4 Victorias – 5 Colocaciones",
          logros: [
            "1º Gran Premio Subasta ACPSIE 2021– 1600 m. Madrid, España",
            "1º Premio Reltaj 2021– 1100 m. Madrid, España",
            "1º Copa de Criadores 2021 – 1500 m. Madrid, España",
            "1º Premio Roberto Cocheteux 2022 – 1600 m. Madrid, España",
          ],
          imagen: "/sementales/noozhoh/producciones/casilda.jpg",
        },
        {
          nombre: "PANTXINETA",
          año: "2019",
          origen: "NOOZHOH CANARIAS X GOOD MORNING STAR (SHIROCCO)",
          ganancias: "57.500€",
          victorias: "6 Victorias – 10 Colocaciones",
          logros: [
            "1º Gran Premio Nacional 2022 – 2200 m. Madrid, España",
            "1º Premio Marbell 2023– 2000 m. San Sebastián, España",
            "1º Premio PMC 2023– 2000 m. San Sebastián, España",
          ],
          imagen: "/sementales/noozhoh/producciones/pantxineta.jpg",
        },
      ],
      videoUrl: "https://youtu.be/M8IwWy-B6fs?si=w3Ojw1Zq-o3L5IG-",
      videos: [
        {
          url: "https://youtu.be/M8IwWy-B6fs?si=w3Ojw1Zq-o3L5IG-",
          title: "Noozhoh Canarias - Gran Premio Claudio Carudel 2016"
        },
        {
          url: "https://youtu.be/4zcUw0UZ_4I?si=FeVtz8t7cGBx-GzE",
          title: "Noozhoh Canarias - Prix Jean-Luc Lagardère G1 2013"
        },
        {
          url: "https://youtu.be/xF7FkKj-sF4?si=LWEThPklo3vi0toU",
          title: "Noozhoh Canarias - Qatar Prix de la Foret G1 2014"
        },
        {
          url: "https://youtu.be/jZn72CH6NNA?si=JqZSCodsNA0-2OX-",
          title: "Noozhoh Canarias - Premio Torre Arias 2014"
        },
        {
          url: "https://youtu.be/PGHKvD30jmw?si=hVokCJ8LzdQRnqKN",
          title: "Noozhoh Canarias - Premio Primer Paso 2013"
        },
        {
          url: "https://youtu.be/eMwPjYkMLoU?si=EZUzNf2wteYA3dOj",
          title: "Noozhoh Canarias - Criterium du Bequet 2013"
        },
        {
          url: "https://youtu.be/4KpvKjwKuvU?si=DM9v6XoEKCOQyAWz",
          title: "Noozhoh Canarias - Premio Martorell 2013"
        },
        {
          url: "https://youtu.be/n8Fao-6vzkQ?si=EPP-G0a4i9SoV5Wp",
          title: "Noozhoh Canarias - QIPCO 2000 Guineas 2014"
        }
      ],
      testimonial: "",
    },
  ]

  const semental = sementales.find((s) => s.id === id)

  if (!semental) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      <SementalHero semental={semental} />
      <SementalTabs semental={semental} />
    </div>
  )
}
