import csv  
import json  
from collections import defaultdict


f = open('C:\Users\Emmaa\Documents\GitHub\project\dataset1.csv', 'rU')
next(f, None)

h = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: defaultdict(int)))))
jaren = ["2011", "2012", "2013", "2014", "2015"]
 
 
# build the stucture for the jsonfile with defaultdict
for line in f:
    line_list = line.split(";")
    if line_list[11] == "master":
	   if line_list[12] != "":
	        line_list[9] = line_list[9][2:]
           	h["2011"][line_list[6]][line_list[9]][line_list[5]]["man"] += int(line_list[12])
           	h["2011"][line_list[6]][line_list[9]][line_list[5]]["vrouw"] += int(line_list[13])
           	h["2012"][line_list[6]][line_list[9]][line_list[5]]["man"] += int(line_list[14])
           	h["2012"][line_list[6]][line_list[9]][line_list[5]]["vrouw"] += int(line_list[15])
           	h["2013"][line_list[6]][line_list[9]][line_list[5]]["man"] += int(line_list[16])
           	h["2013"][line_list[6]][line_list[9]][line_list[5]]["vrouw"] += int(line_list[17])
           	h["2014"][line_list[6]][line_list[9]][line_list[5]]["man"] += int(line_list[18])
           	h["2014"][line_list[6]][line_list[9]][line_list[5]]["vrouw"] += int(line_list[19])
           	h["2015"][line_list[6]][line_list[9]][line_list[5]]["man"] += int(line_list[20])
           	h["2015"][line_list[6]][line_list[9]][line_list[5]]["vrouw"] += int(line_list[21])
           	
	

#add all totals
for jaar in h.keys():
    for richting in h[jaar].keys():
        for studie in h[jaar][richting].keys():
            for universiteit in h[jaar][richting][studie].keys():
                h[jaar][richting][studie]["totaal"]["man"] += h[jaar][richting][studie][universiteit]["man"]
                h[jaar][richting][studie]["totaal"]["vrouw"] += h[jaar][richting][studie][universiteit]["vrouw"]
                h[jaar][richting]["totaal"][universiteit]["man"] += h[jaar][richting][studie][universiteit]["man"]
                h[jaar][richting]["totaal"][universiteit]["vrouw"] += h[jaar][richting][studie][universiteit]["vrouw"]
                h[jaar][richting]["totaal"]["totaal"]["man"] += h[jaar][richting][studie][universiteit]["man"]
                h[jaar][richting]["totaal"]["totaal"]["vrouw"] += h[jaar][richting][studie][universiteit]["vrouw"]
                h[jaar]["totaal"]["totaal"][universiteit]["vrouw"] += h[jaar][richting][studie][universiteit]["vrouw"]
                h[jaar]["totaal"]["totaal"][universiteit]["man"] += h[jaar][richting][studie][universiteit]["man"]
                h[jaar]["totaal"]["totaal"]["totaal"]["vrouw"] += h[jaar][richting][studie][universiteit]["vrouw"]
                h[jaar]["totaal"]["totaal"]["totaal"]["man"] += h[jaar][richting][studie][universiteit]["man"]

# Parse the CSV into JSON  
out = json.dumps(h, sort_keys=True) 
print out
print "JSON parsed!"  

# Save the JSON  
f = open('C:\Users\Emmaa\Documents\GitHub\project\datastudies_master.json', 'w')  
f.write(out)  
print "JSON saved!"