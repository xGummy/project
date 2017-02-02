# final report
Emma van Proosdij 10663657

#inleiding
Jongens en meisjes kiezen vaak voor verschillende soorten studies. Jongens kiezen bijvoorbeeld vaker voor technische studies, terwijl meisjes meer voor culturele studies kiezen. 
Dit is vrij algemeen, maar hoe zit het nou precies? Welke studies zijn populair bij jongens, en welke bij meisjes?
Deze visualisatie laat zien welke studies, richtingen en universiteiten vooral door jongens en welke door meisjes worden gekozen voor 
WO bachelor studies. 

![](doc/screenshot.jpg)

#Design
In mijn visualisatie zijn drie gelinkte grafieken aanwezig. Voor de uitleg van mijn visualisatie heb ik de verschillende grafieken A, B en C genoemd, zoals weergegeven op het plaatje.
 
 Mijn visualisatie geeft de gegevens weer op drie verschillende niveaus. Op het eerste niveau zullen de verschillen tussen richtingen worden weergegeven, op het tweede niveau de verschillen binnen één richting en op het derde niveau binnen één specifieke studie. Tussen deze niveaus kan genavigeerd worden met behulp van het ‘niveaumenu’ aan de rechterkant. Ik zal bespreken wat er precies te zien is op elk niveau.

Als je op de website komt, ben je automatisch op niveau één. Op de A grafiek zie je een bar-chart van de verschillende studierichtingen en daarbij hoeveel jongens en hoeveel meisjes deze studie doen. Op de B grafiek zie je nog een bar chart, maar dit keer is daarop te zien hoeveel jongens en meisjes er per universiteit zijn. Dit geld binnen alle richtingen. Op de C grafiek zie je een line chart waarop te zien is hoeveel jongens en meisjes er zijn gaan studeren in verschillende jaren. Je kunt naar het volgende niveau gaan door op een richting te klikken in de A chart.

Je bent nu op niveau 2, de verschillen binnen één richting. Op de A grafiek zie je nu een bar chart van de man/vrouw verdelingen van alle studies binnen de door jou geselecteerde richting. Grafiek B en C blijven qua opzet hetzelfde, maar geven nu de data weer binnen de door jou geselecteerde richting. Je kunt naar het volgende niveau gaan door op een studie te klikken in de A grafiek.

Op niveau drie zie je de man/vrouw verdeling binnen de studie die je zojuist hebt geselecteerd. Grafiek A is nu een pie-chart die de man-vrouw verdeling binnen de studie laat zien. Grafiek B en C blijven qua opzet weer hetzelfde, maar geven dit keer de data weer binnen de door jou geselecteerde studie.

Je kunt terug naar een hoger niveau door middel van het niveaumenu. Als je van niveau drie terug gaat naar niveau twee krijg je de richting te zien van de studie die in niveau drie geselecteerd is. De laatst aangeklikte studie en richting worden onthouden. Als je dus al eerder op hogere niveaus bent geweest kun je ook via het niveaumenu naar een hoger niveau. Als je nog niet op een hoger niveau ben geweest krijg je een melding dat je eerst een richting moet selecteren op de A grafiek. 

Bovenaan de website kun je ook nog een jaar selecteren om de data binnen dat jaar te zien. Ook is er een zoekfunctie aanwezig waar je een studie kunt zoeken. Je gaat dan direct naar niveau 3.
Ook kun je een universiteit selecteren. Op deze manier kun je alle data zien binnen één universiteit. In de chart met universiteiten is de geselecteerde universiteit nu helderder te zien. Als je één universiteit hebt geselecteerd is het niet mogelijk om een studie te zoeken. 
Als er binnen een bepaald jaar geen studenten meer zijn in een studie word dit weergegeven op het scherm. Alle grafieken zijn interactief en tonen een tooltip met de waarden als je er overheen gaat met je muis.

Op meer technisch is mijn visualisatie als volgt opgebouwd. In de javascript file ‘collect data.js’ wordt de juiste data verzameld en aangeroepen. Als eerst wordt de functie drawcharts aangeroepen voor alle universiteiten in het jaar 2015 op niveau 1. De functie drawCharts laad de json file in en roept de functies aan om de verschillende charts te tekenen. In deze functies (‘drawYearChart’, ‘drawUniversitiesChart’ en ‘drawMainChart’) wordt gekeken op welk niveau de data weergegeven moet worden en welke variabelen worden weergegeven. Op basis hiervan word de juiste data geladen met de functie FetchData. Deze functie selecteert de juist data en schrijft het om naar het gewenste format. Ik heb er voor gekozen om dit in javascript de doen en niet al in mijn json in te laden omdat ik anders echt een gigantische json file zou moeten inladen om dat je per studie, richting, jaar en universiteit allemaal apart kan bekijken. 

