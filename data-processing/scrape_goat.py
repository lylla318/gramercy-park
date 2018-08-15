import re
import json
import io
import csv
import sys
from pprint import pprint
from collections import defaultdict
# import mysql.connector
# import MySQLdb
import time
import datetime
import urllib2
from bs4 import BeautifulSoup





class BIN_parser:


  def __init__(self):

    #bins = [1017812,1082134,1018040,1082127,1017857,1020454,1017926,1018120,1082156,1020493,1019668,1019554,1020553,1019593,1017876,1077013,1020411,1020531,1020574,1018165,1019782,1018132,1020419,1078747,1020436,1017803,1019505,1082155,1088177,1017902,1020520,1020482,1018062,1020548,1019731,1017930,1017806,1017916,1078725,1020524,1020464,1020534,1017827,1019515,1018121,1020541,1019534,1017825,1084938,1019559,1019563,1019514,1020433,1019625,1017881,1018085,1020483,1017807,1017858,1018172,1020488,1018157,1019665,1077007,1017870,1020450,1082099,1077097,1017789,1019501,1020504,1018057,1082158,1019631,1078735,1019556,1077012,1017793,1084711,1020402,1019572,1019537,1019538,1019509,1020462,1018107,1017848,1017996,1020447,1078811,1017955,1020567,1017912,1019529,1017894,1019662,1018056,1019629,1017962,1019633,1019551,1018186,1018105,1017959,1020453,1019640,1019502,1088559,1019652,1020597,1018013,1018134,1019653,1019503,1020392,1077008,1017887,1080798,1020525,1017868,1018068,1017816,1020457,1017843,1018135,1087902,1017992,1017866,1018032,1019635,1020394,1020417,1019624,1086124,1019540,1017953,1018152,1082129,1020566,1083247,1018014,1020397,1082118,1086514,1018146,1017815,1020444,1019536,1018151,1019539,1084713,1020538,1020506,1019592,1020423,1069249,1020495,1018183,1019550,1020410,1078813,1020516,1017897,1017915,1019650,1018177,1020458,1019512,1017893,1018119,1020556,1018007,1019654,1018160,1017855,1018002,1076148,1017852,1018102,1019549,1019607,1018203,1020535,1020505,1017891,1017800,1019506,1083256,1017850,1020389,1020554,1020564,1018071,1018024,1018153,1078815,1018067,1019608,1017947,1018039,1018150,1082135,1084710,1018136,1019628,1017905,1019584,1018169,1017823,1018088,1017949,1069344,1018197,1018180,1019553,1020513,1080807,1020407,1017810,1017882,1017799,1020552,1087070,1018130,1078822,1018059,1020568,1019569,1019611,1020398,1019585,1018192,1018020,1018189,1017826,1020427,1017871,1020480,1017908,1018012,1020469,1020431,1017874,1020474,1017833,1020400,1017885,1018184,1080796,1017909,1019636,1017888,1018017,1082125,1020502,1017877,1019657,1018166,1017920,1017821,1082136,1020489,1018023,1078821,1017895,1019604,1020536,1019643,1017910,1019525,1018138,1018060,1018061,1017859,1018168,1020526,1020569,1018139,1018123,1020403,1019639,1017934,1081662,1017950,1020545,1017869,1020496,1081633,1018083,1018143,1018124,1020409,1019510,1017849,1020414,1019574,1018118,1078734,1018175,1078778,1018156,1020523,1018142,1080799,1017856,1017875,1018193,1078808,1017817,1087451,1018187,1019603,1020443,1018194,1076149,1020406,1018058,1018106,1083089,1019773,1088551,1020500,1017813,1020490,1018182,1018022,1017903,1019634,1081639,1019588,1017931,1017836,1017943,1020539,1017792,1077010,1018171,1019777,1018046,1088613,1020404,1018026,1019548,1019781,1020467,1078816,1084795,1018191,1018196,1019580,1017932,1020445,1018195,1082098,1020477,1017879,1020507,1020544,1018089,1020420,1017794,1018199,1019594,1077011,1017928,1020514,1017863,1018011,1019562,1020475,1019558,1020456,1019524,1017790,1017961,1020413,1017951,1017853,1018086,1019610,1017917,1080803,1019614,1017929,1082130,1017880,1018027,1020587,1019542,1020540,1084936,1087750,1019605,1018009,1019664,1017993,1020557,1018149,1085807,1020509,1020405,1080802,1080811,1020387,1080808,1017835,1020481,1020511,1017808,1018140,1019566,1020546,1018144,1020473,1017839,1019535,1017952,1017913,1017824,1019541,1019519,1017867,1020396,1020472,1019532,1019555,1018167,1017818,1018006,1017841,1017956,1087855,1019564,1078736,1019655,1017791,1018162,1081671,1018108,1019523,1088660,1018170,1017960,1017940,1019656,1017946,1018198,1018115,1078820,1017845,1020527,1019645,1088555,1020485,1018000,1017811,1020580,1017954,1018003,1019521,1018066,1087279,1078732,1018129,1018034,1020508,1020484,1017854,1018179,1020432,1020501,1019520,1019587,1019641,1017898,1020543,1020416,1019565,1019586,1078817,1018114,1019779,1019613,1019568,1017927,1018010,1020446,1020497,1082157,1020550,1082128,1017834,1020510,1019620,1019648,1017822,1017805,1017958,1017899,1019544,1020439,1020517,1018055,1017904,1018087,1078739,1017907,1019619,1019517,1020442,1019508,1020418,1020573,1017804,1019511,1019570,1018145,1018043,1020471,1020560,1019658,1082126,1020451,1019774,1020476,1020559,1019591,1082120,1020421,1017798,1017828,1085463,1018084,1020529,1018155,1020408,1017814,1020399,1078777,1078740,1088467,1019596,1017801,1090208,1017922,1019579,1017957,1017941,1019637,1019516,1019759,1017914,1017872,1018137,1020492,1020426,1017919,1019578,1020468,1019612,1020455,1018045,1017896,1019626,1017847,1020440,1018178,1020579,1019530,1017938,1020479,1018016,1088759,1017991,1020412,1019547,1020466,1018127,1019522,1018125,1020424,1078824,1020486,1078741,1020465,1019595,1020518,1018079,1020435,1020391,1084709,1019623,1019638,1020487,1019577,1020542,1019528,1019557,1017995,1017846,1020422,1019618,1019507,1020571,1019581,1019651,1019630,1078809,1018181,1018053,1017796,1019769,1069343,1019644,1018154,1078779,1020549,1017998,1018131,1017890,1017942,1020478,1017878,1019499,1020515,1018174,1019661,1018018,1020470,1019642,1020499,1017831,1017921,1019667,1017994,1018148,1017862,1017933,1017944,1020438,1017990,1020390,1020494,1018104,1018201,1019649,1080801,1020575,1017997,1082131,1020425,1017889,1081663,1020441,1019589,1017964,1019571,1017819,1017924,1017884,1017918,1019582,1020463,1019575,1017900,1017948,1017883,1018158,1019590,1018126,1076152,1019527,1020562,1081630,1017838,1017923,1077009,1080800,1018090,1018070,1018004,1018080,1078814,1019583,1017820,1017901,1077014,1020459,1020530,1020533,1020532,1088779,1018110,1020460,1019632,1082518,1017945,1017797,1018044,1018188,1019663,1017989,1018133,1082124,1019560,1017802,1017860,1019621,1020393,1018173,1017911,1020395,1020503,1017840,1020448,1020528,1017865,1019627,1018005,1018200,1019576,1020437,1018176,1082122,1018019,1018031,1017788,1017795,1019533,1019770,1019526,1020570,1018163,1018033,1018190,1019543,1078776,1020537,1020598,1018103,1017861,1019622,1020498,1019552,1017906,1017829,1020565,1018041,1018128,1018161,1019546,1017873,1020461,1019609,1087888,1020388,1017837,1082132,1020561,1020512,1082123,1017844,1020558,1080804,1020551,1082121,1019776,1020452,1019606,1017809,1018185,1020519,1020555,1018159,1017851,1076164,1020401,1082133,1019647,1019504,1018202,1080812,1018147,1020522,1019573,1018008,1018141,1020429,1017830,1078819,1017936,1020449,1087751,1018122,1019646,1020428,1020491,1018063,1018069,1088836,1017925,1089666,1089380,1090008,1020563,1795017,1082097,1090007,1020415,1081661,1086544,1087220,1019518,1019778,1085011,1088656,1019775,1019513,1018015,1086513,1081405,1020430,1083254,1017999,1019531,1019602,1020572,1019780,1017935,1017832,1019545,1017892,1017937,1019500,1018042,1018109,1018164,1090533,1017939,1090418,1019771,1089843,1090159]
    bins = [1017861, 1017863, 1085463, 1017865, 1017866, 1017867, 1017868, 1080800, 1080801, 1017873, 1017874, 1017875, 1017876, 1017877, 1017878, 1017879, 1017880, 1078735, 1078736, 1017881, 1017882, 1018009, 1018008, 1078725, 1078734, 1018007, 1018006, 1018005, 1018004, 1018003, 1018002, 1089666, 1018019, 1018018, 1018017, 1018016, 1086513, 1086544, 1018014, 1018013, 1018032, 1018012, 1018010, 1017860, 1080798, 1017859, 1017858, 1017843, 1017857, 1018009, 1018008, 1078725, 1078734, 1018007, 1018006, 1018005, 1018004, 1018003, 1018002, 1089666, 1018010, 1018012, 1018032, 1018013, 1018014, 1086544, 1086513, 1018016, 1018017, 1018018, 1018019, 1089666, 1018000, 1017999, 1017998, 1017957, 1017958, 1017959, 1017960, 1017961, 1017962, 1076149, 1017885, 1017884, 1017883, 1017882, 1017857, 1017856, 1017855, 1017854, 1017853]

    reader = csv.reader(open("input/all_gramercy_facing.csv", 'rU'), delimiter=",", dialect=csv.excel_tab)
    for row in reader:
      print(type(row[0]))
      bins.append(row[0])

    self.csv_data = []

    for binno in bins:
     self.csv_data.append(self.scrape_goat(binno))

    self.write_output()


  def scrape_goat(self, binno):

    #print("Begin scraping...")
 
    url = "http://a030-goat.nyc.gov/goat/bn.aspx?allbin=" + binno
    page = urllib2.urlopen(url)
    soup = BeautifulSoup(page,  "html.parser")
    output = []

    #try:
    block = (soup.find("span", {"id": "label_tax_block_output"})).text
    lot = (soup.find("span", {"id": "label_tax_lot_output"})).text
    bbl = (soup.find("span", {"id": "label_bbl_output"})).text
    bin_no = (soup.find("span", {"id": "label_bin_output"})).text
    condo_no = (soup.find("span", {"id": "label_rapd_condo_num_output"})).text
    coop_no = (soup.find("span", {"id": "label_coop_num_output"})).text
    hnum_lo = 0
    hnum_hi = 0
    str_name = 0

    labels = soup.find("tr", {"class":"labels"})
    ctr = 0
    
    for elem in labels.findAll("td"):
      form = (elem.text).strip()
      if ctr == 1:
        hnum_lo = form
      elif ctr == 2:
        hnum_hi = form
      elif ctr == 3:
        str_name = form
      ctr += 1

    output = [bbl, block, lot, bin_no, hnum_lo, hnum_hi, str_name, condo_no, coop_no]

    #except:
    #  print("Error scraping data.")

    print(output)
    return output


  def write_output(self):

    csv_write = "output/gramercy_bins.csv"
    with open(csv_write,'w') as out:
      csv_out=csv.writer(out)
      for row in self.csv_data:
        csv_out.writerow(row)




