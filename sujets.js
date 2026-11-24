// Énoncés côté candidat uniquement : ce fichier est public, il ne contient ni indice ni corrigé.
const SUJETS = [
{
  groupe: '1er tour', titre: 'Fenêtre glissante',
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
