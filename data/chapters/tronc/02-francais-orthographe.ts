import type { Chapter } from "@/lib/types";

export const chapter: Chapter = {
  slug: "fr-orthographe-concours",
  subject: "gardien-paix",
  grade: "concours",
  num: 2,
  title: "Orthographe et grammaire",
  domain: "grandeurs",
  domainLabel: "Français",
  icon: "SpellCheck",
  teaser:
    "Participes passés, homophones, pluriels, accord de « tout », majuscules administratives : les règles qui font la différence le jour J.",
  objectives: [
    "Je maîtrise l'accord du participe passé avec être, avec avoir et aux formes pronominales",
    "Je distingue sans hésiter les homophones grammaticaux les plus fréquents",
    "Je forme correctement le pluriel des noms composés",
    "Je sais quand « tout » s'accorde et quand il reste invariable",
    "J'emploie les majuscules conformément à l'usage administratif",
    "J'évite les pièges de conjugaison les plus sanctionnés",
  ],
  lesson: [
    {
      title: "L'accord du participe passé",
      paragraphs: [
        "Avec l'auxiliaire être, le participe passé s'accorde toujours en genre et en nombre avec le sujet : « Les candidates sont arrivées à huit heures. » C'est la règle la plus simple, et pourtant la première oubliée sous la pression du chronomètre.",
        "Avec l'auxiliaire avoir, le participe passé ne s'accorde jamais avec le sujet. Il s'accorde uniquement avec le complément d'objet direct lorsque celui-ci est placé avant le verbe : « Les convocations que nous avons reçues » — le pronom relatif « que » reprend « les convocations », placées avant le verbe, d'où l'accord. En revanche : « Nous avons reçu les convocations » ne prend aucune marque, puisque le complément suit le verbe. Le réflexe à installer : posez la question « qui ? quoi ? » après le verbe ; si la réponse se trouve avant, accordez.",
        "Les verbes pronominaux constituent le point le plus discriminant de l'épreuve. Lorsque le pronom réfléchi est complément d'objet direct, l'accord se fait avec lui : « Elles se sont lavées. » Lorsqu'un autre complément d'objet direct suit le verbe, il n'y a pas d'accord : « Elles se sont lavé les mains » — on lave quoi ? les mains, placées après. Et lorsque le pronom réfléchi est complément d'objet indirect, le participe reste invariable : « Ils se sont parlé » (parler à quelqu'un), « Elles se sont succédé » (succéder à quelqu'un), « Elle s'est rendu compte de son erreur ».",
        "Deux cas relèvent de la rédaction administrative. Le participe passé « fait » suivi d'un infinitif reste invariable : « Elle s'est fait remettre le dossier. » Et les formules « ci-joint », « ci-inclus », « vu », « excepté » demeurent invariables lorsqu'elles précèdent le nom en tête de phrase — « Ci-joint la copie du procès-verbal » — mais s'accordent lorsqu'elles le suivent : « les pièces ci-jointes ».",
      ],
      example: [
        "Le jury a examiné les copies. → aucun accord, le complément suit le verbe.",
        "Les copies que le jury a examinées. → accord, le complément « que » précède le verbe.",
        "Elles se sont succédé à la tête du service. → invariable, on succède À quelqu'un.",
      ],
      tip: "Trois questions dans l'ordre : 1) Quel auxiliaire ? Être → accord avec le sujet. 2) Avoir → y a-t-il un COD, et est-il placé avant ? 3) Verbe pronominal → le pronom « se » est-il COD ou COI ? Ce trio résout plus de neuf questions sur dix.",
    },
    {
      title: "Les homophones grammaticaux",
      paragraphs: [
        "Les homophones se distinguent par un test de substitution mentale, rapide et infaillible. « a » (verbe avoir) se remplace par « avait », « à » (préposition) non. « est » se remplace par « était », « et » par « et puis ». « ont » devient « avaient », « on » devient « il ». « sont » devient « étaient », « son » devient « le sien ». « ce » se remplace par « cela » ou par « ce…-là », « se » accompagne un verbe pronominal et se remplace par « me » à la première personne.",
        "Quelques couples reviennent presque à chaque session. « ces » est le pluriel de « ce » ou « cette » (« ces documents » = ceux-là) ; « ses » est le pluriel de « son » ou « sa » (« ses documents » = les siens). « c'est » se remplace par « cela est » ; « s'est » accompagne un verbe pronominal (« il s'est trompé ») ; « sait » et « sais » sont des formes du verbe savoir. « ou » exprime un choix et se remplace par « ou bien » ; « où » indique le lieu ou le temps.",
        "Autres pièges classiques. « leur » placé devant un verbe est un pronom personnel invariable (« je leur ai répondu ») ; placé devant un nom, c'est un déterminant possessif qui s'accorde (« leurs dossiers »). « quant à » signifie « en ce qui concerne », « quand » exprime le temps, « qu'en » équivaut à « que… de cela ». « près de » indique la proximité, « prêt à » la disposition. « peut-être » avec trait d'union est un adverbe de doute ; « peut être » sans trait d'union est le verbe pouvoir suivi de être. « quoique » signifie « bien que », « quoi que » signifie « quelle que soit la chose que ».",
        "Enfin, « quel que » s'écrit en deux mots devant le verbe être et s'accorde avec son sujet : « quelle que soit votre motivation », « quels que soient les résultats ». En un seul mot, « quelque » est un déterminant (« quelques minutes ») ou un adverbe invariable signifiant « environ » (« quelque trois cents candidats »).",
      ],
      example: [
        "Il a obtenu son affectation à Lyon. → « a » = avait ; « à » = préposition ; « son » = le sien.",
        "On leur a remis leurs badges. → « on » = il ; « leur » devant le verbe = invariable ; « leurs » devant le nom = accordé.",
        "Quelles que soient les circonstances, quant à moi, je maintiens ma candidature.",
      ],
      tip: "Ne cherchez pas à réfléchir au sens : appliquez mécaniquement le test de substitution. Si « avait » passe, écrivez « a » ; si « était » passe, écrivez « est » ; si « avaient » passe, écrivez « ont ». Deux secondes par mot, zéro faute.",
    },
    {
      title: "Le pluriel des noms composés",
      paragraphs: [
        "Le pluriel d'un nom composé dépend de la nature des mots qui le composent. Lorsque le composé associe deux noms, ou un nom et un adjectif, ou deux adjectifs, les deux éléments prennent la marque du pluriel : des choux-fleurs, des wagons-restaurants, des coffres-forts, des grands-parents, des sourds-muets.",
        "Lorsque le composé est formé d'un verbe et d'un nom, le verbe reste toujours invariable, car un verbe ne se met pas au pluriel ; seul le nom peut varier, selon le sens : des tire-bouchons, des essuie-glaces, des ouvre-boîtes. Mais on écrit des garde-boue, puisqu'un garde-boue ne retient pas plusieurs boues, la boue étant un indénombrable.",
        "Lorsque le composé associe un mot invariable — préposition ou adverbe — et un nom, seul le nom varie : des arrière-boutiques, des avant-postes, des non-lieux, des contre-pouvoirs.",
        "Restent les cas où le second élément équivaut à un complément introduit par une préposition sous-entendue : il demeure alors au singulier. On écrit des timbres-poste (des timbres pour la poste), des années-lumière (des années de lumière), des arcs-en-ciel (le pluriel se marque sur « arc » seul). Enfin, « garde » suivi d'un nom varie lorsqu'il désigne une personne — des gardes-malades — et reste invariable lorsqu'il est verbe : des garde-manger.",
      ],
      example: [
        "un chou-fleur → des choux-fleurs (nom + nom : les deux varient).",
        "un timbre-poste → des timbres-poste (« pour la poste » reste au singulier).",
        "un tire-bouchon → des tire-bouchons (le verbe « tire » ne varie jamais).",
        "un arc-en-ciel → des arcs-en-ciel (seul le premier nom varie).",
      ],
      tip: "Commencez par identifier la nature du premier élément. Si c'est un verbe, une préposition ou un adverbe, il ne bougera jamais. Le reste se joue sur le sens : demandez-vous s'il peut logiquement y en avoir plusieurs.",
    },
    {
      title: "L'accord de « tout »",
      paragraphs: [
        "« Tout » change de nature, et c'est cette nature qui commande l'accord. Déterminant, il s'accorde avec le nom qu'il accompagne : tout le dossier, toute la journée, tous les candidats, toutes les épreuves. Pronom, il s'accorde également : « Tous sont convoqués », « Toutes ont réussi ». Nom, il prend un s au pluriel : « des touts cohérents ».",
        "Adverbe, en revanche, « tout » signifie « entièrement, tout à fait » et reste en principe invariable : « Ils sont tout étonnés », « Elle est tout heureuse », « Elles sont tout émues ». C'est ici que se niche le piège du concours.",
        "Car cet adverbe invariable connaît une exception d'euphonie : devant un adjectif féminin commençant par une consonne ou un h aspiré, « tout » s'accorde. On écrit donc « Elle est toute contente », « Elles sont toutes honteuses », mais « Elle est tout émue » et « Elle est tout heureuse », parce que « émue » commence par une voyelle et que le h de « heureuse » est muet. Retenez la logique : l'accord n'intervient que pour faciliter la prononciation.",
        "Quelques expressions figées méritent d'être mémorisées telles quelles : « tout à coup » signifie soudainement, « tout d'un coup » signifie en une seule fois ; on écrit « en tout cas », « à tout hasard », « de toute façon », « à toute vitesse », « toutes proportions gardées ». Et l'on distingue « tout autre chose » (= entièrement différente, adverbe) de « toute autre solution » (= n'importe quelle autre, déterminant).",
      ],
      example: [
        "Tous les agents sont mobilisés. → déterminant, accordé.",
        "Les candidates étaient tout étonnées du sujet. → adverbe devant une voyelle, invariable.",
        "Les candidates étaient toutes surprises par le sujet. → adverbe devant une consonne au féminin, accordé.",
      ],
      tip: "Testez le remplacement par « entièrement ». Si la phrase tient, « tout » est adverbe : il reste invariable, sauf devant un adjectif féminin commençant par une consonne ou un h aspiré. Si le remplacement ne tient pas, « tout » est déterminant ou pronom, et il s'accorde.",
    },
    {
      title: "Majuscules administratives et conjugaisons pièges",
      paragraphs: [
        "Dans un écrit administratif, « État » prend une majuscule lorsqu'il désigne la puissance publique — « les services de l'État », « un fonctionnaire d'État » — et une minuscule lorsqu'il désigne une situation : « l'état de la voirie », « en état d'ébriété ». Les institutions uniques prennent également la majuscule au premier nom caractéristique : l'Assemblée nationale, le Sénat, le Parlement, le Conseil constitutionnel, le Conseil d'État, la Cour de cassation, la Constitution, la République. Notez que l'adjectif qui suit reste en minuscule.",
        "Les noms de fonction s'écrivent en principe en minuscules dans un texte courant : « le préfet a signé l'arrêté », « le ministre de l'Intérieur s'est exprimé ». L'usage protocolaire de l'administration met en revanche la majuscule lorsque le titre désigne la personne à laquelle on s'adresse ou qui signe l'acte : « Monsieur le Maire », « Madame la Directrice », « le Ministre décide ». Retenez la distinction : le titre employé comme formule d'adresse ou de signature prend la majuscule ; employé comme simple description, il n'en prend pas.",
        "Trois règles complètent l'ensemble. Les accents sont obligatoires sur les majuscules : on écrit « État », « À compter du 1er septembre », « Éducation nationale » — l'oubli est compté comme une faute. Le nom de peuple prend la majuscule quand il est substantif — « les Français » — mais la minuscule comme adjectif ou nom de langue : « un agent français », « il parle français ». Enfin, dans un nom de ministère, seul le domaine porte la majuscule : le ministère de l'Intérieur, le ministère de la Justice.",
        "Côté conjugaison, quatre pièges reviennent sans cesse. Le futur et le conditionnel à la première personne : « je serai présent » exprime une certitude, « je serais présent si… » une hypothèse. Le participe passé et l'infinitif après une préposition : remplacez par un verbe du troisième groupe — « il a mangé » (mordu) mais « il va manger » (mordre). Le subjonctif après « il faut que » : « il faut que vous fassiez », « que vous disiez », jamais « que vous faisiez ». Et les composés de « dire » : on écrit « vous dites » et « vous redites », mais « vous prédisez », « vous contredisez », « vous interdisez », « vous médisez ». Ajoutez-y la règle de l'hypothèse : après « si », jamais de conditionnel — « si j'avais su », et non « si j'aurais su ».",
      ],
      example: [
        "Les services de l'État constatent l'état du bâtiment. → majuscule puis minuscule.",
        "Monsieur le Préfet, j'ai l'honneur de solliciter… → formule d'adresse, majuscule.",
        "Demain, je serai convoqué ; si j'étais reçu, je serais affecté en région parisienne.",
      ],
      tip: "Pour « serai » ou « serais », transposez à la troisième personne : « il sera » impose « je serai » ; « il serait » impose « je serais ». Pour « -é » ou « -er », substituez « vendu » ou « vendre ». Deux automatismes, deux fautes évitées.",
    },
  ],
  exercises: [
    {
      id: "orth-1",
      level: 1,
      type: "qcm",
      question: "Complétez : « Les convocations que nous avons ___ ce matin sont incomplètes. »",
      choices: ["reçu", "reçus", "reçues", "reçue"],
      answer: 2,
      explanation:
        "Le participe passé employé avec l'auxiliaire avoir s'accorde avec le complément d'objet direct lorsque celui-ci précède le verbe. Ici, le pronom relatif « que » reprend « les convocations », féminin pluriel : on écrit donc « reçues ». Le piège : si l'on écrit « Nous avons reçu les convocations », le complément suit le verbe et aucun accord n'est possible.",
      hint: "Posez la question « nous avons reçu quoi ? » et regardez où se trouve la réponse.",
    },
    {
      id: "orth-2",
      level: 1,
      type: "qcm",
      question: "Complétez : « Il ___ arrivé ___ huit heures précises. »",
      choices: ["et / a", "est / a", "et / à", "est / à"],
      answer: 3,
      explanation:
        "« est » est le verbe être, remplaçable par « était » : « il était arrivé ». « à » est une préposition introduisant l'heure ; elle ne peut pas être remplacée par « avait ». Le double test de substitution règle la question en deux secondes, sans réfléchir au sens de la phrase.",
      hint: "Remplacez le premier mot par « était » et le second par « avait ».",
    },
    {
      id: "orth-3",
      level: 1,
      type: "truefalse",
      question: "Le participe passé employé avec l'auxiliaire être s'accorde avec le sujet.",
      answer: true,
      explanation:
        "Exact : avec l'auxiliaire être, l'accord se fait toujours en genre et en nombre avec le sujet — « Les candidates sont arrivées ». Ne transposez surtout pas cette règle à l'auxiliaire avoir : avec avoir, le participe ne s'accorde jamais avec le sujet, mais seulement avec le complément d'objet direct placé avant le verbe.",
    },
    {
      id: "orth-4",
      level: 1,
      type: "input",
      question: "Écrivez « un chou-fleur » au pluriel.",
      answer: "des choux-fleurs",
      accept: ["choux-fleurs", "des choux-fleurs"],
      explanation:
        "« Chou-fleur » associe deux noms : les deux prennent la marque du pluriel, et « chou » forme son pluriel en x, comme bijou, caillou, genou, hibou, joujou et pou. On écrit donc « des choux-fleurs ». Comparez avec « des timbres-poste », où « poste » reste au singulier parce qu'il équivaut à « pour la poste ».",
      hint: "Deux noms côte à côte : les deux varient. Attention aussi au pluriel particulier de « chou ».",
    },
    {
      id: "orth-5",
      level: 1,
      type: "qcm",
      question: "Complétez : « ___ les candidats sont convoqués à sept heures trente. »",
      choices: ["Tous", "Tout", "Toute", "Toutes"],
      answer: 0,
      explanation:
        "« Tout » est ici déterminant : il accompagne le nom « candidats », masculin pluriel, et s'accorde donc en « tous ». Il ne reste invariable que dans son emploi adverbial, au sens de « entièrement » — et encore, avec l'exception d'euphonie devant un adjectif féminin commençant par une consonne.",
      hint: "Peut-on remplacer le mot par « entièrement » ? Si non, il s'accorde.",
    },
    {
      id: "orth-6",
      level: 2,
      type: "qcm",
      question: "Complétez : « Elles se sont ___ les mains avant l'épreuve. »",
      choices: ["lavées", "lavé", "lavés", "lave"],
      answer: 1,
      explanation:
        "Le complément d'objet direct est « les mains », placé après le verbe : le participe reste donc invariable. Comparez avec « Elles se sont lavées », où le pronom « se » est lui-même complément d'objet direct et commande l'accord. C'est l'un des couples de phrases les plus fréquemment proposés aux concours de catégorie C.",
      hint: "On lave quoi ? Repérez la réponse et voyez si elle précède ou suit le verbe.",
    },
    {
      id: "orth-7",
      level: 2,
      type: "qcm",
      question: "Quelle graphie est correcte dans un écrit administratif : « L'___ garantit l'égalité devant la loi » ?",
      choices: ["état", "Etat", "État", "ETAT"],
      answer: 2,
      explanation:
        "Désignant la puissance publique, le mot prend une majuscule ; et cette majuscule doit être accentuée, l'accent étant obligatoire sur les capitales. On écrit donc « État ». La graphie « Etat » sans accent est comptée comme une faute. En revanche, au sens de situation, le mot reste en minuscule : « l'état du véhicule ».",
      hint: "Deux points à vérifier : la majuscule et son accent.",
    },
    {
      id: "orth-8",
      level: 2,
      type: "truefalse",
      question: "Dans « des timbres-poste », le mot « poste » prend la marque du pluriel.",
      answer: false,
      explanation:
        "Faux : on écrit « des timbres-poste », sans s à « poste ». Le second élément équivaut à un complément introduit par une préposition sous-entendue — des timbres pour la poste — et reste donc au singulier. Même logique pour « des années-lumière », c'est-à-dire des années de lumière.",
      hint: "Reformulez le composé avec une préposition : des timbres… quoi ?",
    },
    {
      id: "orth-9",
      level: 2,
      type: "qcm",
      question: "Complétez : « Les candidates étaient ___ étonnées par la difficulté du sujet. »",
      choices: ["toutes", "toute", "touts", "tout"],
      answer: 3,
      explanation:
        "« Tout » est ici adverbe, au sens de « entièrement » : il reste invariable devant l'adjectif « étonnées », qui commence par une voyelle. Le piège tient à l'exception : devant un adjectif féminin commençant par une consonne ou un h aspiré, l'adverbe s'accorde — on écrirait « les candidates étaient toutes surprises ». Une seule lettre change, et le sens aussi : « toutes étonnées » signifierait que toutes l'étaient.",
      hint: "Par quelle lettre commence l'adjectif qui suit ?",
    },
    {
      id: "orth-10",
      level: 2,
      type: "input",
      question:
        "Conjuguez au futur simple, à la première personne du singulier : « Demain, je ___ (être) présent à la convocation. »",
      answer: "serai",
      explanation:
        "Le futur simple à la première personne se termine par -ai, sans s : « je serai ». Avec un s, « je serais » est un conditionnel présent, réservé à l'hypothèse : « je serais présent si j'étais convoqué ». La méthode de contrôle consiste à transposer à la troisième personne : « il sera » impose « je serai », « il serait » impose « je serais ».",
      hint: "Transposez la phrase à la troisième personne du singulier.",
    },
    {
      id: "orth-11",
      level: 3,
      type: "qcm",
      question: "Complétez : « Les deux directeurs se sont ___ à la tête du service. »",
      choices: ["succédé", "succédés", "succédées", "succèdent"],
      answer: 0,
      explanation:
        "On succède à quelqu'un : le pronom « se » est donc complément d'objet indirect, et le participe reste invariable. Même raisonnement pour « ils se sont parlé », « elles se sont téléphoné », « elle s'est rendu compte ». Le réflexe : cherchez la préposition qui accompagne le verbe à l'infinitif ; si c'est « à », il n'y a pas d'accord.",
      hint: "Dit-on succéder quelqu'un ou succéder à quelqu'un ?",
    },
    {
      id: "orth-12",
      level: 3,
      type: "qcm",
      question: "Complétez : « Les pièces ___ complètent votre dossier de candidature. »",
      choices: ["ci-joint", "ci-joints", "ci-jointes", "ci-jointe"],
      answer: 2,
      explanation:
        "Placé après le nom, « ci-joint » a valeur d'adjectif et s'accorde : « les pièces ci-jointes ». Il reste en revanche invariable lorsqu'il ouvre la phrase ou précède directement un nom sans déterminant : « Ci-joint la copie du procès-verbal », « vous trouverez ci-joint copie de l'arrêté ». Cette formule est omniprésente dans la correspondance administrative.",
      hint: "La formule est-elle placée avant ou après le nom auquel elle se rapporte ?",
    },
    {
      id: "orth-13",
      level: 3,
      type: "truefalse",
      question: "La phrase « Si j'aurais su, je ne serais pas venu » est correctement construite.",
      answer: false,
      explanation:
        "Faux. Après « si » exprimant l'hypothèse, on n'emploie jamais le conditionnel. La construction correcte associe l'imparfait dans la subordonnée et le conditionnel présent dans la principale, ou le plus-que-parfait et le conditionnel passé : « Si j'avais su, je ne serais pas venu. » Formulez la règle ainsi : les si n'aiment pas les rais.",
      hint: "Quel temps peut suivre « si » dans une hypothèse ?",
    },
    {
      id: "orth-14",
      level: 3,
      type: "qcm",
      question: "Complétez : « ___ à moi, je ne partage pas l'analyse du rapporteur. »",
      choices: ["Quant", "Quand", "Qu'en", "Quand à"],
      answer: 0,
      explanation:
        "« Quant à » signifie « en ce qui concerne » et s'écrit avec un t. « Quand » exprime le temps et se remplace par « lorsque » ; « qu'en » équivaut à « que… de cela ». La graphie « quand à » n'existe pas : c'est l'une des fautes les plus fréquemment relevées dans les copies.",
      hint: "Remplacez par « en ce qui me concerne ».",
    },
    {
      id: "orth-15",
      level: 3,
      type: "qcm",
      question: "Complétez : « Il faut que vous ___ ce rapport avant vendredi. »",
      choices: ["faisiez", "faites", "ferez", "fassiez"],
      answer: 3,
      explanation:
        "« Il faut que » impose le subjonctif présent : « que vous fassiez ». La forme « faisiez » est un imparfait de l'indicatif, « faites » un présent de l'indicatif, « ferez » un futur : aucun ne convient après cette locution. Retenez la série des subjonctifs irréguliers les plus demandés : que je fasse, que je sois, que j'aie, que j'aille, que je puisse, que je sache.",
      hint: "Après « il faut que », quel mode s'impose ?",
    },
  ],
};
