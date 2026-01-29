import customtkinter as ctk
import requests

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")

class CorrecteurApp(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("TALN - Correction Automatique (Offline)")
        self.geometry("700x500")

        # Label Titre
        self.label = ctk.CTkLabel(self, text="Correcteur Orthographique & Grammatical", font=("Arial", 20, "bold"))
        self.label.pack(pady=20)

        # Zone d'entrée
        self.input_area = ctk.CTkTextbox(self, width=600, height=150)
        self.input_area.pack(pady=10)
        self.input_area.insert("0.0", "Tapez votre texte ici...")

        # Bouton
        self.btn = ctk.CTkButton(self, text="CORRIGER", command=self.process)
        self.btn.pack(pady=20)

        # Zone de sortie
        self.output_area = ctk.CTkTextbox(self, width=600, height=150, fg_color="#2b2b2b")
        self.output_area.pack(pady=10)

    def process(self):
        txt = self.input_area.get("0.0", "end").strip()
        # On appelle le serveur local (assure-toi que Java tourne !)
        try:
            r = requests.post("http://localhost:8081/v2/check", data={'text': txt, 'language': 'fr'})
            matches = r.json().get('matches', [])
            
            res_list = list(txt)
            for m in sorted(matches, key=lambda x: x['offset'], reverse=True):
                if m['replacements']:
                    res_list[m['offset']:m['offset']+m['length']] = list(m['replacements'][0]['value'])
            
            self.output_area.delete("0.0", "end")
            self.output_area.insert("0.0", "".join(res_list))
        except:
            self.output_area.insert("0.0", "ERREUR : Le serveur Java n'est pas lancé !")

if __name__ == "__main__":
    app = CorrecteurApp()
    app.mainloop()

#cd "/run/media/manohisitraka/cool/Manou/M2/Dr Liva/TALN/LanguageTool-6.6"

# On utilise le chemin relatif vers le nouveau Java 17
#../jdk-17.0.10+7/bin/java -Xmx512m -cp languagetool-server.jar org.languagetool.server.HTTPServer --port 8081 --allow-origin