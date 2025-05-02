import { notFound } from "next/navigation"
import SementalHero from "@/components/semental-hero"
import SementalTabs from "@/components/semental-tabs"

// Updated props interface for Next.js App Router dynamic routes
interface SementalPageProps {
  params: {
    id: string
  }
}

// Make the component async to properly handle dynamic params
export default async function SementalPage({ params }: SementalPageProps) {
  // Await the params to satisfy Next.js requirements
  const { id } = await Promise.resolve(params)

  const sementales = [
    {
      id: "bowcreek",
      name: "BOW CREEK",
      tagline: "SHAMARDAL X BENEVENTA (MOST WELCOME)",
      fee: "2.500€ PV",
      year: "2023",
      image: "/sementales/bowcreek/bowcreek1.jpg",
      description: "Precocidad y velocidad asegurada",
      breed: "Pura Sangre Inglés",
      color: "Castaño",
      height: "Medidas",
      born: "2011",
      origin: "SHAMARDAL X BENEVENTA (MOST WELCOME)",
      achievements: [],
      profile:
        "BOW CREEK es hijo de SHAMARDAL, uno de los mejores caballos y sementales del siglo XXI y padre de sementales primer nivel mundial como LOPE DE VEGA, BLUE POINT, PINATUBO, EARTHLIGHT, VICTOR LUDORUM, …\n\nSu historial deportivo está al alcance de muy pocos sementales en España. Millero internacional triple ganador de Grupo, destacó a 3 años ganando su primer Grupo 2 en Gran Bretaña llamando la atención del gigante Godolphin, quien apostó por el brindándoles dos Grupos 2 más en Irlanda y Australia.\n\nEn su primera producción como semental en Francia destacó con caballos como BREIZH EAGLE (3º Poule d'Essai des Poulains G1 2021 y múltiple ganador de Listed Race) y el incansable WHAT'S UP en España (1º Gran Premio Cimera – Poule de Potros 2021 y triple colocado de Gran Premio a 3 años)\n\nPrecocidad y velocidad asegurada",
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
          nombre: "GOT SOCKS",
          año: "2020",
          origen: "BOW CREEK X LOVELY BEST (KING'S BEST)",
          ganancias: "23.720€",
          victorias: "1 Victoria – 2 Colocaciones",
          logros: ["2º Prix Herod (Listed Race) 2022 – 1400 m. Saint-Cloud, Francia"],
          imagen: "/sementales/bowcreek/producciones/got-socks.png",
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
          nombre: "KALEOCREEK",
          año: "2023",
          origen: "BOW CREEK X BAMIYANE (KOUROUN)",
          ganancias: "61.550€",
          victorias: "2 Victorias – 12 Colocaciones",
          logros: [
            "Primer 2 años ganador en Europa en 2023",
            "1º Prix de Carqueiranne 2023 – 1000 m. Marseille Borely, Francia",
          ],
          imagen: "/sementales/bowcreek/producciones/kaleocreek.jpg",
        },
        {
          nombre: "YORKSHIRE TERRIER",
          año: "2023",
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
      videoUrl: "",
    },
    {
      id: "rodaballo",
      name: "RODABALLO",
      tagline: "LOPE DE VEGA X SHORT AFFAIR (SINGSPIEL)",
      fee: "2.000€ PV",
      year: "2023",
      image: "/sementales/rodaballo/rodaballo7.jpg",
      description: "Uno de los mejores caballos del siglo XXI en España",
      breed: "Pura Sangre Inglés",
      color: "Castaño",
      height: "Medidas",
      born: "2017",
      origin: "LOPE DE VEGA X SHORT AFFAIR (SINGSPIEL)",
      achievements: [],
      profile:
        "RODABALLO es sin duda uno de los mejores caballos del siglo XXI en España. Hijo de LOPE DE VEGA, padre de sementales primer nivel en Europa como BELARDO o PHOENIX OF SPAIN, además de los prometedores LUCKY VEGA, LOPE Y FERNANDEZ y LOOK DE VEGA, tiene todas las condiciones para transmitir su gran velocidad y excelente cambio de ritmo.\n\nGanador clásico a 3 años al imponerse en el Gran Premio Cimera – Poule de Potros 2020, conquistó Alemania ganando Grupo 2 para posteriormente ganar tres Grandes Premios más y ser nombrado Mejor caballo del año 2021. Terminó su carrera deportiva representando a España en los hipódromos más prestigiosos del mundo como Meydan (Dubai), Royal Ascot (Gran Bretaña) o Longchamp (Francia).",
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
      videoUrl: "/sementales/rodaballo/RODABALLO.mov",
      testimonial:
        '"Rodaballo era un caballo con mucha velocidad y un excelente cambio de ritmo. Corrió bien en todo tipo de terrenos y fue un caballo muy duro, con una cabeza privilegiada" Guillermo Arizkorreta',
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
