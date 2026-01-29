import requests
from spellchecker import SpellChecker

spell = SpellChecker(language='fr')

def corriger_texte(texte):
    url = "http://localhost:8081/v2/check"
    try:
        # 1. Appel à LanguageTool (Grammaire et Accords)
        response = requests.post(url, data={'text': texte, 'language': 'fr'})
        matches = response.json().get('matches', [])
        
        # Application des corrections de la fin vers le début pour garder les index intacts
        texte_liste = list(texte)
        for match in sorted(matches, key=lambda x: x['offset'], reverse=True):
            if match['replacements']:
                start = match['offset']
                end = start + match['length']
                remplacement = match['replacements'][0]['value']
                texte_liste[start:end] = list(remplacement)
        
        texte_corrige = "".join(texte_liste)

        # 2. Passage final Pyspellchecker (Orthographe pure)
        mots = texte_corrige.split()
        final = []
        for m in mots:
            clean = m.strip(".,!?;:")
            if clean and not spell.known([clean.lower()]):
                sug = spell.correction(clean)
                final.append(sug if sug else m)
            else:
                final.append(m)
        return " ".join(final)

    except Exception as e:
        return f"Erreur : Vérifie que le serveur Java tourne ! ({e})"

if __name__ == "__main__":
    phrase = "Les pomme que j'ai manger sont tès bonnes."
    print(f"Original : {phrase}")
    print(f"Corrigé  : {corriger_texte(phrase)}")