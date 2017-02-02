#Dag 1

Ik heb een intersante dataset gevonden over studierichtingen en hoeveel jongens/meisjes welke studie en richtingen doen. Het lijkt me interessant om hier een visualisatie over te maken. Maar wat is er nou interessant aan? Voor de hand ligt dat meisjes minder technische studies doen en jongen minder sociale studies. Maar geld dat voor alle studies binnen zo’n richting? Hoe is het over de tijd gegaan? Bij welke studies zijn de verschillen het grootst en bij welke juist het meest gelijk? 
Op basis van deze vragen heb ik een opzet opgesteld, te zien in de file.

#Dag 2
Vandaag heb ik nagedacht over de technische implementatie van mijn visualisatie. Mijn eerste vraag was of ik mijn barchart relatief of absoluut wil weergeven. Voorlopig lijkt absoluut me de beste optie, omdat je dan ook nog kunt zien welke studies het populairst zijn. Ideaal zou zijn als je kon schakelen tussen relatief en absoluut. Dit heeft geen hoge prioriteit. De precieze opzet van mijn design heb ik iets aangepast, te lezen in de technisch design file.
#Dag 3
Vandaag heb ik besteed aan het nadenken hoe ik mijn data in wil laden. Mijn oorspronkelijke plan was om de data direct vanuit een csv bestand in te laden. Vandaag realiseerde ik me echter dat een json bestand voordelen met zich meebrengt omdat je catogorieen dieper kunt nesten. Je kunt dan bijvoorbeeld ook per studie of per universiteit gaan sorteren. Ik heb een grove opzet gemaakt voor het json bestand en begonnen met het maken van dit bestand. De grove opzet van de json is te vinden in het technisch design.
#Dag 4
Het omschrijven naar een json file gaat goed , alleen het optellen van verschillende catogorieen gaan nog lastig. Ik wil bijvoorbeeld data hebben van elke universiteit binnen een studie, maar ook van alle universiteiten opgeteld. Er zijn verschillende opties om dit te doen.
-	In exel: misschien wel makkelijk met optellen, maar lastig om de goede catogorieen te selecteren en bovendien moet ik dan weer nieuw cellen maken om de waarden op te slaan, dat past niet echt in het format. Uiteindelijk lijkt het me niet echt de beste optie
-	In python vanuit het csv bestand de juist waarden er uit filteren en optellen. Lijkt in theorie een goede optie maar is in de praktijk nog lastig.
-	In python vanuit het json bestand met de date die ik nu heb. Misschien is het op deze manier makkelijker om de goede waarden te selecteren.
-	In javascript pas optellen. Misschien wel het makkelijkst maar is natuurlijk niet echt netjes.
Voorlopig wissel ik steeds een beetje van methode omdat het allemaal niet lukt. Morgen zal ik er nog maar een keer hulp bij vragen.

