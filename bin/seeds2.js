const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;
const Area = require("../models/Areas");

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
 

// const dbName = "areas";
// mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true });

const areas = [
  {
    district: "ARGANZUELA",
    address: "CALLE PUERTO DE BEJAR, 7",
    position: {
      type: "Point",
      coordinates: [-3.6866860867909, 40.3888013560539]
    }
  },
  {
    district: "ARGANZUELA",
    address: "CALLE PARROCO EUSEBIO CUENCA,6",
    position: {
      type: "Point",
      coordinates: [-3.70527750898531, 40.3999058481924]
    }
  },
  {
    district: "ARGANZUELA",
    address: "CALLE PALOS DE LA FRONTERA,42",
    position: {
      type: "Point",
      coordinates: [-3.69450862445787, 40.4026487079676]
    }
  },
  {
    district: "ARGANZUELA",
    address: "PASEO IMPERIAL,26",
    position: {
      type: "Point",
      coordinates: [-3.71803695201312, 40.4051845002137]
    }
  },
  {
    district: "ARGANZUELA",
    address: "PARQUE MADRID RÍO (JUNTO PUENTE DE LA PRINCESA)",
    position: {
      type: "Point",
      coordinates: [-3.69804621522035, 40.3898700132406]
    }
  },
  {
    district: "BARAJAS",
    address: "AVENIDA LOGROÑO, 98",
    position: {
      type: "Point",
      coordinates: [-3.58070945982639, 40.4685634157608]
    }
  },
  {
    district: "BARAJAS",
    address: "PARQUE JUAN CARLOS I",
    position: {
      type: "Point",
      coordinates: [-3.60811831094329, 40.4630173802646]
    }
  },
  {
    district: "CARABANCHEL",
    address: "CAMINO CRUCES,17",
    position: {
      type: "Point",
      coordinates: [-3.75948974924641, 40.3694838348465]
    }
  },
  {
    district: "CARABANCHEL",
    address: "CALLE ONTANILLA, 1",
    position: {
      type: "Point",
      coordinates: [-3.72968387775858, 40.3741302371909]
    }
  },
  {
    district: "CARABANCHEL",
    address: "AVENIDA POBLADOS,95",
    position: {
      type: "Point",
      coordinates: [-3.73656137770249, 40.3743169997366]
    }
  },
  {
    district: "CARABANCHEL",
    address: "CALLE CAZALEGAS,2",
    position: {
      type: "Point",
      coordinates: [-3.72640890321799, 40.3760368020485]
    }
  },
  {
    district: "CARABANCHEL",
    address: "CALLE ALBA DE TORMES,4",
    position: {
      type: "Point",
      coordinates: [-3.7447112850767, 40.3787245739894]
    }
  },
  {
    district: "CARABANCHEL",
    address: "CALLE PARQUE EUGENIA DE MONTIJO,5",
    position: {
      type: "Point",
      coordinates: [-3.75179284997658, 40.3804867945881]
    }
  },
  {
    district: "CARABANCHEL",
    address: "PASEO MARCELINO CAMACHO,6",
    position: {
      type: "Point",
      coordinates: [-3.73976950849533, 40.3852371760528]
    }
  },
  {
    district: "CARABANCHEL",
    address: "CALLE PORTALEGRE,46",
    position: {
      type: "Point",
      coordinates: [-3.7249696764074, 40.3886786390412]
    }
  },
  {
    district: "CARABANCHEL",
    address: "CALLE BLASA PEREZ,1",
    position: {
      type: "Point",
      coordinates: [-3.72745905792281, 40.392178066977]
    }
  },
  {
    district: "CARABANCHEL",
    address: "CALLE BALEARES,22",
    position: {
      type: "Point",
      coordinates: [-3.71339115904659, 40.3935726073985]
    }
  },
  {
    district: "CARABANCHEL",
    address: "CALLE FAROLILLO,2",
    position: {
      type: "Point",
      coordinates: [-3.73189349514671, 40.3946874164459]
    }
  },
  {
    district: "CENTRO",
    address: "CALLE CASINO,3",
    position: {
      type: "Point",
      coordinates: [-3.6866860867909, 40.3888013560539]
    }
  },
  {
    district: "CENTRO",
    address: "CALLE ALGECIRAS,4",
    position: {
      type: "Point",
      coordinates: [-3.71752082405312, 40.4110210290738]
    }
  },
  {
    district: "CENTRO",
    address: "CALLE ORELLANA,23",
    position: {
      type: "Point",
      coordinates: [-3.69335766015226, 40.4254858271457]
    }
  },
  {
    district: "CENTRO",
    address: "CALLE CONDE DUQUE,11",
    position: {
      type: "Point",
      coordinates: [-3.7102052557127, 40.4284505011072]
    }
  },
  {
    district: "CHAMARTIN",
    address: "CALLE COLOMBIA,54",
    position: {
      type: "Point",
      coordinates: [-3.66788336445245, 40.4580031162004]
    }
  },
  {
    district: "CHAMBERI",
    address: "CALLE ALBERTO AGUILERA,12",
    position: {
      type: "Point",
      coordinates: [-3.70758476923017, 40.430118166496]
    }
  },
  {
    district: "CHAMBERI",
    address: "CALLE GALILEO,35",
    position: {
      type: "Point",
      coordinates: [-3.71065370204013, 40.4334357325859]
    }
  },
  {
    district: "CHAMBERI",
    address: "CALLE BRETON DE LOS HERREROS,46",
    position: {
      type: "Point",
      coordinates: [-3.69468522247544, 40.4390687322369]
    }
  },
  {
    district: "CHAMBERI",
    address: "CALLE BRAVO MURILLO, N? 49",
    position: {
      type: "Point",
      coordinates: [-3.70445412315983, 40.4391670028627]
    }
  },
  {
    district: "CHAMBERI",
    address: "CALLEJON MAGALLANES,3",
    position: {
      type: "Point",
      coordinates: [-3.7071090619126, 40.4404251536795]
    }
  },
  {
    district: "CHAMBERI",
    address: "CALLE DOMENICO SCARLATTI,4",
    position: {
      type: "Point",
      coordinates: [-3.71651802436574, 40.4416882619286]
    }
  },
  {
    district: "CIUDAD LINEAL",
    address: "CALLE PEPE ISBERT,11",
    position: {
      type: "Point",
      coordinates: [-3.62851719699994, 40.4218575472504]
    }
  },
  {
    district: "CIUDAD LINEAL",
    address: "AVENIDA MARQUES DE CORBERA,2",
    position: {
      type: "Point",
      coordinates: [-3.65693234398737, 40.421709617135]
    }
  },
  {
    district: "CIUDAD LINEAL",
    address: "CALLE NICOLAS SALMERON,1",
    position: {
      type: "Point",
      coordinates: [-3.63428129920682, 40.4220729791675]
    }
  },
  {
    district: "CIUDAD LINEAL",
    address: "CALLE GERARDO CORDON,46",
    position: {
      type: "Point",
      coordinates: [-3.65234059305496, 40.4264113660988]
    }
  },
  {
    district: "CIUDAD LINEAL",
    address: "CALLE ANTONIO PIRALA,4",
    position: {
      type: "Point",
      coordinates: [-3.65973334443743, 40.4299123732037]
    }
  },
  {
    district: "CIUDAD LINEAL",
    address: "CALLE LUIS RUIZ,27",
    position: {
      type: "Point",
      coordinates: [-3.63798309671616, 40.4309128286888]
    }
  },
  {
    district: "FUENCARRAL",
    address: "CALLE CESAR MANRIQUE,3",
    position: {
      type: "Point",
      coordinates: [-3.72158522751114, 40.4717109193852]
    }
  },
  {
    district: "FUENCARRAL",
    address: "AVENIDA MONFORTE DE LEMOS,8",
    position: {
      type: "Point",
      coordinates: [-3.69273265696845, 40.4795472844278]
    }
  },
  {
    district: "FUENCARRAL",
    address: "CALLE FERMIN CABALLERO,67",
    position: {
      type: "Point",
      coordinates: [-3.71118726549054, 40.4818889740019]
    }
  },
  {
    district: "FUENCARRAL",
    address: "CALLE OLESA DE MONTSERRAT,2",
    position: {
      type: "Point",
      coordinates: [-3.69378148884621, 40.4910628869804]
    }
  },
  {
    district: "HORTALEZA",
    address: "CALLE FLORENCIO CASTILLO,27",
    position: {
      type: "Point",
      coordinates: [-3.62417923937703, 40.4614386068349]
    }
  },
  {
    district: "HORTALEZA",
    address: "CALLE NEVADO DEL CUMBAL,3",
    position: {
      type: "Point",
      coordinates: [-3.63252776573623, 40.4694223312727]
    }
  },
  {
    district: "HORTALEZA",
    address: "CARRETERA ESTACION DE HORTALEZA,5",
    position: {
      type: "Point",
      coordinates: [-3.65621295307727, 40.4744980236247]
    }
  },
  {
    district: "HORTALEZA",
    address: "CALLE MANUEL CHAVES NOGALES,14",
    position: {
      type: "Point",
      coordinates: [-3.65250865986249, 40.4754118203045]
    }
  },
  {
    district: "HORTALEZA",
    address: "CALLE MONOVAR,4",
    position: {
      type: "Point",
      coordinates: [-3.6559657140521, 40.4760706448957]
    }
  },
  {
    district: "HORTALEZA",
    address: "CALLE SOMONTIN,29",
    position: {
      type: "Point",
      coordinates: [-3.66095510596189, 40.4774794290111]
    }
  },
  {
    district: "HORTALEZA",
    address: "CALLE SANTA ADELA,14",
    position: {
      type: "Point",
      coordinates: [-3.65036934837703, 40.4787664023782]
    }
  },
  {
    district: "HORTALEZA",
    address: "PARQUE JUAN PABLO II",
    position: {
      type: "Point",
      coordinates: [-3.62073772551983, 40.4573003956414]
    }
  },
  {
    district: "LATINA",
    address: "CALLE FUENTE DE LIMA,22",
    position: {
      type: "Point",
      coordinates: [-3.78291523258734, 40.3823338813677]
    }
  },
  {
    district: "LATINA",
    address: "CALLE LOS YEBENES,57",
    position: {
      type: "Point",
      coordinates: [-3.75175616198197, 40.3955427135439]
    }
  },
  {
    district: "LATINA",
    address: "CALLE SEPULVEDA,218",
    position: {
      type: "Point",
      coordinates: [-3.75566781229669, 40.3997557061285]
    }
  },
  {
    district: "LATINA",
    address: "CALLE CONCEJAL FRANCISCO JOSE JIMENEZ MARTIN,3",
    position: {
      type: "Point",
      coordinates: [-3.73499302239717, 40.4016034448744]
    }
  },
  {
    district: "MONCLOA",
    address: "CALLE ESCULTOR PERESEJO, 7",
    position: {
      type: "Point",
      coordinates: [-3.71405763975751, 40.3845102491253]
    }
  },
  {
    district: "MONCLOA",
    address: "AVENIDA EUROPA,27",
    position: {
      type: "Point",
      coordinates: [-3.78728141995221, 40.4454620577371]
    }
  },
  {
    district: "MONCLOA",
    address: "CALLE GOLONDRINA,36",
    position: {
      type: "Point",
      coordinates: [-3.78556997358689, 40.4529086202739]
    }
  },
  {
    district: "MONCLOA",
    address: "CALLE ARQUITECTO SANCHEZ ARCAS,7",
    position: {
      type: "Point",
      coordinates: [-3.71605942981205, 40.4541461321891]
    }
  },
  {
    district: "MONCLOA",
    address: "CALLE OFELIA NIETO,59",
    position: {
      type: "Point",
      coordinates: [-3.70962921906972, 40.4614297431251]
    }
  },
  {
    district: "MONCLOA",
    address: "CALLE VALDERREY,10",
    position: {
      type: "Point",
      coordinates: [-3.72049303883721, 40.4672005611938]
    }
  },
  {
    district: "MONCLOA",
    address: "AVENIDA VALDEMARIN,67",
    position: {
      type: "Point",
      coordinates: [-3.77718161633093, 40.4699265185373]
    }
  },
  {
    district: "MORATALAZ",
    address: "CALLE ARROYO FONTARRON,22",
    position: {
      type: "Point",
      coordinates: [-3.63808830019215, 40.3951001584867]
    }
  },
  {
    district: "MORATALAZ",
    address: "CALLE ENCOMIENDA DE PALACIOS,170",
    position: {
      type: "Point",
      coordinates: [-3.64357974231357, 40.3991837259238]
    }
  },
  {
    district: "MORATALAZ",
    address: "CALLE HACIENDA DE PAVONES,209",
    position: {
      type: "Point",
      coordinates: [-3.63671578171513, 40.4014132411342]
    }
  },
  {
    district: "MORATALAZ",
    address: "AVENIDA MORATALAZ,56",
    position: {
      type: "Point",
      coordinates: [-3.65439923979953, 40.4057384202678]
    }
  },
  {
    district: "MORATALAZ",
    address: "CALLE CAMINO DE LOS VINATEROS,120",
    position: {
      type: "Point",
      coordinates: [-3.64663382195903, 40.4069307666438]
    }
  },
  {
    district: "PUENTE DE VALLECAS",
    address: "RONDA SUR,8",
    position: {
      type: "Point",
      coordinates: [-3.66974357504398, 40.3718932856809]
    }
  },
  {
    district: "PUENTE DE VALLECAS",
    address: "CALLE NOVECENTO,6",
    position: {
      type: "Point",
      coordinates: [-3.65404165365966, 40.3768184051006]
    }
  },
  {
    district: "PUENTE DE VALLECAS",
    address: "AVENIDA RAFAEL ALBERTI,38",
    position: {
      type: "Point",
      coordinates: [-3.64369884372028, 40.3838421252727]
    }
  },
  {
    district: "PUENTE DE VALLECAS",
    address: "CALLE BELMEZ,73",
    position: {
      type: "Point",
      coordinates: [-3.67171678251132, 40.3783605221852]
    }
  },
  {
    district: "PUENTE DE VALLECAS",
    address: "CALLE TANGER,2",
    position: {
      type: "Point",
      coordinates: [-3.64776493931257, 40.3861075622743]
    }
  },
  {
    district: "PUENTE DE VALLECAS",
    address: "CALLE ANDALUCES,17",
    position: {
      type: "Point",
      coordinates: [-3.63628703811591, 40.3905687054447]
    }
  },
  {
    district: "PUENTE DE VALLECAS",
    address: "CALLE ARROYO DEL OLIVAR, 96",
    position: {
      type: "Point",
      coordinates: [-3.65888864863591, 40.3905818962515]
    }
  },
  {
    district: "RETIRO",
    address: "PASEO INFANTA ISABEL,4",
    position: {
      type: "Point",
      coordinates: [-3.68567938975355, 40.4061707776496]
    }
  },
  {
    district: "RETIRO",
    address: "CALLE POETA ESTEBAN DE VILLEGAS,1",
    position: {
      type: "Point",
      coordinates: [-3.68271477349061, 40.4085420195555]
    }
  },
  {
    district: "RETIRO",
    address: "CALLE ANUNCIACION,1",
    position: {
      type: "Point",
      coordinates: [-3.6757808325422, 40.4123389743571]
    }
  },
  {
    district: "RETIRO",
    address: "CALLE PEZ VOLADOR,21",
    position: {
      type: "Point",
      coordinates: [-3.66220566094776, 40.414807013364]
    }
  },
  {
    district: "RETIRO",
    address: "CALLE DOCE DE OCTUBRE,30",
    position: {
      type: "Point",
      coordinates: [-3.67326936117761, 40.4159825910743]
    }
  },
  {
    district: "RETIRO",
    address: "CALLE SALIENTE,10",
    position: {
      type: "Point",
      coordinates: [-3.66694467576336, 40.4187293155427]
    }
  },
  {
    district: "SALAMANCA",
    address: "PLAZA AMERICA ESPAÑOLA,4",
    position: {
      type: "Point",
      coordinates: [-3.66185283240925, 40.4294386717555]
    }
  },
  {
    district: "SALAMANCA",
    address: "CALLE FLORESTAN AGUILAR,2",
    position: {
      type: "Point",
      coordinates: [-3.66929043108983, 40.4304531528476]
    }
  },
  {
    district: "SALAMANCA",
    address: "AVENIDA AMERICA,32",
    position: {
      type: "Point",
      coordinates: [-3.67197418193995, 40.4390058876588]
    }
  },
  {
    district: "SALAMANCA",
    address: "CALLE BERLIN,7",
    position: {
      type: "Point",
      coordinates: [-3.66190481696404, 40.442249740237]
    }
  },
  {
    district: "SAN BLAS",
    address: "AVENIDA CANILLEJAS A VICALVARO,167",
    position: {
      type: "Point",
      coordinates: [-3.6105576046778, 40.4196968359474]
    }
  },
  {
    district: "SAN BLAS",
    address: "CALLE ARCOS DE JALON,20",
    position: {
      type: "Point",
      coordinates: [-3.62266427614638, 40.4202526767625]
    }
  },
  {
    district: "SAN BLAS",
    address: "AVENIDA CANILLEJAS A VICALVARO,90",
    position: {
      type: "Point",
      coordinates: [-3.61148973310072, 40.4206584651601]
    }
  },
  {
    district: "SAN BLAS",
    address: "CALLE ARCOS DE JALON,13",
    position: {
      type: "Point",
      coordinates: [-3.62170737461474, 40.4214951306738]
    }
  },
  {
    district: "SAN BLAS",
    address: "AVENIDA GUADALAJARA,110",
    position: {
      type: "Point",
      coordinates: [-3.6116312839285, 40.4223704472043]
    }
  },
  {
    district: "SAN BLAS",
    address: "AVENIDA ARCENTALES,29",
    position: {
      type: "Point",
      coordinates: [-3.61427172430353, 40.4344589457317]
    }
  },
  {
    district: "SAN BLAS",
    address: "CALLE GONZALO TORRENTE BALLESTER,4",
    position: {
      type: "Point",
      coordinates: [-3.60646951229918, 40.4459718293208]
    }
  },
  {
    district: "TETUAN",
    address: "CALLE SAN RAIMUNDO,41",
    position: {
      type: "Point",
      coordinates: [-3.70635356190509, 40.4516723965768]
    }
  },
  {
    district: "TETUAN",
    address: "AVENIDA GENERAL PERON,21",
    position: {
      type: "Point",
      coordinates: [-3.697124789819, 40.452751095325]
    }
  },
  {
    district: "TETUAN",
    address: "AVENIDA BRASIL,40",
    position: {
      type: "Point",
      coordinates: [-3.6866860867909, 40.3888013560539]
    }
  },
  {
    district: "TETUAN",
    address: "CALLE SAN GERMAN,7",
    position: {
      type: "Point",
      coordinates: [-3.6866860867909, 40.3888013560539]
    }
  },
  {
    district: "TETUAN",
    address: "CALLE GABRIEL PORTADALES,13",
    position: {
      type: "Point",
      coordinates: [-3.69867594302313, 40.4680822970142]
    }
  },
  {
    district: "TETUAN",
    address: "AVENIDA ASTURIAS,74",
    position: {
      type: "Point",
      coordinates: [-3.70031697354109, 40.4732925178178]
    }
  },
  {
    district: "TETUAN",
    address: "CALLE VIA LIMITE,29",
    position: {
      type: "Point",
      coordinates: [-3.69338862333863, 40.4736669366562]
    }
  },
  {
    district: "USERA",
    address: "AVENIDA LOS ROSALES,25",
    position: {
      type: "Point",
      coordinates: [-3.68918779198486, 40.3668360899678]
    }
  },
  {
    district: "USERA",
    address: "CALLE SEGURA,5",
    position: {
      type: "Point",
      coordinates: [-3.71928517877432, 40.3673179379729]
    }
  },
  {
    district: "USERA",
    address: "RONDA COOPERATIVAS,6",
    position: {
      type: "Point",
      coordinates: [-3.70583395297504, 40.3674013667012]
    }
  },
  {
    district: "USERA",
    address: "CAMINO PERALES,106",
    position: {
      type: "Point",
      coordinates: [-3.6887458741452, 40.374189055114]
    }
  },
  {
    district: "USERA",
    address: "CALLE FORNILLOS,7",
    position: {
      type: "Point",
      coordinates: [-3.71177366059978, 40.3834432843428]
    }
  },
  {
    district: "VICALVARO",
    address: "CALLE MINERVA,161",
    position: {
      type: "Point",
      coordinates: [-3.60659980339921, 40.3933304059431]
    }
  },
  {
    district: "VICALVARO",
    address: "CALLE LADERA DE LOS ALMENDROS,46",
    position: {
      type: "Point",
      coordinates: [-3.62696544431136, 40.3960081462818]
    }
  },
  {
    district: "VICALVARO",
    address: "PLAZA JUAN BENET,9",
    position: {
      type: "Point",
      coordinates: [-3.62319940227104, 40.4000470838648]
    }
  },
  {
    district: "VICALVARO",
    address: "PLAZA JUAN CARLOS ONETTI,3",
    position: {
      type: "Point",
      coordinates: [-3.61921073686107, 40.4016942033122]
    }
  },
  {
    district: "VICALVARO",
    address: "CALLE MERCURIO,69",
    position: {
      type: "Point",
      coordinates: [-3.60277518789337, 40.4043350390544]
    }
  },
  {
    district: "VICALVARO",
    address: "CALLE LAGO VAN,16",
    position: {
      type: "Point",
      coordinates: [-3.60579051053986, 40.4049236822028]
    }
  },
  {
    district: "VICALVARO",
    address: "BULEVAR INDALECIO PRIETO,1",
    position: {
      type: "Point",
      coordinates: [-3.61741706433037, 40.4051665281286]
    }
  },
  {
    district: "VICALVARO",
    address: "CALLE EZCARAY,76",
    position: {
      type: "Point",
      coordinates: [-3.61124698495875, 40.4118480222568]
    }
  },
  {
    district: "VALLECAS",
    address: "CALLE VILLAR DEL POZO,4",
    position: {
      type: "Point",
      coordinates: [-3.61712880199768, 40.3715279537133]
    }
  },
  {
    district: "VALLECAS",
    address: "CALLE BABILAFUENTE,2",
    position: {
      type: "Point",
      coordinates: [-3.62280206675015, 40.3725106174155]
    }
  },
  {
    district: "VALLECAS",
    address: "CAMINO SUERTE,28",
    position: {
      type: "Point",
      coordinates: [-3.61764664711357, 40.3740463327055]
    }
  },
  {
    district: "VILLAVERDE",
    address: "PLAZA GOMEZ ACEBO,1",
    position: {
      type: "Point",
      coordinates: [-3.70918722327698, 40.3420028988885]
    }
  },
  {
    district: "VILLAVERDE",
    address: "CALLE ALCOCER,1",
    position: {
      type: "Point",
      coordinates: [-3.69471987736826, 40.3505751601048]
    }
  },
  {
    district: "VILLAVERDE",
    address: "CALLE AFLUENTES,12",
    position: {
      type: "Point",
      coordinates: [-3.71678102954778, 40.350765322458]
    }
  },
  {
    district: "VILLAVERDE",
    address: "AVENIDA LOS ROSALES,129",
    position: {
      type: "Point",
      coordinates: [-3.67814959476892, 40.3524548838136]
    }
  },
  {
    district: "VILLAVERDE",
    address: "CALLE MENASALBAS,6",
    position: {
      type: "Point",
      coordinates: [-3.69627050511614, 40.3638358433165]
    }
  }
]

  Area.create(areas, err => {
    if (err) {
      throw err;
    }
   
    console.log(`Created ${areas.length} areas`);
    mongoose.connection.close();
  });




