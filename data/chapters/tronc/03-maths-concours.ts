import type { Chapter } from "@/lib/types";

export const chapter: Chapter = {
  slug: "maths-concours",
  subject: "gardien-paix",
  grade: "concours",
  num: 3,
  title: "Calculs et raisonnement",
  domain: "donnees",
  domainLabel: "Mathématiques",
  icon: "Calculator",
  teaser:
    "Pourcentages, proportionnalité, conversions, moyennes et lecture de tableaux : les cinq outils qui couvrent l'épreuve de calcul.",
  objectives: [
    "Je calcule un pourcentage, un taux d'évolution et j'enchaîne plusieurs variations",
    "Je résous une situation de proportionnalité par le produit en croix",
    "Je convertis sans erreur les unités de mesure et les durées",
    "Je traite les problèmes de partage et de moyenne, simple ou pondérée",
    "Je lis et j'exploite un tableau ou un graphique statistique",
    "Je dispose d'automatismes de calcul mental pour gagner du temps",
  ],
  lesson: [
    {
      title: "Les pourcentages",
      paragraphs: [
        "Appliquer un pourcentage revient à multiplier par le taux divisé par 100. Ainsi, 18 % de 2 400 se calcule 2 400 × 18 ÷ 100 = 432. Réciproquement, calculer un taux consiste à diviser la partie par le total, puis à multiplier par 100 : 57 admis sur 380 candidats donnent 57 ÷ 380 = 0,15, soit un taux de réussite de 15 %.",
        "Une évolution s'exprime au moyen d'un coefficient multiplicateur, et c'est cette technique qu'il faut adopter systématiquement. Une hausse de t % correspond au coefficient 1 + t/100 ; une baisse de t % au coefficient 1 − t/100. Augmenter de 8 % revient donc à multiplier par 1,08 ; diminuer de 25 % revient à multiplier par 0,75. Cette écriture évite les additions successives, source de la plupart des erreurs.",
        "Pour enchaîner plusieurs variations, il suffit de multiplier les coefficients entre eux. Un article à 250 € augmenté de 8 % passe à 270 €, puis remisé de 10 % revient à 243 €. Le coefficient global vaut 1,08 × 0,90 = 0,972 : la variation d'ensemble est donc une baisse de 2,8 %, et non une hausse de 8 % moins une baisse de 10 %. Retenez le contre-exemple emblématique : une hausse de 20 % suivie d'une baisse de 20 % donne 1,20 × 0,80 = 0,96, soit une perte finale de 4 %.",
        "Pour remonter à la valeur initiale, on divise par le coefficient au lieu de multiplier. Si un prix toutes taxes comprises de 1 440 € intègre une TVA de 20 %, le prix hors taxes vaut 1 440 ÷ 1,20 = 1 200 €. Attention enfin à ne jamais confondre le point de pourcentage et le pourcentage : un taux qui passe de 4 % à 6 % progresse de 2 points, ce qui représente une augmentation de 50 %.",
      ],
      example: [
        "Remise de 30 % sur 90 € : 90 × 0,70 = 63 €.",
        "Hausse de 15 % puis baisse de 15 % sur 200 € : 200 × 1,15 × 0,85 = 195,50 €, soit une perte de 2,25 %.",
        "Prix soldé 96 € après 20 % de remise : prix initial = 96 ÷ 0,80 = 120 €.",
      ],
      tip: "Travaillez toujours avec des coefficients : +12 % donne 1,12, −12 % donne 0,88. Pour enchaîner, multipliez ; pour revenir en arrière, divisez. Ce seul réflexe supprime la quasi-totalité des fautes de pourcentage.",
    },
    {
      title: "Proportionnalité et produit en croix",
      paragraphs: [
        "Deux grandeurs sont proportionnelles lorsque l'on passe de l'une à l'autre en multipliant toujours par le même nombre, appelé coefficient de proportionnalité. Si 5 kg de fournitures coûtent 40 €, le coefficient vaut 8 € par kilogramme, et 12 kg coûteront 96 €.",
        "Le produit en croix est la méthode universelle de résolution. À partir de l'égalité a/b = c/d, on obtient a × d = b × c, ce qui permet de retrouver la valeur manquante, dite quatrième proportionnelle. Disposez toujours les données dans un tableau à deux lignes en veillant à placer les mêmes unités sur la même ligne : l'erreur d'alignement est plus fréquente que l'erreur de calcul.",
        "Les situations les plus courantes aux concours sont les débits de travail, les échelles et les vitesses. Si 5 agents traitent 120 dossiers dans une journée, 8 agents en traiteront 120 × 8 ÷ 5 = 192. Une carte au 1/25 000 signifie que 1 cm sur le papier représente 25 000 cm sur le terrain, soit 250 m ; 4 cm représentent donc 1 km. La vitesse moyenne se calcule en divisant la distance par la durée, exprimée en heures décimales : 150 km parcourus en 1 h 30, c'est-à-dire 1,5 h, correspondent à 100 km/h.",
        "Restez cependant vigilant : toutes les situations ne sont pas proportionnelles. Un abonnement comportant une part fixe et une part variable, l'âge d'une personne ou l'aire d'un carré en fonction de son côté ne relèvent pas de la proportionnalité. Le test est simple : si la valeur zéro d'une grandeur ne correspond pas à la valeur zéro de l'autre, il n'y a pas proportionnalité.",
      ],
      example: [
        "3 imprimantes produisent 450 copies en une heure ; 7 imprimantes en produiront 450 × 7 ÷ 3 = 1 050.",
        "Sur une carte au 1/50 000, 6 cm représentent 6 × 50 000 = 300 000 cm, soit 3 km.",
        "Un trajet de 90 km effectué en 45 min, soit 0,75 h, correspond à 120 km/h.",
      ],
      tip: "Avant tout produit en croix, vérifiez l'homogénéité de votre tableau : mêmes unités sur chaque ligne, mêmes catégories sur chaque colonne. Puis multipliez en diagonale et divisez par la valeur restante.",
    },
    {
      title: "Conversions : unités et durées",
      paragraphs: [
        "Pour les longueurs, chaque échelon du tableau km – hm – dam – m – dm – cm – mm correspond à un facteur 10. Pour les masses, la progression est identique de la tonne au milligramme, avec 1 t = 1 000 kg. Pour les capacités, 1 L = 1 dm³ et 1 mL = 1 cm³.",
        "Les aires et les volumes obéissent à d'autres facteurs, et c'est là que se concentrent les erreurs. Chaque changement d'unité d'aire correspond à un facteur 100 : 1 m² = 10 000 cm², 1 km² = 1 000 000 m². Retenez également que 1 hectare vaut 10 000 m², soit 1 hm², et que 1 km² équivaut à 100 hectares. Pour les volumes, le facteur est 1 000 : 1 m³ = 1 000 dm³ = 1 000 L.",
        "Les durées ne sont pas décimales : elles se comptent en base 60. Une heure vaut 60 minutes et 3 600 secondes. Ainsi 2,5 h correspond à 2 h 30, et non à 2 h 50 ; inversement, 1 h 45 s'écrit 1,75 h en écriture décimale, puisque 45 ÷ 60 = 0,75. La règle de conversion est immuable : pour passer des minutes aux heures décimales, on divise par 60 ; pour l'opération inverse, on multiplie par 60.",
        "Une addition de durées se conduit séparément sur les heures et sur les minutes, puis l'on convertit l'excédent : 3 h 40 + 2 h 35 = 5 h 75 = 6 h 15. Pour calculer un écart entre deux instants, procédez par étapes en passant par l'heure ronde : de 8 h 50 à 17 h 50, il s'écoule 9 h ; de 17 h 15 à 17 h 50, il manque 35 min ; l'écart entre 8 h 50 et 17 h 15 est donc de 8 h 25.",
      ],
      example: [
        "Une parcelle de 3,2 hectares mesure 32 000 m².",
        "Une citerne de 4,5 m³ contient 4 500 litres.",
        "Un service commencé à 21 h 45 et achevé à 6 h 30 le lendemain dure 8 h 45.",
      ],
      tip: "Les trois facteurs à ne jamais confondre : 10 pour les longueurs, 100 pour les aires, 1 000 pour les volumes. Et pour les durées, rappelez-vous qu'une virgule n'est jamais une minute : 3,5 h se lit 3 h 30.",
    },
    {
      title: "Partages et moyennes",
      paragraphs: [
        "Un partage proportionnel se résout en trois temps : additionner les parts, calculer la valeur d'une part, puis multiplier. Répartir 1 800 € proportionnellement à 2, 3 et 4 revient ainsi à considérer 9 parts, chacune valant 200 € ; les trois bénéficiaires reçoivent respectivement 400 €, 600 € et 800 €. Vérifiez toujours que le total obtenu correspond bien à la somme de départ.",
        "Lorsque l'énoncé fournit un écart plutôt qu'un rapport, retirez d'abord cet écart du total, partagez le reste, puis rendez l'écart au bénéficiaire concerné. Si deux personnes se partagent 480 € et que l'une reçoit 60 € de plus que l'autre : (480 − 60) ÷ 2 = 210, d'où 210 € et 270 €. Le contrôle est immédiat : 210 + 270 = 480 et l'écart vaut bien 60.",
        "La moyenne simple est le quotient de la somme des valeurs par leur nombre. La moyenne pondérée tient compte des coefficients : elle vaut la somme des produits valeur × coefficient, divisée par la somme des coefficients. Avec 12 au coefficient 3, 14 au coefficient 2 et 9 au coefficient 1, on obtient (36 + 28 + 9) ÷ 6 = 73 ÷ 6 ≈ 12,17.",
        "Deux pièges reviennent régulièrement. D'abord, la moyenne de deux moyennes n'est pas la moyenne de l'ensemble lorsque les effectifs diffèrent : un groupe de 10 agents ayant obtenu 12 et un groupe de 30 agents ayant obtenu 16 donnent une moyenne globale de (120 + 480) ÷ 40 = 15, et non 14. Ensuite, pour déterminer la note manquante, raisonnez sur les totaux : atteindre 12 de moyenne sur 4 épreuves suppose un total de 48 ; si les trois premières notes valent 11, 13 et 9, soit 33, la quatrième doit être de 15. Notez enfin que la médiane, valeur qui partage la série en deux effectifs égaux, résiste mieux que la moyenne aux valeurs extrêmes.",
      ],
      example: [
        "Partage de 2 100 € proportionnellement à 3 et 4 : 7 parts de 300 €, soit 900 € et 1 200 €.",
        "Notes 8, 15 et 13 : moyenne = 36 ÷ 3 = 12.",
        "Série 2 – 3 – 4 – 5 – 96 : la moyenne vaut 22, la médiane 4. La médiane décrit ici bien mieux la série.",
      ],
      tip: "Pour toute question de moyenne, raisonnez en totaux plutôt qu'en moyennes : total = moyenne × effectif. Cette conversion transforme un problème délicat en simple addition, et elle démasque immédiatement le piège de la moyenne des moyennes.",
    },
    {
      title: "Tableaux, graphiques et calcul mental",
      paragraphs: [
        "Devant un tableau statistique, lisez d'abord le titre, puis les en-têtes de lignes et de colonnes, et surtout les unités. La mention « en milliers » ou « en % » modifie entièrement la lecture : une case affichant 24 dans un tableau exprimé en milliers correspond à 24 000. Repérez ensuite si la dernière ligne ou la dernière colonne constitue un total, ce qui permet de contrôler vos calculs.",
        "Les graphiques se choisissent selon l'information à transmettre. Le diagramme en bâtons compare des catégories, la courbe décrit une évolution dans le temps, le diagramme circulaire représente des parts d'un tout. Dans ce dernier cas, la totalité correspond à 360°, donc 1 % équivaut à 3,6° : un secteur de 90° représente 25 % de l'ensemble. Méfiez-vous des courbes dont l'axe vertical ne part pas de zéro : elles amplifient visuellement des écarts parfois minimes.",
        "Quelques automatismes de calcul mental font gagner un temps décisif. Multiplier par 5 revient à multiplier par 10 puis diviser par 2 : 48 × 5 = 480 ÷ 2 = 240. Multiplier par 25 revient à multiplier par 100 puis diviser par 4 : 36 × 25 = 3 600 ÷ 4 = 900. Multiplier par 9, c'est multiplier par 10 puis retrancher le nombre : 37 × 9 = 370 − 37 = 333. Multiplier par 11, c'est multiplier par 10 puis ajouter le nombre : 43 × 11 = 430 + 43 = 473.",
        "Les pourcentages usuels se décomposent de la même façon : 10 % s'obtient en divisant par 10, 5 % en prenant la moitié de 10 %, 20 % en le doublant, et 15 % en additionnant 10 % et 5 %. Ainsi, 15 % de 240 valent 24 + 12 = 36. Gardez enfin en mémoire les critères de divisibilité — par 2 si le nombre est pair, par 3 ou par 9 si la somme des chiffres l'est, par 4 si les deux derniers chiffres le sont, par 5 s'il se termine par 0 ou 5 — et estimez toujours un ordre de grandeur avant de trancher : dans un questionnaire à choix multiples, il élimine souvent deux propositions sur quatre.",
      ],
      example: [
        "Un secteur de 72° dans un diagramme circulaire représente 72 ÷ 3,6 = 20 % du total.",
        "Calcul mental de 15 % de 320 : 32 + 16 = 48.",
        "Calcul mental de 68 × 25 : 6 800 ÷ 4 = 1 700.",
      ],
      tip: "Avant de poser une opération, demandez-vous si un raccourci existe : ×5, ×25, ×9, ×11 et les pourcentages ronds se traitent de tête. Et terminez toujours par un contrôle d'ordre de grandeur — un résultat dix fois trop grand se repère en une seconde.",
    },
  ],
  exercises: [
    {
      id: "math-1",
      level: 1,
      type: "qcm",
      question: "Combien font 20 % de 350 ?",
      choices: ["35", "70", "7", "170"],
      answer: 1,
      explanation:
        "20 % de 350 se calcule 350 × 20 ÷ 100 = 70. On peut aussi raisonner de tête : 10 % de 350 valent 35, et 20 % en représentent le double, soit 70. La proposition 35 correspond à 10 %, la proposition 7 à 2 % : ces distracteurs sanctionnent une division mal placée.",
      hint: "Calculez d'abord 10 %, puis doublez.",
    },
    {
      id: "math-2",
      level: 1,
      type: "qcm",
      question: "Un article coûte 80 €. Après une remise de 25 %, quel est son prix ?",
      choices: ["55 €", "65 €", "60 €", "20 €"],
      answer: 2,
      explanation:
        "Une baisse de 25 % correspond au coefficient 1 − 0,25 = 0,75. Le prix devient donc 80 × 0,75 = 60 €. On peut aussi retrancher la remise : 25 % de 80 valent 20, et 80 − 20 = 60. La proposition 20 € est le montant de la remise, non le prix final : c'est le piège le plus fréquent de ce type d'énoncé.",
      hint: "Une remise de 25 %, c'est le quart du prix en moins.",
    },
    {
      id: "math-3",
      level: 1,
      type: "input",
      question: "Combien de minutes représentent 2 h 15 ? (nombre seul)",
      answer: "135",
      explanation:
        "Une heure compte 60 minutes : 2 h valent 120 min, auxquelles s'ajoutent 15 min, soit 135 minutes. Ne cédez jamais à la tentation de la lecture décimale : 2 h 15 ne correspond pas à 2,15 h mais à 2,25 h, puisque 15 ÷ 60 = 0,25.",
      hint: "Les durées se comptent en base 60, jamais en base 100.",
    },
    {
      id: "math-4",
      level: 1,
      type: "qcm",
      question: "Sur 200 candidats présents, 50 ont été admis. Quel est le taux de réussite ?",
      choices: ["50 %", "4 %", "20 %", "25 %"],
      answer: 3,
      explanation:
        "Le taux s'obtient en divisant la partie par le total, puis en multipliant par 100 : 50 ÷ 200 = 0,25, soit 25 %. La proposition 4 % résulte de l'inversion du quotient (200 ÷ 50 = 4), erreur classique lorsque l'on calcule dans la précipitation. Vérifiez toujours que le résultat est cohérent : un quart des candidats, c'est bien 25 %.",
      hint: "Divisez la partie par le total, jamais l'inverse.",
    },
    {
      id: "math-5",
      level: 1,
      type: "truefalse",
      question: "Un hectare correspond à 10 000 m².",
      answer: true,
      explanation:
        "Exact : 1 hectare vaut 10 000 m², c'est-à-dire un carré de 100 m de côté, soit 1 hm². Complétez avec les deux repères associés : 1 are vaut 100 m² et 1 km² vaut 100 hectares, donc 1 000 000 m². Rappelez-vous que chaque échelon d'unité d'aire correspond à un facteur 100, et non 10.",
    },
    {
      id: "math-6",
      level: 2,
      type: "qcm",
      question:
        "Cinq agents traitent 120 dossiers en une journée. Combien huit agents en traiteront-ils, au même rythme ?",
      choices: ["192", "160", "200", "150"],
      answer: 0,
      explanation:
        "Chaque agent traite 120 ÷ 5 = 24 dossiers ; huit agents en traitent donc 24 × 8 = 192. Par produit en croix, on écrit directement 120 × 8 ÷ 5 = 192. La proposition 160 correspond à l'ajout naïf de 40 dossiers pour trois agents supplémentaires alors que le rythme unitaire est de 24 : l'estimation à vue est ici trompeuse.",
      hint: "Cherchez d'abord combien de dossiers un seul agent traite.",
    },
    {
      id: "math-7",
      level: 2,
      type: "input",
      question: "Quelle est la moyenne des quatre notes 11, 13, 9 et 15 ? (nombre seul)",
      answer: "12",
      explanation:
        "La somme vaut 11 + 13 + 9 + 15 = 48, et la moyenne 48 ÷ 4 = 12. Adoptez systématiquement le raisonnement par le total, car c'est lui qui permet ensuite de traiter les questions inverses, du type « quelle note obtenir pour atteindre telle moyenne ».",
      hint: "Additionnez les quatre notes avant de diviser.",
    },
    {
      id: "math-8",
      level: 2,
      type: "qcm",
      question: "Le prix d'un article passe de 250 € à 280 €. Quel est le taux d'augmentation ?",
      choices: ["10 %", "30 %", "11,2 %", "12 %"],
      answer: 3,
      explanation:
        "Le taux d'évolution se calcule en rapportant la variation à la valeur de départ : (280 − 250) ÷ 250 = 30 ÷ 250 = 0,12, soit 12 %. La proposition 30 % confond le montant de la hausse avec son taux ; la proposition 11,2 % provient d'une division par la valeur d'arrivée (30 ÷ 280), erreur très fréquente. Le dénominateur est toujours la valeur initiale.",
      hint: "La variation se rapporte toujours au prix de départ.",
    },
    {
      id: "math-9",
      level: 2,
      type: "truefalse",
      question: "Une hausse de 20 % suivie d'une baisse de 20 % ramène un prix à sa valeur de départ.",
      answer: false,
      explanation:
        "Faux. Le coefficient global vaut 1,20 × 0,80 = 0,96 : le prix final est inférieur de 4 % au prix initial. Un article à 100 € passe à 120 €, puis retombe à 96 €. La raison est simple : la baisse s'applique à une base plus élevée que celle sur laquelle la hausse a été calculée. Les taux d'évolution ne s'additionnent jamais, ils se multiplient.",
      hint: "Testez sur 100 € et suivez le calcul étape par étape.",
    },
    {
      id: "math-10",
      level: 2,
      type: "qcm",
      question: "Combien font 3 h 40 + 2 h 35 ?",
      choices: ["5 h 75", "6 h 15", "5 h 15", "6 h 25"],
      answer: 1,
      explanation:
        "On additionne séparément : 3 h + 2 h = 5 h et 40 min + 35 min = 75 min. Comme 75 min valent 1 h 15, le total est de 6 h 15. La proposition « 5 h 75 » n'a aucun sens, puisque les minutes ne dépassent jamais 59 : c'est précisément le distracteur que retiennent les candidats qui oublient la retenue de base 60.",
      hint: "Une durée n'affiche jamais plus de 59 minutes.",
    },
    {
      id: "math-11",
      level: 3,
      type: "qcm",
      question: "Après une remise de 20 %, un article est vendu 96 €. Quel était son prix initial ?",
      choices: ["115,20 €", "116 €", "120 €", "125 €"],
      answer: 2,
      explanation:
        "Le prix soldé correspond au prix initial multiplié par 0,80. Pour remonter, on divise : 96 ÷ 0,80 = 120 €. Contrôle immédiat : 20 % de 120 valent 24, et 120 − 24 = 96. La proposition 115,20 € résulte de l'erreur consistant à ajouter 20 % au prix soldé (96 × 1,20), ce qui ne rend pas le prix d'origine puisque les deux pourcentages ne portent pas sur la même base.",
      hint: "Pour revenir en arrière, on divise par le coefficient au lieu de multiplier.",
    },
    {
      id: "math-12",
      level: 3,
      type: "qcm",
      question:
        "Un groupe de 10 agents obtient une moyenne de 12 ; un groupe de 30 agents obtient une moyenne de 16. Quelle est la moyenne de l'ensemble des 40 agents ?",
      choices: ["13,5", "14", "28", "15"],
      answer: 3,
      explanation:
        "Il faut repasser par les totaux : 10 × 12 = 120 et 30 × 16 = 480, soit 600 points pour 40 agents, d'où une moyenne de 600 ÷ 40 = 15. La proposition 14 correspond à la moyenne des deux moyennes, calcul faux dès lors que les effectifs diffèrent : le second groupe, trois fois plus nombreux, pèse trois fois plus lourd dans le résultat.",
      hint: "Convertissez chaque moyenne en total de points avant de regrouper.",
    },
    {
      id: "math-13",
      level: 3,
      type: "input",
      question:
        "Un candidat a obtenu 11, 13 et 9 aux trois premières épreuves. Quelle note doit-il obtenir à la quatrième pour atteindre une moyenne de 12 ? (nombre seul)",
      answer: "15",
      explanation:
        "Pour atteindre 12 de moyenne sur 4 épreuves, il faut un total de 12 × 4 = 48 points. Les trois premières notes en apportent 11 + 13 + 9 = 33. Il manque donc 48 − 33 = 15 points, c'est-à-dire une note de 15. Le raisonnement par les totaux est la méthode à retenir : toute tentative de compensation « à l'estime » conduit à l'erreur.",
      hint: "Calculez d'abord le total de points nécessaire, puis retranchez les points déjà acquis.",
    },
    {
      id: "math-14",
      level: 3,
      type: "qcm",
      question: "Sur une carte à l'échelle 1/25 000, à quelle distance réelle correspondent 4 cm ?",
      choices: ["1 km", "100 m", "10 km", "250 m"],
      answer: 0,
      explanation:
        "L'échelle 1/25 000 signifie que 1 cm sur la carte représente 25 000 cm sur le terrain, soit 250 m. Quatre centimètres correspondent donc à 4 × 250 = 1 000 m, c'est-à-dire 1 km. Le calcul direct donne 4 × 25 000 = 100 000 cm, que l'on convertit en divisant par 100 pour obtenir des mètres, puis par 1 000 pour obtenir des kilomètres. La proposition 100 m provient d'une conversion arrêtée trop tôt.",
      hint: "Convertissez d'abord 25 000 cm en mètres.",
    },
    {
      id: "math-15",
      level: 3,
      type: "qcm",
      question:
        "Dans un diagramme circulaire, un secteur mesure 90°. Quelle part du total représente-t-il ?",
      choices: ["9 %", "30 %", "36 %", "25 %"],
      answer: 3,
      explanation:
        "Le disque entier représente 360°, soit 100 % : chaque pourcent vaut donc 3,6°. Un secteur de 90° représente 90 ÷ 3,6 = 25 % du total, ce que confirme le raisonnement direct, 90 étant le quart de 360. La proposition 36 % résulte d'une confusion entre les 3,6° du pourcent et le nombre 36 : contrôlez toujours par l'ordre de grandeur, un quart de cercle valant visiblement un quart du total.",
      hint: "Quelle fraction du tour complet représentent 90° ?",
    },
  ],
};