#Dag 5
YES DE DATASET IS COMPLEET. Uiteindelijk is het toch gelukt door vanuit mijn eerder gemaakte json in python de waarden op te tellen. 
#Dag 6
Vandaag ben ik begonnen aan de eerste visualisaties, het loopt alleen nog niet echt lekker. Het moet een grouped bar chart worden maar voorlopig verschijnt er nog helemaal niks op mijn scherm. Data is mogelijk toch niet helemaal niet het goede format.
Uiteindelijk heb ik er voor gekozen om mijn data binnen mijn javascript file nog even te herformatten zodat het gebruikt kan worden voor mijn visualisatie. Ik doe dit in javascript en niet al in mijn json file omdat ik anders een gigantische json in moet laden. Voorlopig lijkt dit me een makkelijkere manier.
#Dag 7
De eerste opzet van mijn barchart is af, nu is het belangrijk om hem interactief te maken zodat hij op verschillende niveau’s kan werken. Dit gaat verbazingwekken goed, alleen heb ik nu een hele wirwar aan functies die niet allemaal evenveel bijdragen. Belangrijk om morgen nog eens goed naar de structuur van mijn functies te kijken.
#Dag 8
Vandaag ook de andere twee visualisaties gemaakt. Er zitten nog wel een paar bugs in. Bijvoorbeeld bij hele kleine studies worden niet weergegeven en d y as schaalt niet goed mee.
#Dag 9
Vandaag heb ik de visualisaties aan elkaar gelinkt, zodat je vanuit de eerste barchart kan besturen op welk niveau je zit. Dit werkt op zich goed, alleen kan je nog niet terug. Ook kun je alleen nog vanuit de eerste visualisatie besturen en nog niet vanuit de jaren en universiteiten grafiek. 
#dag 10
Voor het eerst gepresenteerd want vorige week kwam ik niet aan de beurt. Ik kreeg nuttige feedback, voornamelijk dat de navigatie nog niet echt duidelijk was. De titels zijn ook nog niet goed, dus je snapt nu echt geen bal van waar je nu bent in de data. Ik moet nog even nadenken over hoe ik dit ga verbeteren.
#dag 11
Vandaag heb ik wat geklooit met de opmaak van mijn visualisatie. Bootstrap gedownload en zo de pagina ingedeeld. Bootstrap is zo handig! Ik werd helemaal gestoord van al dat float left gedoe. Mijn visualisatie zie er nu opeens 100 keer zo goed uit.
#dag 12
Tijdens de bestpreking met ons groepje vanochtend heb ik het gehad over mijn navigatieprobleem, en kwamen we tot de conclusie dat het handig zou zijn om knopjes te hebben die laten zien op welk niveau je nu precies bent, met een stukje uitleg erbij. Ik heb hier vandaag aan gewerkt en het gaat verbazend goed. Ik heb hiervoor een template van een tijdlijn gebruikt. Verder was het vooral een heleboel css en html.
#dag 13
Vandaag heb ik gezorgd dat te titels goed meebewegen een tooltips gemaakt voor alle visualisaties. De tooltips doen het nu in principe wel, maar ze zeggen nog aantal studenten:... en eigenlijk wil ik dat verdeeld hebben in aantal jongens en aantal meisjes. Ik weet nog niet precies hoe ik dat ga doen.
#dag 14
Vandaag ben ik begonnen met een zoekfunctie maken, maar dat bleek nog moeilijker dan ik dacht. Uiteindelijk heb ik hier het programmatje 'autocomplete' voor gedownload zodat hij suggesties geeft in de zoekbalk. Op zich werkt het nu, alleen weigert de zoekfunctie ergens anders te staan dan onder aan de pagina en dat echt echt bijzonder irritant.
#dag 15
Vandaag nog een keer gepresenteerd. Ik had een stuk meer te laten zien dan vorige week en ik was ook echt trots om het te laten zien. Ik kreeg nuttige feedback, vooral over de werking van mijn tooltips. Maar volgensmij vond iedereen de navigatie aanzienlijk verbeterd.
#dag 16
Vandaag besteed aan een dropdown voor het selecteren van een universiteit. Dat is een stuk moeilijker dat het selecteren van een jaar, omdat universiteit later in de json staat dan richting en studie, dus krijg je soms dat er geen data is voor een richting of studie. Hierdoor moest ik mijn fetchdata functie weer helemaal aanpassen en dat was vrij lastig. Het werkt nu een beetje, maar nog niet op alle niveau's. Ook heb ik een totaal nieuwe zoekbar gemaakt, want ik werd helemaal gestoord van die oud die steeds niet wil wat ik wil. De niewe zoekfunctie is gebaseerd op select2. 
#Dag 17
Dat met de universiteiten is nu eindelijk gefixt, hoewel het zoekmenu nog niet werkt. Ik heb er uiteindelijk maar voor gekozen om de zoekfunctie helemaal uit te zetten als je binnen één universiteit bent, wel frusterend want ik heb er speciaal een hele json voor gemaakt. Verder nog wat bugs verwijderd. In principe is de hele visualisatie werkend.

#Dag 18
De grote opruimdag! Vandaag heb ik al mijn code nog eens helemaal nagelopen en alles netjes in de goede files gezet. Mijn hele repository was echt een onbeschrijfelijke puinzooi geworden. Dit kostte ontzettend veel tijd en dit ga ik de volgende echt al vanaf het begin netjes houden.

#Dag 19
De laaste dag om aan mijn visualisatie te werken! Vandaag nog wat hele kleine dingetjes gefixt, en mijn visualisatie laten testen door iemand anders. Dat was ontzettend nuttig want er bleken nog net wat kleine bugs in te zitten die heel snel gefixt waren. Voor de rest gewerkt aan mijn verslag

