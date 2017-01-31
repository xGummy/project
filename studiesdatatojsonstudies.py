# -*- coding: utf-8 -*-
#Emma van Proosdij
#10663657
import json
import csv


richtingen = []
studies = []  
universiteiten = []

with open('C:\Users\Emmaa\Documents\GitHub\project\dataset1.csv') as f:
    reader = csv.reader(f, delimiter=';')
    next(reader, None)
    for row in reader:    
        if row[6] not in richtingen:
            richtingen.append(row[6])
        if row[11] == "bachelor":
            if row[9] not in studies:
                studies.append({"text":row[9][2:], "id":row[6]})
        if row[5] not in universiteiten:
            universiteiten.append(row[5])


print studies
data = json.dumps(studies, sort_keys=True) 
f = open('C:\Users\Emmaa\Documents\GitHub\project\datastudies_values.json', 'w')  
f.write(data)  
print "JSON saved!"


#universiteiten = ["Radboud Universiteit Nijmegen", "Wageningen University", "Rijksuniversiteit Groningen", "Universiteit Maastricht", "Technische Universiteit Eindhoven", "Tilburg University", "Universiteit van Amsterdam", "Vrije Universiteit Amsterdam", "Universiteit Twente", "Universiteit Utrecht", "Technische Universiteit Delft", "Universiteit Leiden", "Erasmus Universiteit Rotterdam"]
# 
#
#data["gen"] = {"2011": {"all": {"male": empty[0], "female": empty[1]}},"2012": {"all": {"male": empty[2], "female": empty[3]}}, "2013": {"all": {"male": empty[4], "female": empty[5]}} }
#print data
            
        
        #for country in country_codes:
        #    if row[0] == country[2]:
        #        code = country[1]
        #data[code] = {"total": total, "fillKey":fill, "piedata": [{"label":"Biomass and Waste", "number":makefloat(row[3])}, {"label": "Coal", "number":makefloat(row[4])}, {"label": "Gas", "number": makefloat(row[5])}, {"label":"Geothermal", "number": makefloat(row[6])}, {"label": "Hydroelectric", "number": makefloat(row[7])}, {"label":"Nuclear", "number": makefloat(row[8])}, {"label": "oil" ,"number":makefloat(row[9])}, {"label":"Solar Tide Wave", "number": makefloat(row[10])}]}


#with open('C:\Users\Emmaa\Documents\GitHub\DataProcessing\homework\week 7\energy2010.json', 'w') as outfile:
#    json.dump(data, outfile, sort_keys=True)                                        
    