class BBL_parser:

  def __init__(self, csv_read, csv_write):
    
    self.csv_data = []
    self.csv_read = csv_read
    self.csv_write = csv_write
    self.bbls = self.get_bbles()

    for row in self.bbls:
      self.csv_data.append(self.scrape_goat(row[0],row[1]))

    self.write_output()
    
    
  def get_bbles(self):

    bbls = []
    reader = csv.reader(open(self.csv_read, 'rU'), delimiter=",", dialect=csv.excel_tab)
    for row in reader:
      try:
        bble = row[0]
        block = int(bble[3:6])
        lot = int(bble[6:])
        bbls.append([block,lot])
      except:
        print("Could not parse.")

    return bbls

  def scrape_goat(self, block, lot):

    url = "http://a030-goat.nyc.gov/goat/bl.aspx?boro=1&block_num=" + str(block) + "&lot_num=" + str(lot)
    page = urllib2.urlopen(url)
    soup = BeautifulSoup(page,  "html.parser")
    output = []

    #try:
    block = (soup.find("span", {"id": "label_tax_block_output"})).text
    lot = (soup.find("span", {"id": "label_tax_lot_output"})).text
    bbl = (soup.find("span", {"id": "label_bbl_output"})).text
    bin_no = (soup.find("span", {"id": "label_bin_output"})).text
    condo_no = (soup.find("span", {"id": "label_rapd_condo_num_output"})).text
    coop_no = (soup.find("span", {"id": "label_coop_num_output"})).text
    hnum_lo = 0
    hnum_hi = 0
    str_name = 0

    labels = soup.find("tr", {"class":"labels"})
    ctr = 0
    
    for elem in labels.findAll("td"):
      form = (elem.text).strip()
      if ctr == 1:
        hnum_lo = form
      elif ctr == 2:
        hnum_hi = form
      elif ctr == 3:
        str_name = form
      ctr += 1

    output = [bbl, block, lot, bin_no, hnum_lo, hnum_hi, str_name, condo_no, coop_no]
    print(output)

    #except:
    #  print("Error scraping data.")

    print(output)
    return output


  def write_output(self):

    with open(self.csv_write,'w') as out:
      csv_out=csv.writer(out)
      csv_out.writerow(["bbl", "block", "lot", "bin_no", "hnum_lo", "hnum_hi", "str_name", "condo_no", "coop_no"])
      for row in self.csv_data:
        csv_out.writerow(row)


if __name__ == '__main__':

  csv_read = "input/all_stuyvesant.csv"
  csv_write = "output/stuyvesant_parcel_data.csv"
  p = BBL_parser(csv_read, csv_write)





