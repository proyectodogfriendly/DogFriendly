// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;
const Place = require("../models/Places");

mongoose
  .connect("mongodb://localhost/proyectodogfriendly", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const dbName = "places";
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true });

const places = [
  {
    name: "Taman",
    address: "Calle de Alfonso VI, 6 (Madrid)",
    description: "Restaurante mexicano de comida casera",
    position: {
      type: "Point",
      coordinates: [-3.704858, 40.4156]
    }
  },

  {
    name: "Santos y desamparados",
    address: "Costanilla de los desamparados, 4 (Madrid)",
    description: "Coctelería perrunamente simpática",
    position: {
      type: "Point",
      coordinates: [-3.696575, 40.413031]
    }
  },

  {
    name: "Café Pavón",
    address: "C/ Embajadores, 9 (Madrid)",
    description:
      "Un café de toda la vida reconvertido sin perder ni un ápice de sabor. Y los SrsPerros estarán tan contentos como sus humanos, comprobado.",
    position: {
      type: "Point",
      coordinates: [-3.706238, 40.410207]
    }
  },
  {
    name: "Taberna la Potxola",
    address: "San Mateo, 19 (Madrid)",
    description: "Estupenda taberna vasca a dos pasos de Alonso Martínez",
    position: {
      type: "Point",
      coordinates: [-3.698313, 40.426263]
    }
  },
  {
    name: "La Marquina",
    address: "Torrecilla del Leal, 15 (Madrid)",
    description:
      "Pequeño bar y restaurante de Lavapiés donde ofrecen unas tapas y unos platos originales y de calidad",
    position: {
      type: "Point",
      coordinates: [-3.699352, 40.410874]
    }
  },
  {
    name: "Wild Side Bar",
    address: "Ramón Sainz 29 BIS (Madrid)",
    description: "Cervezas, vinos y vermut",
    position: {
      type: "Point",
      coordinates: [-3.738448, 40.387949]
    }
  },
  {
    name: "Pintxoterapia",
    address: "General Pardiñas 71 (Madrid)",
    description: "Taberna de pintxos",
    position: {
      type: "Point",
      coordinates: [-3.678517, 40.433414]
    }
  },
  {
    name: "Dulces Sabores",
    address: "Calle de la Cañada, 17 (Madrid)",
    description: "Pasteleria detallista",
    position: {
      type: "Point",
      coordinates: [-3.535921, 40.424867]
    }
  },
  {
    name: "La Gustava",
    address: "Huertas, 20 (Madrid)",
    description:
      "Local de tapas que apuesta por el tapeo tradicional con un toque lalala",
    position: {
      type: "Point",
      coordinates: [-3.700012, 40.414092]
    }
  },
  {
    name: "El Ratón de Getaria",
    address: "Ronda de Segovia 16 (Madrid)",
    description: "Su terraza y sus tapas no te dejarán indiferentes",
    position: {
      type: "Point",
      coordinates: [-3.786192, 42.408713]
    }
  },
  {
    name: "El Miau de Fucar",
    address: "Calle Fucar 15 (Madrid)",
    description:
      "Un café colorido y acogedor donde son siempre muy bien recibidos todos los visitantes perrunos.",
    position: {
      type: "Point",
      coordinates: [-3.695542, 40.411302]
    }
  },
  {
    name: "Living' Japan",
    address: "Calle de Torrecilla del Leal, 20 (Madrid)",
    description:
      "Original y simpático espacio dedicado a celebrar la cultura nipona, puedes disfrutar probando diversos platos de cocina japonesa, incluyendo muchas opciones veganas y vegetarianas, en compañía de tu can.",
    position: {
      type: "Point",
      coordinates: [-3.699498, 40.410797]
    }
  },
  {
    name: "Shaka Poke Bar",
    address: "Calle de Hermosilla, 91 (Madrid)",
    description: "Comida healthy, sana, saludable y tartas sin gluten",
    position: {
      type: "Point",
      coordinates: [-3.676184, 40.426237]
    }
  },
  {
    name: "Barbara Ann",
    address: "Calle de Santa Teresa 8 (Madrid)",
    description:
      "Una coctelería donde también puedes cenar, un bar donde tomarte la primera de la noche y quién sabe si alguna más.",
    position: {
      type: "Point",
      coordinates: [-3.695836, 40.425899]
    }
  },
  {
    name: "Källa Beer Factory",
    address: "Calle de Barbieri, 20 (Madrid)",
    description:
      "Källa, explican los responsables de idear esta moderna y urbana fábrica de cervezas, significa origen en sueco y se pronuncia Chela. En Venezuela una Chela es una cerveza... de ahí el nombre de este local tan especial donde también puedes comer y estar de lo más a gusto en compañía de tu perro ",
    position: {
      type: "Point",
      coordinates: [-3.697861, 40.421892]
    }
  },
  {
    name: "Egeo Malasaña",
    address: "Calle del Barco, 41 (Madrid)",
    description: "Suvlakería griega",
    position: {
      type: "Point",
      coordinates: [-3.70242, 40.424847]
    }
  },
  {
    name: "Boton Rouge",
    address: "Calle de la Victoria, 8 (Madrid)",
    description: "Cocktails",
    position: {
      type: "Point",
      coordinates: [-3.701767, 40.416078]
    }
  },
  {
    name: "El perro de Pavlov",
    address: "Costanilla de San Pedro 5 (Madrid)",
    description:
      "Cafe de especialidad, con reposteria local, tostas y cervezas artesanales",
    position: {
      type: "Point",
      coordinates: [-3.710611, 40.41284]
    }
  },
  {
    name: "Bar cervecería los caracoles",
    address: "Calle Toledo 106 (Madrid)",
    description:
      "Bar de los de toda la vida, un bar castizo y con personalidad, de esos que ya quedan pocos en el centro de Madrid: la especialidad, obviamente, son los caracoles pero también puedes tomar pincho de tortilla, bocata de calamares, buenas cañas, vermut de grifo.... ",
    position: {
      type: "Point",
      coordinates: [-3.711275, 40.407884]
    }
  },
  {
    name: "Fanático Café",
    address: "Alfonso Gómez, 15 (Madrid)",
    description:
      "Cafés para tomar, llevar y comprar para casa frescos y recién tostados. Desayunos.",
    position: {
      type: "Point",
      coordinates: [-3.62916, 40.439202]
    }
  },
  {
    name: "Hielo y Carbón",
    address: "Gran Vía, 31 (Madrid)",
    description: "Restaurante con una decoración y vistas exquisitas",
    position: {
      type: "Point",
      coordinates: [-3.703756, 40.420152]
    }
  },
  {
    name: "Crudo",
    address: "Fernández de la Hoz, 48 (Madrid)",
    description: "Pokes, ensaladas y comida orgánica",
    position: {
      type: "Point",
      coordinates: [-3.694526, 40.436175]
    }
  },

  {
    name: "Matilda Café",
    address: "Encomienda 4 (Madrid)",
    description:
      "Café polifacético que combina comida de tapeo con combinados, exposiciones de artistas, presentaciones de libros, poesía y cuentacuentos.",
    position: {
      type: "Point",
      coordinates: [-3.705214, 40.411262]
    }
  },
  {
    name: "La Capricciosa Italiana",
    address: "C/ de las Maldonadas, 4 (Madrid)",
    description: "Pizzas deliciosas y con carácter... y mucho más.",
    position: {
      type: "Point",
      coordinates: [-3.707627, 40.410951]
    }
  },
  {
    name: "Barcafé Fusionarte",
    address: "Av Monforte de Lemos 161 (Madrid)",
    description: "Brunch, hamburguesas y tapas",
    position: {
      type: "Point",
      coordinates: [-3.714451, 40.477052]
    }
  },
  {
    name: "Roots Lamarca",
    address: "Fernando Vl, 10, Local 10 (Madrid)",
    description:
      "Comida activa y nutritiva, hecha con ingredientes de temporada, locales, y alimentos no procesados",
    position: {
      type: "Point",
      coordinates: [-3.695653, 40.42486]
    }
  },
  {
    name: "El jardin de Bosco",
    address: "Espalter, 5 (Madrid)",
    description:
      "Bar chiquito y absolutamente encantador, decorado con especial originalidad y con una terraza imbatible",
    position: {
      type: "Point",
      coordinates: [-3.690669, 40.413079]
    }
  },
  {
    name: "L’Orangerie bar & creperie",
    address: "Calle de San Joaquín 14 (Madrid)",
    description: "Crepes, cafés y batidos",
    position: {
      type: "Point",
      coordinates: [-3.701634, 40.424686]
    }
  },
  {
    name: "Masters Specialty Coffee",
    address: "Noviciado 9 (Madrid)",
    description:
      "Acogedor y simpático café en Conde Duque es el lugar perfecto para tomar un café de calidad y algún dulce, para sentarte a trabajar un rato o para probar su brunch en la mejor compañía.",
    position: {
      type: "Point",
      coordinates: [-3.708831, 40.425819]
    }
  },
  {
    name: "Jama Bistró",
    address: "Menorca 5 (Madrid)",
    description:
      "Jama Bistró es una visión personal y contemporánea de la gastronomía peruana: Ceviche Clásico, Tiradito Mediterráneo o el Costillar...",
    position: {
      type: "Point",
      coordinates: [-3.678467, 40.419855]
    }
  },
  {
    name: "Café del Teatro",
    address: "Calle Moratines, 13 (Madrid)",
    description: "Cafés, tapas, copas, cerveza",
    position: {
      type: "Point",
      coordinates: [-3.702798, 40.403229]
    }
  },
  {
    name: "Los Tiernos",
    address: "C/ Toledo, 73 (Madrid)",
    description:
      "Un bar de toda la vida que ahora tiene una nueva y esplendorosa segunda juventud.",
    position: {
      type: "Point",
      coordinates: [-3.708404, 40.410859]
    }
  },
  {
    name: "Raw Coco Green Bar Madrid",
    address: "Calle del General Pardiñas 21 (Madrid)",
    description: "Healthy food",
    position: {
      type: "Point",
      coordinates: [-3.678205, 40.426467]
    }
  },
  {
    name: "Asia A.S.A.K.O",
    address: "Caracas, 1 (Madrid)",
    description: "Especialistas en Ramen",
    position: {
      type: "Point",
      coordinates: [-3.69645, 40.431021]
    }
  },
  {
    name: "Monkee Koffee",
    address: "calle Vallehermoso, 112 (Madrid)",
    description: "Cafés de especialidad y bollería artesana",
    position: {
      type: "Point",
      coordinates: [-3.707979, 40.440652]
    }
  },
  {
    name: "Panaix",
    address: "Monasterio de Oseira 19 (Madrid)",
    description: "Cafetería",
    position: {
      type: "Point",
      coordinates: [-3.696277, 40.510795]
    }
  },
  {
    name: "Töto Ice Cream & Coffee",
    address: "Corredera alta de San Pablo, 12 (Madrid)",
    description: "Helados artesanales, tartas caseras y cafés de especialidad",
    position: {
      type: "Point",
      coordinates: [-3.701887, 40.425312]
    }
  },
  {
    name: "Revoltosa",
    address: "Plaza del Rey, 4 (Madrid)",
    description: "Cervezas, vinos y cocina informal",
    position: {
      type: "Point",
      coordinates: [-3.695963, 40.420625]
    }
  },
  {
    name: "theDoger café",
    address: "Calle los Mesejo, 14. (Madrid)",
    description:
      "Puedes sentarte a tomar un café ecológico en compañía de tu can pero también puedes optar por tomarte una cerveza artesana en compañía de los cachorros que esperan ser adoptados y que están aquí en acogida",
    position: {
      type: "Point",
      coordinates: [-3.669245, 40.400465]
    }
  },
  {
    name: "Cafeteria Beatriz 2R Sc",
    address: "Jose de cadalso 80 (Madrid)",
    description: "Cafetería",
    position: {
      type: "Point",
      coordinates: [-3.768838, 40.377634]
    }
  },
  {
    name: "Olimpia & Teresa",
    address: "Avenida Ciudad de Barcelona, 196 (Madrid)",
    description: "Comida casera para llevar",
    position: {
      type: "Point",
      coordinates: [-3.673496, 40.400564]
    }
  },
  {
    name: "The Wild Pig",
    address: "C/ Ballesta, 10 (Madrid)",
    description:
      "Pizzas y cervezas artesanas, cócteles y simpatía perruna, buena onda en general... ",
    position: {
      type: "Point",
      coordinates: [-3.703457, 40.421735]
    }
  },
  {
    name: "AHORA en el 16",
    address: "Martin de los Heros 16 (Madrid)",
    description: "Bar/Cafe/Restaurante",
    position: {
      type: "Point",
      coordinates: [-3.714131, 40.425358]
    }
  },
  {
    name: "Cocómero Organic Food",
    address: "Calle de Embajadores, 197 (Madrid)",
    description: "Tienda de comida orgánica dogfriendly",
    position: {
      type: "Point",
      coordinates: [-3.691171, 40.388733]
    }
  },
  {
    name: "La Pinta Avenida",
    address: "Calle Canillas 93 (Madrid)",
    description:
      "Cervezas artesanas, tostas, cucuruchos, actividades culturales",
    position: {
      type: "Point",
      coordinates: [-3.670414, 40.444168]
    }
  },

  {
    name: "Heladería Popota",
    address: "Carranza 9 (Madrid)",
    description: "Helados de autor",
    position: {
      type: "Point",
      coordinates: [-3.703438, 40.429249]
    }
  },
  {
    name: "Madrid & Darracott",
    address: "Calle del Duque de Rivas, 8 (Madrid)",
    description:
      "Friendly English/Spanish-run wine shop and tasting space in the heart of Madrid. Vinos y Experiencias.",
    position: {
      type: "Point",
      coordinates: [-3.706564, 40.413395]
    }
  },
  {
    name: "El Andariego Río",
    address: "Paseo de las Yeserías, (Madrid)",
    description:
      "El Andariego Río tienen todo tipo de tapas, empanadas caseras riquísimas, guacamole y hummus, tortilla de patatas, vermut y excelentes vinos, cervecitas...",
    position: {
      type: "Point",
      coordinates: [-3.709934, 40.399725]
    }
  },
  {
    name: "Feliz Coffee",
    address: "Lope de Vega, 2 (Madrid)",
    description:
      "Es un alto en el camino más que agradable si estás por el Barrio de las Letras, perfecto para un desayuno inesperadamente agradable o para un café con una cookie a cualquier hora de la tarde.",
    position: {
      type: "Point",
      coordinates: [-3.698766, 40.414058]
    }
  },
  {
    name: "La Enriquetta",
    address: "Calle de la Alameda, 8 (Madrid)",
    description: "Comida del mundo, casera y hecha con amor",
    position: {
      type: "Point",
      coordinates: [-3.693945, 40.412267]
    }
  },
  {
    name: "Bipolar",
    address: "Calle calatrava 6 (Madrid)",
    description: "Comida casera, desayunos, menú del día",
    position: {
      type: "Point",
      coordinates: [-3.710841, 40.409407]
    }
  },
  {
    name: "Escafandra - Taberna Vegana",
    address: "Calle Joaquín María López, 17. (Madrid)",
    description: "cocina vegana",
    position: {
      type: "Point",
      coordinates: [-3.710791, 40.437585]
    }
  },
  {
    name: "Bocavante",
    address: "Calle Cardenal Cisneros 1 (Madrid)",
    description: "Bocata de Bogavante (Lobster Roll)",
    position: {
      type: "Point",
      coordinates: [-3.701556, 40.429691]
    }
  },
  {
    name: "El Vodevil Gastrobar",
    address: "Capitán Salazar Martínez nº11 (Madrid)",
    description:
      "Un rico menú del día entre semana para humanos y mucha simpatía con los canes.",
    position: {
      type: "Point",
      coordinates: [-3.709888, 40.407735]
    }
  },
  {
    name: "Bar La Santa",
    address: "Calle de Hortaleza 67 (Madrid)",
    description: "Bar taperia",
    position: {
      type: "Point",
      coordinates: [-3.698014, 40.424987]
    }
  },
  {
    name: "Alebrije",
    address: "Paseo de los Pontones 24 (Madrid)",
    description: "Buena comida",
    position: {
      type: "Point",
      coordinates: [-3.719118, 40.40446]
    }
  },
  {
    name: "Estupenda Cafe Bar",
    address: "Calle de San Roque 14 (Madrid)",
    description:
      "el lugar perfecto para una merienda especial a cualquier hora de la tarde, para charlar y reír mientras disfrutas de un milk shake soñando que has viajado a Twin Peaks o compartes unos nachos y algún hot dog entre un cóctel, y otro cóctel... ",
    position: {
      type: "Point",
      coordinates: [-3.704581, 40.422809]
    }
  },
  {
    name: "El Perro y la Galleta de Chamberí",
    address: "Carranza, 10 (Madrid)",
    description:
      "Los canes son siempre bienvenidos en El Perro y la Galleta de Chamberí, antes El Canadiense, un pequeño restaurante que forma parte del siempre dog friendly",
    position: {
      type: "Point",
      coordinates: [-3.703674, 40.431636]
    }
  },
  {
    name: "Arúgula",
    address: "Calle de Castelló 3 (Madrid)",
    description: "Desayunos, Poké, Ensaladas, Wraps, Zumos Tropicales",
    position: {
      type: "Point",
      coordinates: [-3.681854, 40.422703]
    }
  },
  {
    name: "Bite Me Café",
    address: "Plaza de la Beata Maria Ana de Jesús, 2 (Madrid)",
    description: "Donuts artesanales",
    position: {
      type: "Point",
      coordinates: [-3.694164, 40.394708]
    }
  },
  {
    name: "La Colmada",
    address: "Espíritu Santo, 19 (Madrid)",
    description:
      "Un bar tan simpático como colorido donde tomar estupendos vinos, vermut, cañitas y unas tapas o raciones muy, muy ricas",
    position: {
      type: "Point",
      coordinates: [-3.704377, 40.425605]
    }
  },
  {
    name: "Arbonaida Bar",
    address: "Calle Santiago 11 (Madrid)",
    description: "Tapas- Menú - Cenas - Cafés -Tés- Zumos - Cócteles- Cerveza",
    position: {
      type: "Point",
      coordinates: [-3.710683, 40.416681]
    }
  },
  {
    name: "María Bonita Tacobar Madrid Rio",
    address: "Paseo de Yeserias 29 (Madrid)",
    description: "Taqueria Bar/Mexican Restaurant",
    position: {
      type: "Point",
      coordinates: [-3.708994, 40.39887]
    }
  },
  {
    name: "Café de la Rivière - San Vicente",
    address: "Cuesta de San Vicente 24, Local 2 (Madrid)",
    description:
      "Cafetería y Panadería Gourmet. Smoothies, zumos naturales, pastelería. Tartas. Empanaditas Argentinas.",
    position: {
      type: "Point",
      coordinates: [-3.715752, 40.42072]
    }
  },
  {
    name: "Adorado Bar Madrid",
    address: "Calle del Mesón de Paredes, 22 (Madrid)",
    description:
      "un lugar en el que desayunar o compartir una comida con calma, disfrutar de un full Brunch espectacular o merendar",
    position: {
      type: "Point",
      coordinates: [-3.704683, 40.410777]
    }
  },
  {
    name: "Restaurante Torikey",
    address: "Plaza del Descubridor Diego de Ordás, 2 (Madrid)",
    description:
      "En intentar hacer de esto algo grande... con la ayuda de nuestras mascotas, por supuesto.Comida japonesa.",
    position: {
      type: "Point",
      coordinates: [-3.700405, 40.441141]
    }
  },
  {
    name: "Magasand Delicias",
    address: "Calle de Tomás Bretón, 54 (Madrid)",
    description:
      "Luminoso, amplio y realmente agradable local donde estar del todo feliz desayunando o comiendo en compañía canina.",
    position: {
      type: "Point",
      coordinates: [-3.69147, 40.397096]
    }
  },
  {
    name: "Leka Ópera Bar",
    address: "Calle de Santiago 1 (Madrid)",
    description:
      "Tomar unos vinos o un vermut, unas tapitas verdaderamente ricas, ensaladas... En Leka Ópera Bar también preparan buenos cócteles y además su terracita, en la siempre agradable y peatonal calle de Santiago, es una delicia al caer la tarde.",
    position: {
      type: "Point",
      coordinates: [-3.709733, 40.416208]
    }
  },
  {
    name: "Urbano Specialty Coffee",
    address: "Calle Santa Bárbara 8 (Madrid)",
    description:
      "Cafe en granos o molidos al instante para llevar. Reposteria organica y opcion vegana. Copas y bebidas varias.",
    position: {
      type: "Point",
      coordinates: [-3.701504, 40.424542]
    }
  },
  {
    name: "Honest Greens Castellana",
    address: "Paseo de la Castellana 89 (Madrid)",
    description:
      "En Honest Greens se esfuerzan porque sea fácil comer sano, rico y variado. En sus locales -siempre espacios bonitos, modernos y de estética pulida y cálida- siempre encuentras alimentos de temporada, no procesados y sin aditivos. ",
    position: {
      type: "Point",
      coordinates: [-3.691935, 40.450093]
    }
  },
  {
    name: "Honest Greens Hortaleza",
    address: "Calle de Hortaleza 100 (Madrid)",
    description:
      "En Honest Greens se esfuerzan porque sea fácil comer sano, rico y variado. En sus locales -siempre espacios bonitos, modernos y de estética pulida y cálida- siempre encuentras alimentos de temporada, no procesados y sin aditivos. ",
    position: {
      type: "Point",
      coordinates: [-3.697842, 40.425004]
    }
  },
  {
    name: "Faraday",
    address: "Calle San Lucas, 9 (Madrid)",
    description:
      "Original y llamativo local donde igual te tomas un estupendo café de especialidad que encuentras alguna joya en versión vinilo.",
    position: {
      type: "Point",
      coordinates: [-3.696328, 40.423978]
    }
  },
  {
    name: "Cascorro Bistrot",
    address: "Plaza de Cascorro, 21 (Madrid)",
    description: "Aires y aromas parisinos en pleno centro de Madrid",
    position: {
      type: "Point",
      coordinates: [-3.707408, 40.411266]
    }
  },
  {
    name: "IE SANNA - Delicias",
    address: "Paseo de delicias 44 (Madrid)",
    description: "Panaderia cafeteria",
    position: {
      type: "Point",
      coordinates: [-3.694044, 40.402659]
    }
  },
  {
    name: "Yerbabuena",
    address: "Bordadores 3 (Madrid)",
    description: "COCINA VEGETARIANA VEGANA",
    position: {
      type: "Point",
      coordinates: [-3.707782, 40.416574]
    }
  },
  {
    name: "Lupita Paleta",
    address: "Calle Toledo 81 (Madrid)",
    description:
      "Heladería mexicana. Divertidas y deliciosas combinaciones de sabores hechos paleta.",
    position: {
      type: "Point",
      coordinates: [-3.709184, 40.410344]
    }
  },
  {
    name: "Restaurante Cattleya",
    address: "San Bernardo, 46 (Madrid)",
    description: "Comida casera venezolana",
    position: {
      type: "Point",
      coordinates: [-3.707303, 40.424857]
    }
  },
  {
    name: "La Bartola de Lavapies",
    address: "Escuadra 1 (Madrid)",
    description:
      "Tapas originales y exóticas, tapas de autor con acento mexicano en un bar chiquito",
    position: {
      type: "Point",
      coordinates: [-3.699523, 40.410264]
    }
  },
  {
    name: "Éccolo",
    address: "Embajadores, 28 (Madrid)",
    description: "Pizzas",
    position: {
      type: "Point",
      coordinates: [-3.795648, 40.409244]
    }
  },
  {
    name: "La Taperia del 21",
    address: "Tribulete, 21 (Madrid)",
    description:
      "Tortilla de patatas, croquetas de jamón, filetitos rusos, pulpo, ensaladilla rusa... La Taperia del 21 es un sitio estupendo si quieres tomar tapas caseras en Lavapiés junto a tu can.",
    position: {
      type: "Point",
      coordinates: [-3.703024, 40.407644]
    }
  }
];

Place.create(places, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${places.length} places`);
  mongoose.connection.close();
});

// let users = [
//   {
//     username: "alice",
//     password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
//   },
//   {
//     username: "bob",
//     password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
//   }
// ]

// User.deleteMany()
// .then(() => {
//   return User.create(users)
// })
// .then(usersCreated => {
//   console.log(`${usersCreated.length} users created with the following id:`);
//   console.log(usersCreated.map(u => u._id));
// })
// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })
