import csv  
import json  
from collections import defaultdict

f = open('C:\Users\Emmaa\Documents\GitHub\project\dataset1.csv', 'rU')
next(f, None)

h = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: defaultdict(int)))))
# empty = [0,0,0,0,0,0,0,0,0,0]

for line in f:
	line_list = line.split(";")
	if line_list[11] == "bachelor":
	   if line_list[12] != "":
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
           	
           	#for i in range(0, len(empty)): 
            #        empty[i] += int(line_list[12 + i])
            #        
            #    h["2011"]["alle richtingen"] = {"man": empty[0], "vrouw": empty[1]}
            #    h["2012"]["alle richtingen"] = {"man": empty[2], "vrouw": empty[3]}
            #    h["2013"]["alle richtingen"] = {"man": empty[4], "vrouw": empty[5]}
            #    h["2014"]["alle richtingen"] = {"man": empty[6], "vrouw": empty[7]}
            #    h["2015"]["alle richtingen"] = {"man": empty[8], "vrouw": empty[9]}
                    

#           	h[line_list[7]]["profiel"][line_list[6]] += int(line_list[12])
	
# Parse the CSV into JSON  
out = json.dumps(h, sort_keys=True, indent=4, separators=(',', ': ')) 
print "JSON parsed!"  

print h["2011"]["economie"]["B Accountancy en Controlling"][2]


# Save the JSON  
f = open('C:\Users\Emmaa\Documents\GitHub\project\datastudies.json', 'w')  
f.write(out)  
print "JSON saved!"