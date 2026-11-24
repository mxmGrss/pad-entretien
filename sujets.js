// Énoncés côté candidat uniquement : ce fichier est public, il ne contient ni indice ni corrigé.
const SUJETS = [
{
  groupe: '1er tour', titre: 'Fenêtre glissante',
  suites: ["Renvoie aussi la position de la meilleure fenêtre (indices de début et de fin).", "Les valeurs arrivent maintenant une par une, en flux, et on ne peut pas tout stocker.\nÉcris une classe avec push(x) qui renvoie la somme de la fenêtre courante\n(ou None tant que la fenêtre n'est pas pleine).", "Le flux tourne pendant des heures, avec des flottants. Y a-t-il un problème ?", "Nouvelle question : trouve la plus petite fenêtre dont la somme dépasse un seuil S.\nEst-ce que les valeurs négatives changent quelque chose ?"],
  notes: `EXERCICE : FENÊTRE GLISSANTE

On reçoit un flux de mesures de capteur, sous forme d'une liste de nombres.
Écris max_window_sums(values, k) qui renvoie, pour chaque position, la somme
des k valeurs consécutives qui se terminent à cette position, puis la plus
grande de ces sommes.

  max_window_sums([1, 3, 2, 6, -1, 4, 1, 8, 2], 3)
  sommes des fenêtres : [6, 11, 7, 9, 4, 13, 11]
  max = 13  (4 + 1 + 8)

L'énoncé est volontairement flou : format du retour, liste plus courte que k...
à clarifier avec l'intervieweur.

1. Questions de clarification
2. Solution naïve + complexité, puis plus rapide
3. Code à voix haute, test à la main, complexités`,
  code: `def max_window_sums(values, k):
    pass


print(max_window_sums([1, 3, 2, 6, -1, 4, 1, 8, 2], 3))
`,
},
{
  groupe: '1er tour', titre: 'Agrégateur de détections',
  suites: ["On ignore les détections de confiance inférieure à 0.5.\nPour chaque capteur, je veux le label qu'il voit le plus souvent.", "Un même drone est vu par plusieurs capteurs en même temps, et on le compte plusieurs fois.\nDeux détections du même label à moins de 2 secondes d'écart forment un seul événement.\nCompte les événements par label.", "Les détections arrivent maintenant en flux.\nÉcris une classe avec add(det) et top_k(k), qui renvoie les k labels les plus fréquents\nsur les 60 dernières secondes."],
  notes: `EXERCICE : AGRÉGATEUR DE DÉTECTIONS

Des capteurs (caméras, radars) envoient des détections :
  {"t": 12.4, "sensor": "cam_3", "label": "drone", "conf": 0.87}

t : temps en secondes, sensor : capteur, label : classe, conf : confiance.

Écris une fonction qui, à partir d'une liste de détections, indique combien
de fois on a vu chaque type d'objet.

L'énoncé est volontairement incomplet. L'intervieweur ajoutera des
contraintes en plusieurs étapes. À chaque nouvelle contrainte, explique ce
qu'il faut changer avant de modifier le code.`,
  code: `dets = [
    {"t": 0.0, "sensor": "cam_1",   "label": "drone", "conf": 0.90},
    {"t": 0.5, "sensor": "radar_1", "label": "drone", "conf": 0.80},
    {"t": 1.0, "sensor": "cam_2",   "label": "bird",  "conf": 0.40},
    {"t": 1.2, "sensor": "cam_2",   "label": "drone", "conf": 0.70},
    {"t": 3.0, "sensor": "cam_1",   "label": "bird",  "conf": 0.60},
    {"t": 3.1, "sensor": "cam_1",   "label": "drone", "conf": 0.95},
    {"t": 4.0, "sensor": "radar_1", "label": "drone", "conf": 0.30},
    {"t": 9.0, "sensor": "cam_2",   "label": "bird",  "conf": 0.85},
]


def count_labels(dets):
    pass


print(count_labels(dets))
`,
},
{
  groupe: '1er tour', titre: 'Débogage (3 snippets)',
  notes: `EXERCICE : DÉBOGAGE

Chaque fonction ci-contre contient au moins un bug. Pour chacune :
1. Lis le code à voix haute et dis ce qu'il est censé faire.
2. Explique le symptôme, ligne par ligne.
3. Propose une correction et dis comment tu la vérifies.

Tu peux exécuter, ajouter des print, écrire un petit test.
Explique ce que tu cherches avant de le faire.

Snippet 1 : renvoie les labels dont la confiance atteint le seuil.
  Symptôme : « résultats bizarres, et au deuxième appel c'est pire ».
Snippet 2 : compte les détections par label. Symptôme : il plante.
Snippet 3 : retire les détections sous le seuil.
  Symptôme : une détection à 0.2 reste dans le résultat.`,
  code: `dets = [
    {"label": "drone", "conf": 0.9},
    {"label": "bird",  "conf": 0.3},
    {"label": "bird",  "conf": 0.2},
    {"label": "drone", "conf": 0.5},
]


# Snippet 1
def high_conf(dets, threshold=0.5, out=[]):
    for i in range(1, len(dets)):
        if dets[i]["conf"] > threshold:
            out.append(dets[i]["label"])
    return out


# Snippet 2
def count_by_label(dets):
    counts = {}
    for d in dets:
        counts[d["label"]] += 1
    return counts


# Snippet 3
def remove_low_conf(dets, threshold):
    for d in dets:
        if d["conf"] < threshold:
            dets.remove(d)
    return dets


print(high_conf(dets))
print(high_conf(dets))
print(remove_low_conf(list(dets), 0.5))
print(count_by_label(dets))
`,
},
{
  groupe: '1er tour', titre: 'Softmax et entropie croisée',
  suites: ["Essaie softmax([1000, 1001, 1002]).", "Calcule cross_entropy([1000, 0], 1).", "Pour entraîner le modèle, j'ai besoin de la dérivée de la perte par rapport aux logits.\nQue vaut-elle ? Comment vérifier ton code ?"],
  notes: `EXERCICE : SOFTMAX ET ENTROPIE CROISÉE

Un classifieur produit un vecteur de scores bruts (logits), un par classe.
Écris :
1. softmax(logits) : transforme les logits en probabilités.
2. cross_entropy(logits, target) : perte d'entropie croisée pour l'indice
   de la vraie classe target.

  softmax([2.0, 1.0, 0.1])          -> environ [0.659, 0.242, 0.099]
  cross_entropy([2.0, 1.0, 0.1], 0) -> environ 0.417

Python pur (module math). L'intervieweur ajoutera des contraintes.

1. Clarifications
2. Formule mathématique avant le code
3. Code, vérification par des propriétés de la sortie, complexité`,
  code: `import math


def softmax(logits):
    pass


def cross_entropy(logits, target):
    pass


print(softmax([2.0, 1.0, 0.1]))
print(cross_entropy([2.0, 1.0, 0.1], 0))
`,
},
{
  groupe: 'Live coding', titre: 'A. Doublons de détection (NMS)',
  suites: ["L'algorithme : on trie les boîtes par score décroissant. On prend la meilleure et on la garde.\nToutes les boîtes restantes qui la recouvrent avec un IoU supérieur à un seuil sont considérées\ncomme des doublons et supprimées. On recommence avec la meilleure boîte restante, jusqu'à ce\nqu'il n'en reste plus.\n\nReformule-le avec tes mots, puis implémente nms(boxes, scores, iou_thr).", "Les boîtes ont maintenant une classe (drone, oiseau...).\nUn drone et un oiseau superposés ne doivent pas se supprimer.", "Une image contient 10 000 boîtes. Mesure le temps, puis accélère.", "Deux objets réels se recouvrent beaucoup (une foule, un essaim).\nQue fait ton algorithme ? Que proposes-tu ?"],
  notes: `EXERCICE A : DOUBLONS DE DÉTECTION

Un détecteur d'objets renvoie, pour une image, des boîtes (x1, y1, x2, y2)
et un score de confiance par boîte. Il renvoie souvent plusieurs boîtes
presque superposées pour un même objet.

L'intervieweur va expliquer un algorithme pour ne garder qu'une boîte par
objet. Reformule-le, puis implémente-le.

Première étape : écrire iou(a, b), qui mesure le recouvrement entre deux
boîtes.

Avant de coder : plusieurs approches, leurs compromis (temps, mémoire,
lisibilité), et pourquoi tes structures de données conviennent.
Après : relis ton code comme en revue.`,
  code: `boxes = [(10, 10, 50, 50), (12, 12, 52, 52), (100, 100, 140, 140),
         (11, 9, 49, 51), (102, 98, 141, 139), (200, 200, 210, 210)]
scores = [0.90, 0.75, 0.80, 0.60, 0.85, 0.30]


def iou(a, b):
    pass


print(iou((0, 0, 2, 2), (1, 1, 3, 3)))
`,
},
{
  groupe: 'Live coding', titre: 'B. Cache',
  suites: ["La mémoire est limitée : le cache garde au plus N entrées.\nQuand il est plein, on retire celle qui a été utilisée le moins récemment.\nÉcris une classe avec get(key) et put(key, value), toutes deux en O(1).", "Imagine que OrderedDict n'existe pas.", "Chaque entrée expire après T secondes.\nEt si plusieurs threads utilisent le cache en même temps ?"],
  notes: `EXERCICE B : CACHE

Un service appelle souvent une fonction coûteuse (par exemple une inférence
de modèle) avec les mêmes arguments.

Première étape : éviter de recalculer un résultat déjà obtenu.
Montre-le sur fib(80), trop lent tel quel.

L'intervieweur ajoutera des contraintes de mémoire et de temps.

Avant de coder : plusieurs approches, leurs compromis, et pourquoi tes
structures de données conviennent. Après : relis ton code comme en revue.`,
  code: `def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)


print(fib(25))
# print(fib(80))   # trop lent tel quel
`,
},
{
  groupe: 'Live coding', titre: 'C. Suivi de cibles',
  suites: ["Le principe : chaque objet suivi s'appelle une piste ; elle a une dernière position connue.\nÀ chaque trame, on associe chaque détection à au plus une piste, et chaque piste à au plus\nune détection. On n'associe une détection à une piste que si elle est à moins d'une distance\nmaximale, appelée porte. On commence par les couples les plus proches. Ce qui reste sans\npartenaire est signalé : les détections libres deviendront de nouvelles pistes.\n\nReformule-le avec tes mots, puis implémente associate(tracks, detections, gate).", "Écris un Tracker avec une méthode step(detections).\nChaque piste a un identifiant stable. Une piste sans détection pendant plus de max_missed\ntrames consécutives est supprimée.", "5 000 pistes et 5 000 détections par trame, à 20 trames par seconde. Ça tient ?", "Les objets bougent vite et sortent de la porte d'une trame à l'autre. Que proposes-tu ?"],
  notes: `EXERCICE C : SUIVI DE CIBLES

À chaque trame, un radar renvoie une liste de positions (x, y) détectées.
On veut suivre les objets dans le temps : savoir que la détection (1, 0) à
l'instant t+1 est le même objet que (0, 0) à l'instant t.

L'intervieweur va expliquer le principe d'association et de « porte »
(gating). Reformule-le, puis implémente-le.

Avant de coder : plusieurs approches, leurs compromis, et pourquoi tes
structures de données conviennent. Après : relis ton code comme en revue.`,
  code: `tracks = [(0, 0), (10, 0), (20, 20)]                  # positions connues
detections = [(1, 0), (9, 1), (30, 30), (0.5, 0.5)]   # nouvelle trame


def associate(tracks, detections, gate):
    pass


print(associate(tracks, detections, gate=3))
`,
},
{
  groupe: 'AI Design', titre: 'Détection de drones',
  suites: ["Contrainte : tout le calcul doit tenir sur une carte embarquée de 10 W.", "Contrainte : on n'a que 200 vidéos de drones étiquetées.", "Contrainte : l'opérateur doit comprendre pourquoi une alerte a été levée.", "Un nouveau modèle de drone apparaît, absent des données d'entraînement."],
  notes: `AI DESIGN : DÉTECTION DE DRONES

Un site militaire veut être alerté quand un petit drone approche. On dispose
de caméras fixes et de micros. Conçois le système.

Utilise ce panneau comme tableau : écris ton découpage pendant que tu parles.

À couvrir : ce qu'optimise le système et comment on le mesure, les données
disponibles, le découpage (entrées, sorties, parties apprises ou
déterministes), l'évaluation, l'exploitation.

L'intervieweur ajoutera des contraintes en cours de route.

--- Découpage ---
`,
  code: '',
},
{
  groupe: 'AI Design', titre: 'Tri de rapports',
  suites: ["Contrainte : les rapports arrivent en quatre langues.", "Une des sources envoie volontairement de fausses informations.", "Il faut pouvoir justifier devant un auditeur pourquoi un rapport a été écarté."],
  notes: `AI DESIGN : TRI DE RAPPORTS

Des analystes reçoivent chaque jour 5 000 rapports textuels de sources
variées. Ils n'en lisent que 200. Conçois un système qui les aide à choisir
lesquels lire.

Utilise ce panneau comme tableau : écris ton découpage pendant que tu parles.

L'intervieweur ajoutera des contraintes en cours de route.

--- Découpage ---
`,
  code: '',
},
{
  groupe: 'AI Design', titre: 'Maintenance prédictive',
  suites: ["L'historique ne contient que 12 pannes.", "Les véhicules viennent de trois séries différentes, avec des capteurs différents.", "Une immobilisation inutile coûte 5 000 €. Une panne en mission coûte bien plus. Qu'est-ce que ça change ?"],
  notes: `AI DESIGN : MAINTENANCE PRÉDICTIVE

On a 300 véhicules équipés de capteurs (vibrations, températures, pression).
On veut anticiper les pannes. Conçois le système.

Utilise ce panneau comme tableau : écris ton découpage pendant que tu parles.

L'intervieweur ajoutera des contraintes en cours de route.

--- Découpage ---
`,
  code: '',
},
];
