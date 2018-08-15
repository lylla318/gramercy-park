#!/usr/bin/env python

import re
import json
import io
import csv
import sys
from pprint import pprint
from collections import defaultdict
import mysql.connector
import numpy as np
from pathlib import Path





class Parser:

  def __init__(self, password, table, year, csv_read):

    self.password = password
    self.table = table
    self.year = year
    self.csv_read = csv_read

    self.tax_rates = {"19": {"tc1":0.21861, "tc234":0.12690}, 
                      "18": {"tc1":0.20385, "tc234":0.12719},
                      "17": {"tc1":0.19991, "tc234":0.12892}, 
                      "16": {"tc1":0.19554, "tc234":0.12883},
                      "15": {"tc1":0.19157, "tc234":0.12855}, 
                      "14": {"tc1":0.19191, "tc234":0.13145},
                      "13": {"tc1":0.18569, "tc234":0.13181}, 
                      "12": {"tc1":0.18205, "tc234":0.13433},
                      "11": {"tc1":0.17364, "tc234":0.13353}, 
                      "10": {"tc1":0.17088, "tc234":0.13241},
                      "09": {"tc1":0.16196, "tc234":0.12596}
                      }

    self.adjusted_premiums = {"19":292000,"18":292000,"17":292000,"16":287568,"15":284728,"14":284376,"13":278602,"12":273799,"11":269317,"10":260062,"09":257351}

    self.query_by_bble()
    
  


  def query_by_bble(self):

    # print("Executing queries...")

    OUTPUT = []

    cnx = mysql.connector.connect(user='root', password=self.password,
                                  host='127.0.0.1',
                                  database='dof_tax_roll_archives')

    cursor = cnx.cursor()

    bbles = []
    reader = csv.reader(open(self.csv_read, 'rU'), delimiter=",", dialect=csv.excel_tab)
    for row in reader:
      # print(row)
      bbles.append(row[0])

    query_table = self.table + "_" + self.year
    mk_sqs = []
    tx_sqs = []
    tx_diffs = []

    for bble in bbles: 
      query = "select `BORO`, `BLOCK`, `LOT`, `BBLE`, `TXCL`, `HNUM_LO`, `HNUM_HI`,`STR_NAME`, `GR_SQFT`, `NEW_FV_T`, `FN_AVT`, `RES_UNIT` from " + query_table + " as roll where roll.`BBLE` = " + bble 
      cursor.execute(query)

      result_set = cursor.fetchall()
      #print("here")

      for data in result_set:

        try:
          gr_sq = float(data[8])
          if(data[3] == "1008771082"):
            gr_sq = 1881.0

          mk_sq = data[9] / gr_sq
          tx_sq = data[10] / gr_sq * self.tax_rates[self.year][self.table]
          
          tax_bill = data[10]*self.tax_rates[self.year][self.table]
          mk_plus_prem = data[9] + self.adjusted_premiums[self.year]
          avt_ratio = data[10] / float(data[9])
          new_fv_avt = mk_plus_prem * avt_ratio
          adjusted_tax_bill = new_fv_avt*self.tax_rates[self.year][self.table]
          tax_differece = adjusted_tax_bill - tax_bill

          mk_sqs.append(mk_sq)
          tx_sqs.append(tx_sq)
          tx_diffs.append(tax_differece)

          print(data)

        except ZeroDivisionError:
          print(data)
          print("Attempt to divide by 0.")

        OUTPUT.append(data)

    self.avg_mk_per_sq = np.mean(mk_sqs)
    #print("MKS: ", mk_sqs)
    #print("MEAN AVG MK SQ: ", self.avg_mk_per_sq)
    self.avg_tx_per_sq = np.mean(tx_sqs)
    #print("TX SQS: ", tx_sqs)
    #print("MEAN TX SQ", self.avg_tx_per_sq)
    self.total_tax_dif = np.sum(tx_diffs)

    cursor.close()
    cnx.close()

    return OUTPUT



if __name__ == '__main__':

  password = "lylla318"
  maingroups = ["original-adjacents"]
  years = ["09","10","11","12","13","14","15","16","17","18","19"]
  #years = ["14", "15", "16", "17"]
  #subgroups = ["class-1", "condos", "coops", "rentals"]
  subgroups = ["condos"]
  csv_read = ""
  table = ""

  for maingroup in maingroups:
    print("Generating output for " + maingroup + "...")
    for year in years:
      print("************ year: " + year)
      for subgroup in subgroups:
        print("************************ subgroup: " + subgroup)
        csv_read = "input-data/" + maingroup + "/" + subgroup + ".csv"
        if(subgroup == "class-1"):
          table = "tc1" 
        else:
          table = "tc234" 
        
        p = Parser(password, table, year, csv_read);

        print([year, float("{0:.2f}".format(p.avg_mk_per_sq)), float("{0:.2f}".format(p.avg_tx_per_sq)) ])

        output_file = "origin-adjacent-condos-fff.csv"
        my_file = Path(output_file)

        if my_file.is_file():
          # file exists
          with open(output_file,'a') as out:
            csv_out=csv.writer(out)
            csv_out.writerow([year, float("{0:.2f}".format(p.avg_mk_per_sq)), float("{0:.2f}".format(p.avg_tx_per_sq)) ]) #, p.total_tax_dif
        else:
          # file not found
          with open(output_file,'w') as out:
            csv_out=csv.writer(out)
            csv_out.writerow(["YEAR", "MK_SQ", "TX_SQ"])
            csv_out.writerow([year, float("{0:.2f}".format(p.avg_mk_per_sq)), float("{0:.2f}".format(p.avg_tx_per_sq)) ]) #, p.total_tax_dif
        







