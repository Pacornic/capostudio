/* ============================================================
   Datos del catálogo. Editar aquí para añadir o cambiar juegos.
   ============================================================ */

/* Reconstrucción de URLs de imágenes de BoardGameGeek.
   Acepta token comprimido "H1~H2~pic" (datos curados) o una URL completa
   http(s) (lo que trae la actualización automática para juegos nuevos). */
window.COVER = function (t) {
  if (!t) return null;
  if (/^https?:\/\//.test(t)) return t;
  var s = t.split('~');
  return 'https://cf.geekdo-images.com/' + s[0] + '__itemrep/img/' + s[1] + '=/fit-in/246x300/filters:strip_icc()/' + s[2];
};
window.PHOTO = function (t) {
  if (!t) return null;
  if (/^https?:\/\//.test(t)) return t;
  var s = t.split('~');
  return 'https://cf.geekdo-images.com/' + s[0] + '__large/img/' + s[1] + '=/fit-in/1024x1024/filters:no_upscale():strip_icc()/' + s[2];
};

/* Juegos. cat: "pub" (publicados) | "soon" (próximamente) | "wip" (en desarrollo, ficha BGG) */
window.GAMES = [
  {i:"131241",n:"Oilfield",y:"2016",cat:"pub",pl:"2-5",t:"60 min",ag:"12+",d:"Puja por licencias, construye torres de perforación, extrae petróleo, abastece el mercado y exporta tu producción.",c:"XPVCPdPR0DQdZWmrGZVh1g~GPnqu2J-_H9-Xyj9tfXpyh4BRfI~pic3008216.jpg",p:["XPVCPdPR0DQdZWmrGZVh1g~hjD6-EV_d6AOMbMFFZlXoJFvzdw~pic3008216.jpg","lsc0kwQ74fK9mKfaNewepw~vwHdxjKC6tHvGZtaeIHUT72V76g~pic3008217.jpg","hMp9At4ockpsYYcMUNKsoA~hYq7JuCoDTUXGUsD4ZyiFpzuxH4~pic2686153.png","UotBFroGXLmP7KMDshreEg~A-nJh4Ljrrh1WbJoVfD2ke_mrB4~pic3117009.png","6CVifVDezJSjQfbYWrqhOg~IP25cD4lD0Mxv-f4NPbIxQlk9F0~pic3116216.png"]},
  {i:"203002",n:"Zampa La Granja",y:"2017",cat:"pub",pl:"2-5",t:"10-20 min",ag:"5+",d:"Compite por ser el mejor granjero: consigue el mayor número y variedad de animales y, sobre todo, aliméntalos bien. La comida está repartida por las granjas.",c:"Hpe8Z9x9cg5U5v9qB6fhBg~uCdI0GsMGdbqYJbA2ltUpLM43CE~pic3674980.png",p:["Hpe8Z9x9cg5U5v9qB6fhBg~wXRle8agg0xTavl9evE_Ta7Eo6A~pic3674980.png","JOY76ywSr-QjS1BEpIyLzg~dYSMNK1Loz-lb91aiuNrhg33sig~pic3496372.jpg","8IhMg9e6Qd2xFuo7w-ZFqg~N_gSBgd9GV4phvuxeCXHoDK3S6c~pic3169424.png","WgORACRXO7qRyXXx9ElKKQ~l-omyGicI-v1VcVm8huaqk_ihC0~pic3138827.jpg","uXK2L_JCOUZvzlSW6kz05Q~aOXjuNhpIqbSHopAkR-a0v8Atj8~pic3674942.jpg"]},
  {i:"228101",n:"Pajarracos",y:"2018",cat:"pub",pl:"3-8",t:"5-10 min",ag:"6+",d:"Juego rápido en el que los granjeros compiten por recoger las frutas más deliciosas al final de la partida... si los pajarracos no se cruzan en tu camino.",c:"8Ep47pUPHnigp7_GZjTT1g~alqhXezV8nhtLR7I1zsZ2_uR9YQ~pic3947953.jpg",p:["aPMSLaXqHzsbb-6hwcwQ7w~_amkfsdtPu_LwqeBOIry44mOaZo~pic6232270.jpg","WWvqOhzKzkOdk_kFfxzdIw~Eou3yhLHNj3q7iP406aOllbBZdw~pic9062342.jpg","vSNiSvCK83gud9O8m_KEpw~_EA-sduaFcvLuwCue90qCGbszKs~pic9062341.jpg","jtaoQxynD7gO3XV8xea2Yg~n2-zEIbJD_mDA58bJd7VUnjaz2g~pic6232269.jpg","8Ep47pUPHnigp7_GZjTT1g~WzRHYH5G2Y7uJhwx5Uytw98V8jU~pic3947953.jpg"]},
  {i:"256621",n:"Trainsilvania",y:"2019",cat:"pub",pl:"2-4",t:"15 min",ag:"6+",d:"Termina un largo día de rodaje en los estudios de Monsterwood y toca volver a casa. Subir al tren a tiempo no será tarea fácil.",c:"GOXCGXl8mwDBorAmrasNAA~WIeEXhN5p-hv_EhUQ51HgrEp6fQ~pic4266169.jpg",p:["GOXCGXl8mwDBorAmrasNAA~wsOkxi7R1fCVopVqGRDeAzPIKbk~pic4266169.jpg","uvho8Ka84iDmth09kcHekQ~3bSPfwxKkPFBjk6Ddv4OlWoGxR4~pic4265951.jpg","VF3mOuW_mU1mTC67fO2Dpg~udEeRwRkCRC6Xycy04NV_iCgfKo~pic4267190.jpg","4rdhHpCJpr75vYev6ykkQA~we0VG4Ve05DBrZD-Q8pKgCKYKfw~pic4266152.jpg","YPWiSQ5buMTRqhfY0Z8Nvg~ejWfJ7USdYzhnP310UHoewGzb4k~pic4266123.jpg"]},
  {i:"293777",n:"Wigetta y las gemas mágicas",y:"2019",cat:"pub",pl:"2-5",t:"5-10 min",ag:"6+",d:"Willyrex, Vegetta777 y sus amigos despiertan en una cueva misteriosa llena de peligros. Con la ayuda de los Goblins intentarán salir.",c:"Pi88PL4EtJJPFUDY7d0SmQ~vPp9HhC1QLWqGt4en-tr0-b1CMw~pic5133158.jpg",p:["vQ5n-NLcf0tqW7CI6Zbk8w~QMQcufQO0TOcAilVLxOoMRbG25s~pic5166291.png","vjMKa-Pd-RsM5Pc-3iHBtA~PyJpe4A5UsIN_cMp1WbLX9CIvYA~pic5166290.png","MMPuTo7mA6mZsNXqWrFLYQ~y4dv8wsZmSbXrhFeNVkiyvhoTcU~pic5166289.png","Pi88PL4EtJJPFUDY7d0SmQ~l1ddona-r_Q4_0RehDOHxPjrT_g~pic5133158.jpg"]},
  {i:"277109",n:"Sencha",y:"2019",cat:"pub",pl:"2-4",t:"45 min",ag:"8+",d:"Sencha es el té verde más popular de Japón. Los jugadores representan monasterios que compiten por cosechar el mejor té en el Japón de los shogunes.",c:"dSiu8QP2NSl1DOZkCSdwcg~tAmtzpAogbHGt_Z7l7ui3Qkp790~pic5104109.png",p:["dh9GOOiBiHhdbyjVk7j8-g~WlebuSx1Y6HYJquoRFMvR1KVRUk~pic4993596.jpg","acgopH5QqRsss06PY7mkXQ~FuzjtYWA51LKGv_xAuj2gILeDqo~pic6082087.jpg","rREbL7xr3OdIe1z2RFfvrQ~vGsFcuOlELKPnz2HmCIblNsRc_A~pic5060524.jpg","O3ef4ouajyAQOi9XATcBew~OX9jSkpDj0opF6sgoGgESaSiIPI~pic5034815.jpg","P8wP5LR_rKsSwebhE4rseg~zf6eAxSWYXTkPzJgg05rbNIxe5I~pic5208500.jpg"]},
  {i:"298147",n:"Einer geht noch!",y:"2020",cat:"pub",pl:"2-5",t:"20 min",ag:"8+",d:"¡A punto de volcar! En alta mar, el destino de los animales pende de un hilo.",c:"Vv0vupTagTD8NJdrqPNgUw~PPQjKzeVRcTtj2W3vK4mgD6DORY~pic5158691.jpg",p:["WsQBryEZ24CyM2vLO9WJ9A~XLqjHxM0HyUFjg_nxncIQ7jlhP8~pic5159366.jpg","2CQaeDp9p1cXgg3RDHExxA~RHhLY9VWB9kGICEdAhJvHMuoRsY~pic5158694.jpg","tFimX3Xf0I8yr5CvEuQi1A~uk1I6V0-O2ZfsAo4uZC13EsvD2k~pic5158692.jpg","Vv0vupTagTD8NJdrqPNgUw~vSRqezRAHlAoRMlEIi4_DC6uVxs~pic5158691.jpg"]},
  {i:"239031",n:"Sabuesos",y:"2021",cat:"pub",pl:"2-5",t:"15-20 min",ag:"6+",d:"Envía a tus traviesos perros al jardín a por huesos... ¡y evita la basura!",c:"OUw7wpJWBOyjjU6poCulIw~NSAUXoyANs02yjn3mmBqsM8bC5M~pic5879429.jpg",p:["Q6kV_QGxoMKvGqIukw7whw~kG0dSG_zFOsmmZv3Rxc4Rm1rUn0~pic6053326.jpg","INr7xoDyeXWUQfOcfuObSQ~LzzSiD1719DnE1itN2-sImm5Bao~pic6053325.jpg","sJUkVwRWEg684Xvvmyc_CQ~EBFLJ77aVI1yOtet3Fy_aF7mGhM~pic6053324.jpg","jwsBWLuYqylN5YvfrCQfaw~fW0Q7chUtg8Tgn7IrKY6C4KrzcA~pic6053323.jpg","wWaWECuOwDdw2VvG3Za3Jw~rbnv0GBOD-A8aM3QVkbzDSpfLMo~pic6053322.jpg"]},
  {i:"355205",n:"Pajarracos Party",y:"2022",cat:"pub",pl:"2-8",t:"5-10 min",ag:"6+",d:"Consigue más fruta que tus rivales en esta versión fiestera de Pajarracos.",c:"wvv3lMc79M8wXUDBkyp6cA~uV1DfOG6_DocasCwsFw9KqtGPAg~pic7281390.jpg",p:["WI8JQqp7p1QCucB9CAd3Sw~PrBzsJxWCcZt1zpCMOrdu37CgcI~pic7105970.jpg","Q49uXsnLeb2e7OogyiRrEw~sdexgwLXjHVjbe_qaUnP4aPZuPs~pic7105969.jpg","GyP5R4Ked3aF_QP1AU0tNw~vR-sJDmkJ0QXRYoShkWZ4Sm8oAw~pic7105967.jpg","nc9EPkrUiEBNyE6jLJSWlA~BdPbviY6jQzFDz1dhPYwtckHiD4~pic7105966.jpg","H9Hl_qexyn2X9F93l8KBmw~4TNc2olqi-FfEuaMcn8ILec28mM~pic7105965.jpg"]},
  {i:"378958",n:"Trainsilvania (2023)",y:"2023",cat:"pub",pl:"2-4",t:"12-25 min",ag:"6+",d:"Juega cartas para mover el tren y súbete o bájate en la estación correcta.",c:"v9rYBYxYmil_oADoqCjpaw~1ATvpfuK8YjPN_wOz-icAAqhk4k~pic7332876.jpg",p:["bR0om2bvYLgqG0MiNWHwIQ~rsw3SUspjdzcOokI19d44bbGFJQ~pic7332878.jpg","fAOXOANxVfeyce2y-FCjXw~4cW6UHdhWPSH6OjvbvQrqIIwKJw~pic7332877.jpg","v9rYBYxYmil_oADoqCjpaw~GD3f4U9A4BDNQYQucN-mK9mNdaE~pic7332876.jpg","XYqvIOAOwnX10EJp2PWu-A~7KCV9J9rbfixLsFZz_ONCbveXSE~pic5732131.jpg"]},
  {i:"368352",n:"Satori",y:"2023",cat:"pub",pl:"1-4",t:"25-100 min",ag:"14+",d:"Avanza por el camino espiritual y alcanza la iluminación.",c:"NQcETSO7FzG1nXj5vmZjgg~5Mi8doXIezEjpUQdB93qMcmnNPU~pic7539533.jpg",p:["glSEtKNeiH5PppDuv_waag~QKlMDC_1vPMiNuGJu4GX1QJH9Oo~pic7539574.png","SysCCArtXKw0xo8MRXCRnw~KUomDbCUMys8ibR_KXx9oYnk7ZY~pic7539573.png","4RL47InrAZ_K_LbWEeRaiw~CzxOgP2_evYcsO9NzbH94ZsRZNw~pic7539572.png","dTGfjKStfxitt3zPGKBYsA~U6pRd4U1UmJRVjL7cbVs7Zws-Ew~pic7539568.png","QWIlnGy2I9WRArkiJODUhw~SH3Mkbnskw_dekvBTpcgXSO6Z1M~pic7539571.png"]},
  {i:"402674",n:"All Aboard!",y:"2025",cat:"pub",pl:"2-5",t:"20 min",ag:"7+",d:"Salva a tantos animales como puedas subiéndolos a los barcos.",c:"ItB1ErzUJZjqcQCT6S11VQ~BNtHjdQT1_yCbTppsJwuHfHBKWk~pic7774181.jpg",p:["uBhcmWoFkNeTBRX8qZCmcw~pId-1kcV8L42S-Orn3tbp7MjYBU~pic9001551.png","aQtTgf2q-rnuzjuZrtssYw~CYCtS6Wp4RUHgGhXE8PG0vpfcIc~pic8894216.jpg","oCVd4f7BxrK19-ZVzcEADA~AXtwLtOcGyMv5kNlmI10slktv7k~pic8894214.jpg","ANe2TtL6AlXYD5r2JyUCQw~CSBKBoQlZOhtJfzkFPcIoNcKRIg~pic8894212.jpg","B0fzseiOVgGnoGp-Cr9tFw~PxhvFbWgYKJe9aFq5dqGAwUSHM0~pic8872953.jpg"]},
  {i:"434143",n:"Bango",y:"2025",cat:"pub",pl:"2-5",t:"15 min",ag:"8+",d:"Tienta a la suerte para completar tus secuencias en este juego de cartas fácil de aprender.",c:"95B8FnXyFT0Z1098gpPZyQ~bTzwT5OuYSUAkJyqBEud1tv8WAA~pic8648421.png",p:["1SRcQI_zWLZVOF6E5zgHwA~pzsml6OM2IjXytiAO-HYDmgtXYA~pic8648425.png","HXEWqM2xFiAXRiuAiGfjqw~KDYaXmkeVWF4orwjGm7qMtT90y8~pic8648424.png","RZGyl7MCKI9dul8nrZHJtA~9kRivq7HHDDcRMhy0OkQK61bp4A~pic8648423.png","Hjka7Etbi1fQI5Puj9iDrg~B-421MMjU0k512UqdyJ2iw0FbBM~pic8648422.png","95B8FnXyFT0Z1098gpPZyQ~IiaESc1DGnXQxqWX9204juFqtDw~pic8648421.png"]},
  {i:"455368",n:"Salem",y:"2025",cat:"pub",pl:"2-4",t:"20-30 min",ag:"10+",d:"Compite como mercader alquimista en el mercado más mágico.",c:"_7MRtkx2yDOLaeieXA-cBQ~1hxJvYPb951Xh3fQqBWcq2syaKM~pic9136990.jpg",p:["_7MRtkx2yDOLaeieXA-cBQ~khzZfGY9mbbsAgS5Byw06L4IFIk~pic9136990.jpg","bTVYS8kYNEl_tEh86ByY2w~aU5jDQFvkBgS41TlzeN-_Tu-Liw~pic9136986.jpg","WQCJ34paPtSEzGrKCaEp8g~J8jI1MLtUAq-z5GEbdnn78XO274~pic9136985.jpg","Wzr3p2xylAAyFzXrNXhN1g~SwIh8afW7qq_wuWV7hyfBbU8JOo~pic9136984.jpg"]},
  {i:"309416",n:"Akihabara",y:"Próximamente",cat:"soon",pl:"2-4",t:"15-20 min",ag:"7+",d:"Transforma la vieja Ciudad Eléctrica de Tokio en el vibrante Akihabara.",c:null,p:[]},
  {i:"428723",n:"Banzai",y:"Próximamente",cat:"soon",pl:"2-5",t:"20-30 min",ag:"8+",d:"Prepárate para desafiar a los demás clanes de la ciudad.",c:null,p:[]},
  {i:"480738",n:"Belladonna",y:"2027",cat:"soon",pl:"1-4",t:"60-120 min",ag:"14+",d:"Invita, sienta y envenena a los nobles en el siniestro banquete de Catalina de Médici.",c:"https://cf.geekdo-images.com/-C63ybOBUfekReBvZFxKuA__itemrep/img/vb6niORyC50W8RudugvaWD34FyA=/fit-in/246x300/filters:strip_icc()/pic9865362.png",p:["https://cf.geekdo-images.com/RjJxGHqLvg8bT2QTaUcyig__large/img/X6ozHATijT319x1I28gjFYsLmYA=/fit-in/1024x1024/filters:no_upscale():strip_icc()/pic9865476.png","https://cf.geekdo-images.com/-C63ybOBUfekReBvZFxKuA__large/img/izErc8FM9jU11XvwNtqrzCx-coY=/fit-in/1024x1024/filters:no_upscale():strip_icc()/pic9865362.png"]}
];

/* Mecánicas por juego (traídas de BGG). Clave = id del juego. Edita libremente. */
window.MECH = {
  "131241": ["Area Majority / Influence", "Auction / Bidding", "Simultaneous Action Selection", "Worker Placement"],
  "203002": ["Memory", "Push Your Luck", "Set Collection"],
  "228101": ["Hand Management", "Open Drafting", "Set Collection"],
  "256621": ["Area Majority / Influence", "Hand Management", "Pick-up and Deliver", "Take That"],
  "293777": ["Set Collection"],
  "277109": ["Area Majority / Influence", "Worker Placement"],
  "298147": ["Hand Management", "Push Your Luck", "Take That"],
  "239031": ["Area Majority / Influence", "Push Your Luck", "Set Collection", "Take That"],
  "355205": ["Hand Management", "Open Drafting", "Set Collection"],
  "378958": ["Memory", "Take That"],
  "368352": ["Open Drafting", "Solo / Solitaire Game", "Worker Placement, Different Worker Types"],
  "402674": ["Hand Management", "Push Your Luck", "Take That"],
  "434143": ["Push Your Luck", "Set Collection"],
  "455368": ["Market", "Negotiation", "Set Collection"],
  "309416": ["Grid Coverage", "Push Your Luck", "Tile Placement"],
  "428723": ["Area Majority / Influence", "Betting and Bluffing", "Hand Management", "Set Collection"],
  "480738": ["Action Retrieval", "Deck, Bag, and Pool Building", "End Game Bonuses", "Grid Coverage", "Hand Management", "Pattern Building", "Point to Point Movement"]
};

/* Editoriales por juego (traídas de BGG). Clave = id del juego. */
window.PUB = {
  "131241": ["ABBA Games"],
  "203002": ["Zacatrus"],
  "228101": ["Evrikus", "Ludopolis", "Zacatrus"],
  "256621": ["Zacatrus"],
  "293777": ["ABBA Games"],
  "277109": ["Last Level", "Taverna Ludica Games"],
  "298147": ["Zoch Verlag"],
  "239031": ["TCG Factory"],
  "355205": ["Zacatrus"],
  "378958": ["Zoch Verlag"],
  "368352": ["Giant Roc", "Lifestyle Boardgames Ltd", "Perro Loko Games"],
  "402674": ["Devir", "999 Games", "GaGa Games"],
  "434143": ["Funnyfox", "AllGo-Games", "Gémklub", "Hachette Boardgames Benelux"],
  "455368": ["Last Level"],
  "309416": ["TCG Factory"],
  "428723": ["En búsqueda de editorial"],
  "480738": ["Perro Loko Games"]
};

/* ============================================================
   PROTOTIPOS JUGABLES (pestaña "En desarrollo").
   Para añadir uno: copia su carpeta/HTML dentro de /dev/ y
   agrega una entrada aquí. "path" = ruta desde la raíz del sitio.
   Campos opcionales: players, time, tags[], updated.
   El botón "Jugar" abre el juego en su propia URL (pantalla
   completa) y "Copiar enlace" la comparte. Acceso abierto.
   ============================================================ */
/*  PLANTILLA — copia este bloque para cada juego nuevo (todo opcional salvo name y path):
  {
    name:     "Nombre del juego",
    subtitle: "Mecánica principal en una línea",
    type:     "Juego de mesa",              // o "Juego de cartas"
    emoji:    "🐺",                          // miniatura si no pones imagen
    color:    "#2f4a3a",                     // color de fondo de la miniatura
    thumb:    "dev/mi-juego/cover.jpg",      // imagen de portada (si la tienes; sustituye a emoji)
    desc:     "Descripción del juego para los testers.",
    players:  "2-4 jugadores",
    time:     "20-30 min",
    tags:     ["Colocación de losetas", "Gestión de recursos"],
    path:     "dev/mi-juego/index.html",     // página jugable
    rulebook: "dev/mi-juego/reglamento.pdf", // opcional; muestra el botón Reglamento
    updated:  "2026-10-16"
  },
*/
window.PROTOS = [
  {
    name: "The Wild Call",
    // subtitle: "Prototipo en desarrollo",
    type: "Card Game",
    emoji: "🐺",
    color: "#2f4a3a",
    desc: "Roar louder. Climb higher. Prove your clan is the loudest",
    players: "2-5 jugadores",
    time: "20 min",
    tags: ["Trick Taking","Take that","Deduction"],
    path: "dev/The Wild Call/the-wild-call.html",
    rulebook: "https://drive.google.com/file/d/1oKAbW3YUEXA4x5CShpT5cVuJJFToxlJ7/view?usp=sharing",
   // updated: "2026-10-16"
  }
  
  ,
  
    {
    name: "Niwa",
    // subtitle: "Prototipo en desarrollo",
    type: "Board Game",
    emoji: "🐞",
    color: "#2f4a3a",
    desc: "Build in harmony. Show the world your garden is the most beautiful.",
    players: "2-4 players",
    time: "20 min",
    tags: ["Tile Placement","Set Colletion","Open Drafting","End Game Bonuses"],
    path: "dev/Niwa/Niwa.html",
    rulebook: "https://drive.google.com/file/d/1YivzPYrD2oEUi4CDQ6plAhbYMdpO0mLu/view?usp=sharing",
   // updated: "2026-10-16"
  },
  {
    name: "Gossip",
    type: "Card Game",
    emoji: "🗣️",
    color: "#2f4a3a",
    desc: "Spread the rumor, snap the shot, cash in before your rivals do.",
    players: "2-5 players",
    time: "20 min",
    tags: ["Push Your Luck", "Set Collection"],
    path: "",
    rulebook: "https://drive.google.com/file/d/1lCwEBJOFqIh1WBzrhjASJ7T-PmIvU5UJ/view?usp=sharing"
  }
  
  
  
];
