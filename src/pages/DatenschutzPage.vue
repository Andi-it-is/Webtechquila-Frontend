<template lang="pug">

div(class="datenschutz-container")
  
  h3 Datenschutzerklärung
  pre :)
  //- p Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten (nachfolgend kurz „Daten") im Rahmen der Bereitstellung unseres Onlineangebotes auf. Im Hinblick auf die verwendeten Begrifflichkeiten, wie z. B. „Verarbeitung" oder „Verantwortlicher", verweisen wir auf die Definitionen im Art. 4 der Datenschutzgrundverordnung (DSGVO).
  
  //- h4 1. Verantwortlicher
  //- p Softwareentwicklung Lukas Weihrauch<br>inh. Lukas Weihrauch<br>c/o Postflex ##9347<br>Emsdettener Str. 10<br>48268 Greven<br>Keine Pakete oder Päckchen - Annahme wird verweigert!<br>E-Mail: mail@lukasweihrauch.de

  //- h4 2. Hosting
  //- p Unsere Website wird bei der netcup GmbH, Daimlerstraße 25, 76185 Karlsruhe, gehostet.
  //- p Mit dem Hostinganbieter wurde ein Auftragsverarbeitungsvertrag (AV-Vertrag) gemäß Art. 28 DSGVO abgeschlossen.
  //- ul
  //-   li Browsertyp und Browserversion
  //-   li Verwendetes Betriebssystem
  //-   li Referrer URL
  //-   li Hostname des zugreifenden Rechners
  //-   li Uhrzeit der Serveranfrage
  //-   li IP-Adresse (gekürzt/anonymisiert)
  //- p Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur Wahrung unseres berechtigten Interesses an einem sicheren und stabilen Betrieb dieser Website.

  //- h4 3. Cookies
  //- p Diese Website verwendet keine Cookies.
  //- //- p Diese Website verwendet den Localstorage des Browsers um die User Präferenzen "Sprache" und "Farbdarstellung" zu speichern.

  //- h4 4. Besucheranalyse mit Counter.dev
  //- p Zur rein statistischen Erfassung der Seitenaufrufe nutzen wir den datenschutzfreundlichen Webanalysedienst Counter.dev. Dieser Dienst erhebt ausschließlich anonymisierte Daten, ohne Cookies zu setzen oder personenbezogene Informationen zu speichern. Die IP-Adresse wird nicht gespeichert.
  //- p Weitere Informationen finden Sie in der Datenschutzerklärung von Counter.dev:

  //- h4 5. Ihre Rechte
  //- p Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:
  //- ul
  //-   li Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO) 
  //-   li Berichtigung unrichtiger Daten (Art. 16 DSGVO)
  //-   li Löschung Ihrer Daten (Art. 17 DSGVO)
  //-   li Einschränkung der Verarbeitung (Art. 18 DSGVO)
  //-   li Datenübertragbarkeit (Art. 20 DSGVO)
  //-   li Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)
  //- p Zur Ausübung Ihrer Rechte können Sie sich jederzeit an uns wenden: kontakt@lukasweihrauch.de

  //- h4 6. Beschwerderecht
  //- p Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen das Datenschutzrecht verstößt, haben Sie gemäß Art. 77 DSGVO das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.

  //- h4 7. Änderungen dieser Datenschutzerklärung
  //- p Wir behalten uns vor, diese Datenschutzerklärung bei Änderungen der Rechtslage oder unseres Angebots entsprechend anzupassen. Die jeweils aktuelle Version finden Sie stets auf dieser Seite.
    
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';

onMounted(() => {

  
})
</script>

<style scoped>
h3 {
  font-weight: 700;
  font-size: 2rem;
  line-height: 2rem;
  letter-spacing: normal;
}
h4 {
  font-weight: 700;
  font-size: 1.55rem;
  line-height: 1.5rem;
  letter-spacing: normal;
}
p {
  font-size: 16px;
}
.datenschutz-container{
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: auto;
  padding: 1rem;
}
.a11y:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 0.5rem;
  border-radius: 0.5rem;
}
</style>