Nadat de juiste data is ingeladen worden de grafieken getekend in ‘chart.js’. Hier staat de code voor het tekenen van de barchart, linechart en piechart. 

In de ‘controls.js’ file worden alle knopjes en dropdown menu’s beheerd. Deze knopjes roepen de functie DrawChart weer aan met de gewenste parameters en zo word de gewenste data geladen. Als je bijvoorbeeld op 2011 klikt wordt de data van data jaar geladen en als je een studie selecteert in het zoekmenu wordt die studie geladen.

#Progress
De eerste uitdaging die ik had was het maken van mijn json file. Omdat mijn data op heel veel verschillende niveau’s weergegeven kan worden vond ik het lastig om een goed format te bedenken. Uiteindelijk heb ik er voor gekozen om het te structureren als [jaar][richting][studie][universiteit][geslacht]. Toen ik dat voor elkaar had kwam het moeilijkste gedeelte: dingen optellen. In mijn visualisatie zijn heel vaak opgetelde waarden te zien, bijvoorbeeld het aantal studenten op een studie van alle universiteiten bij elkaar, en niet alleen binnen één specifieke universiteit. Dit soort optellingen moest ik heel veel doen in mijn data en dat was in het begin erg lastig. Hoe zou ik het aanpakken? Optellen in exel, in python of in javascript? Toen ik uiteindelijk in python de juiste methode had gevonden bleek het eigenlijk vrij eenvoudig. 

Mijn volgende probleem was dat ik nu wel een mooie json file had, maar dat de data totaal anders gestructureerd moest worden voor de bar-chart. Ik probeerde dit eerst te veranderen in mijn json file maar deze werd zo ontzetten groot dat ik er voor heb gekozen om een functie in javascript te maken die de data in het juiste format zet. Deze functie was een hele toestand om te maken en heb ik later nog vaak aan moeten passen. 

Het volgende probleem was om een beetje structuur te houden in mijn javascript. Ik was steeds zo blij als er iets werkte dat ik de structuur een beetje verwaarloosde en er een enorme wirwar van functies was ontstaan waarvan ik zelf amper meer wist wat ze nou deden. Ik heb toen een tijdje elke dag een uur besteed aan ‘javascript opruimen’, wat steeds nog lastiger bleek dan ik dacht. Dit zou ik een volgende keer echt al vanaf het begin beter aanpakken. 

Uiteindelijk werkte mijn visualisatie behoorlijk goed, alleen was het voor de gebruiker totaal niet duidelijk waar in de data je nu bent. Ik moest er echt over nadenken hoe ik dit beter kon maken en heb uiteindelijk gekozen voor het ‘niveaumenu’ aan de rechterkant. Dit was vooral moeilijk om te maken met qua html en css, wat weer heel anders was dan javascript waar ik tot nu toe bezig was.  Ik ben er uiteindelijk erg tevreden over.

Daarna waren er nog een heleboel kleine dingetjes die niet werkten, maar ik had gelukkig genoeg tijd om ze op te lossen. 

#decisions
Mijn grootste veranderingen in mijn design zitten vooral in de navigatie van mijn visualisatie. Het was in eerste instantie de bedoeling om alle grafieken op elkaar te laten reageren. Als je bijvoorbeeld op een jaar in de jaargrafiek klikt zou je de informatie van dat jaar moeten zien, en hetzelfde geld voor de universiteitengrafiek. In de praktijk bleek dit echter nogal rommelig te worden, en raak je al snel een verdwaald in de data. Om een goed overzicht te krijgen van op welk niveau je zit heb ik het niveaumenu gemaakt. Ook heb ik er voor gekozen om de A grafiek echt het centrum van de visualisatie te laten zijn, en dat je vanuit daar de rest aan kan sturen. Op deze manier is het een stuk overzichtelijker.

Als ik nog meer tijd had zou ik als eerste mijn zoekfunctie aanpassen zodat je ook een studie kan zoeken als je één universiteit geselecteerd hebt. Dat is nu niet mogelijk omdat de zoekfunctie alle studies weergeeft, en niet alle studies op alle universiteiten zijn, dus krijg je niet kloppende data als je dat uitzet. Ik heb nu de hele zoekbalk gedeactiveerd als je in één universiteit bent, maar dat zou ik aanpassen als ik meer tijd heb. Ook zou ik willen dat je kan kiezen of je de barcharts relatief of absoluut wilt zien. Momenteel zie je alleen de absolute waarden, wat interessant is omdat je dan gelijk zien welke studie in het algemeen populair zijn, maar bij relatieve waarden kun je de verhouding jongens/meisjes beter vergelijken. Ook zou je dan kunnen sorteren op hoeveelheid jongens en meisjes en in één oogopslag kunnen zien welke studies de meeste jongens en welke de meeste meisjes hebben.  
