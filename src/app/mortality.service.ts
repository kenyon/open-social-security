import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MortalityService {

  constructor() { }

  determineMortalityTable (gender:string, mortalityInput:string, assumedDeathAge:number) {
    let mortalityTable: number[] = []
    if (gender == "male") {
      if (mortalityInput == "NS1") {mortalityTable = this.maleNS1}
      if (mortalityInput == "NS2") {mortalityTable = this.maleNS2}
      if (mortalityInput == "SSA") {mortalityTable = this.maleSSAtable}
      if (mortalityInput == "SM1") {mortalityTable = this.maleSM1}
      if (mortalityInput == "SM2") {mortalityTable = this.maleSM2}
    }
    if (gender == "female") {
      if (mortalityInput == "NS1") {mortalityTable = this.femaleNS1}
      if (mortalityInput == "NS2") {mortalityTable = this.femaleNS2}
      if (mortalityInput == "SSA") {mortalityTable = this.femaleSSAtable}
      if (mortalityInput == "SM1") {mortalityTable = this.femaleSM1}
      if (mortalityInput == "SM2") {mortalityTable = this.femaleSM2}
    }
    if (mortalityInput == "fixed") {
      mortalityTable = this.createMortalityTable(assumedDeathAge)
    }
    
    return mortalityTable
  }

  createMortalityTable(deathAge:number){
    let yearInTable: number = 0
    let newMortTable: number[] = []
    while (yearInTable < 140 ) {
      if (yearInTable <= deathAge) {
        newMortTable.push(1) //Lives remaining at every year up to and including death age is 1 (100% probability alive)
      } else {
        newMortTable.push(0) //Lives remaining at every year after death age is 0 (0% probability alive) -- we're assuming they live to the end of input death age
      }
      yearInTable = yearInTable + 1
    }
    return newMortTable
  }


//Lives remaining out of 100k, from SSA 2015 period life table
maleSSAtable = [
  100000,
  99362,
  99317,
  99289,
  99266,
  99249,
  99234,
  99219,
  99206,
  99194,
  99184,
  99174,
  99164,
  99151,
  99131,
  99100,
  99059,
  99006,
  98941,
  98863,
  98771,
  98663,
  98542,
  98410,
  98272,
  98131,
  97989,
  97844,
  97698,
  97547,
  97393,
  97235,
  97072,
  96906,
  96736,
  96562,
  96383,
  96198,
  96006,
  95809,
  95603,
  95389,
  95164,
  94925,
  94671,
  94397,
  94102,
  93784,
  93436,
  93054,
  92632,
  92168,
  91659,
  91103,
  90501,
  89851,
  89150,
  88396,
  87588,
  86724,
  85802,
  84819,
  83772,
  82663,
  81498,
  80277,
  78995,
  77644,
  76216,
  74704,
  73100,
  71393,
  69574,
  67640,
  65592,
  63426,
  61130,
  58693,
  56117,
  53406,
  50564,
  47585,
  44475,
  41251,
  37939,
  34566,
  31158,
  27748,
  24374,
  21079,
  17915,
  14934,
  12186,
  9714,
  7549,
  5706,
  4193,
  2996,
  2083,
  1410,
  932,
  600,
  376,
  228,
  134,
  76,
  42,
  22,
  11,
  5,
  2,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

femaleSSAtable = [
  100000,
  99463,
  99427,
  99405,
  99388,
  99375,
  99364,
  99353,
  99343,
  99334,
  99325,
  99316,
  99306,
  99295,
  99281,
  99264,
  99243,
  99217,
  99188,
  99156,
  99120,
  99080,
  99037,
  98990,
  98941,
  98890,
  98836,
  98779,
  98719,
  98656,
  98588,
  98515,
  98437,
  98354,
  98267,
  98175,
  98080,
  97978,
  97870,
  97756,
  97633,
  97502,
  97360,
  97207,
  97041,
  96861,
  96665,
  96452,
  96220,
  95965,
  95686,
  95380,
  95047,
  94686,
  94296,
  93877,
  93425,
  92939,
  92420,
  91870,
  91289,
  90673,
  90017,
  89317,
  88569,
  87769,
  86910,
  85982,
  84978,
  83889,
  82706,
  81414,
  80004,
  78475,
  76827,
  75058,
  73150,
  71088,
  68862,
  66466,
  63895,
  61131,
  58167,
  55013,
  51688,
  48207,
  44585,
  40838,
  36992,
  33085,
  29167,
  25303,
  21563,
  18020,
  14740,
  11781,
  9192,
  6998,
  5199,
  3771,
  2673,
  1848,
  1243,
  812,
  514,
  313,
  184,
  103,
  55,
  28,
  13,
  6,
  2,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

maleNS1 = [
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  99878, 
  99752, 
  99621, 
  99486, 
  99346, 
  99200, 
  99046, 
  98882, 
  98707, 
  98518, 
  98313, 
  98093, 
  97858, 
  97612, 
  97352, 
  97078, 
  96785, 
  96469, 
  96121, 
  95735, 
  95307, 
  94833, 
  94307, 
  93726, 
  93085, 
  92376, 
  91588, 
  90708, 
  89717, 
  88598, 
  87332, 
  85902, 
  84296, 
  82501, 
  80505, 
  78291, 
  75838, 
  73126, 
  70141, 
  66872, 
  63302, 
  59421, 
  55230, 
  50742, 
  45995, 
  41062, 
  36045, 
  31069, 
  26266, 
  21767, 
  17683, 
  14094, 
  11015, 
  8421, 
  6283, 
  4563, 
  3220, 
  2204, 
  1461, 
  937, 
  581, 
  349, 
  202, 
  114, 
  62, 
  33, 
  17, 
  9, 
  4, 
  2, 
  1, 
  1, 
  0, 
  0, 
  0, 
  0, 
  0, 
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

maleNS2 = [
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  99857, 
  99708, 
  99555, 
  99396, 
  99232, 
  99061, 
  98881, 
  98691, 
  98485, 
  98261, 
  98016, 
  97751, 
  97467, 
  97164, 
  96843, 
  96502, 
  96138, 
  95741, 
  95305, 
  94822, 
  94286, 
  93694, 
  93042, 
  92325, 
  91541, 
  90680, 
  89733, 
  88686, 
  87521, 
  86219, 
  84765, 
  83144, 
  81347, 
  79364, 
  77188, 
  74807, 
  72204, 
  69362, 
  66267, 
  62914, 
  59291, 
  55397, 
  51238, 
  46835, 
  42230, 
  37497, 
  32740, 
  28076, 
  23631, 
  19516, 
  15818, 
  12597, 
  9845, 
  7526, 
  5615, 
  4079, 
  2878, 
  1970, 
  1306, 
  838, 
  520, 
  312, 
  181, 
  101, 
  55, 
  29, 
  15, 
  8, 
  4, 
  2, 
  1, 
  0, 
  0, 
  0, 
  0, 
  0, 
  0, 
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

maleSM1 = [
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  99747, 
  99482, 
  99203, 
  98907, 
  98594, 
  98261, 
  97905, 
  97524, 
  97115, 
  96673, 
  96195, 
  95679, 
  95117, 
  94505, 
  93837, 
  93105, 
  92301, 
  91415, 
  90436, 
  89355, 
  88165, 
  86856, 
  85423, 
  83863, 
  82174, 
  80353, 
  78393, 
  76282, 
  74007, 
  71562, 
  68949, 
  66181, 
  63281, 
  60277, 
  57194, 
  54053, 
  50867, 
  47647, 
  44413, 
  41137, 
  37791, 
  34392, 
  30963, 
  27535, 
  24151, 
  20868, 
  17747, 
  14846, 
  12216, 
  9890, 
  7881, 
  6191, 
  4788, 
  3634, 
  2699, 
  1956, 
  1379, 
  944, 
  626, 
  401, 
  249, 
  149, 
  87, 
  49, 
  26, 
  14, 
  7, 
  4, 
  2, 
  1, 
  0, 
  0, 
  0, 
  0, 
  0, 
  0, 
  0, 
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

maleSM2 = [
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  99712, 
  99410, 
  99093, 
  98756, 
  98398, 
  98018, 
  97611, 
  97175, 
  96706, 
  96200, 
  95654, 
  95063, 
  94421, 
  93722, 
  92961, 
  92129, 
  91218, 
  90217, 
  89117, 
  87907, 
  86580, 
  85130, 
  83550, 
  81840, 
  80001, 
  78031, 
  75925, 
  73672, 
  71263, 
  68691, 
  65964, 
  63098, 
  60119, 
  57058, 
  53943, 
  50797, 
  47633, 
  44461, 
  41296, 
  38115, 
  34887, 
  31632, 
  28372, 
  25136, 
  21964, 
  18908, 
  16022, 
  13360, 
  10963, 
  8856, 
  7048, 
  5534, 
  4280, 
  3248, 
  2412, 
  1748, 
  1233, 
  844, 
  559, 
  359, 
  223, 
  133, 
  77, 
  43, 
  24, 
  13, 
  7, 
  3, 
  2, 
  1, 
  0, 
  0, 
  0, 
  0, 
  0, 
  0, 
  0, 
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

femaleNS1 = [
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  99927, 
  99853, 
  99778, 
  99700, 
  99619, 
  99532, 
  99439, 
  99339, 
  99229, 
  99107, 
  98970, 
  98817, 
  98649, 
  98467, 
  98270, 
  98058, 
  97828, 
  97579, 
  97307, 
  97008, 
  96679, 
  96317, 
  95921, 
  95485, 
  95008, 
  94484, 
  93908, 
  93269, 
  92558, 
  91760, 
  90862, 
  89851, 
  88711, 
  87425, 
  85971, 
  84323, 
  82449, 
  80318, 
  77928, 
  75290, 
  72386, 
  69115, 
  65465, 
  61509, 
  57250, 
  52710, 
  47938, 
  43012, 
  38020, 
  33056, 
  28230, 
  23646, 
  19372, 
  15473, 
  12011, 
  9032, 
  6559, 
  4597, 
  3111, 
  2032, 
  1279, 
  777, 
  455, 
  257, 
  141, 
  75, 
  39, 
  20, 
  10, 
  5, 
  2, 
  1, 
  1, 
  0, 
  0, 
  0, 
  0, 
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

femaleNS2 = [
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  99915, 
  99829, 
  99741, 
  99650, 
  99555, 
  99453, 
  99344, 
  99226, 
  99096, 
  98950, 
  98787, 
  98604, 
  98403, 
  98183, 
  97946, 
  97690, 
  97415, 
  97116, 
  96789, 
  96432, 
  96041, 
  95612, 
  95143, 
  94631, 
  94073, 
  93463, 
  92796, 
  92061, 
  91247, 
  90341, 
  89330, 
  88199, 
  86933, 
  85517, 
  83930, 
  82148, 
  80139, 
  77873, 
  75355, 
  72599, 
  69591, 
  66241, 
  62539, 
  58564, 
  54324, 
  49843, 
  45177, 
  40401, 
  35605, 
  30876, 
  26318, 
  22028, 
  18046, 
  14414, 
  11189, 
  8414, 
  6110, 
  4282, 
  2898, 
  1893, 
  1192, 
  723, 
  424, 
  240, 
  131, 
  70, 
  36, 
  18, 
  9, 
  5, 
  2, 
  1, 
  1, 
  0, 
  0, 
  0, 
  0, 
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

femaleSM1 = [
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  99841, 
  99673, 
  99493, 
  99297, 
  99083, 
  98851, 
  98595, 
  98316, 
  98012, 
  97677, 
  97312, 
  96912, 
  96473, 
  95990, 
  95457, 
  94869, 
  94220, 
  93504, 
  92714, 
  91844, 
  90887, 
  89838, 
  88689, 
  87435, 
  86075, 
  84606, 
  83022, 
  81316, 
  79489, 
  77543, 
  75476, 
  73281, 
  70953, 
  68487, 
  65878, 
  63126, 
  60207, 
  57086, 
  53755, 
  50222, 
  46526, 
  42743, 
  38871, 
  34929, 
  31014, 
  27181, 
  23490, 
  20006, 
  16783, 
  13858, 
  11262, 
  9010, 
  7082, 
  5454, 
  4111, 
  3030, 
  2182, 
  1529, 
  1035, 
  676, 
  426, 
  258, 
  151, 
  86, 
  47, 
  25, 
  13, 
  7, 
  3, 
  2, 
  1, 
  0, 
  0, 
  0, 
  0, 
  0, 
  0, 
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

femaleSM2 = [
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  100000, 
  99800, 
  99588, 
  99360, 
  99111, 
  98838, 
  98541, 
  98215, 
  97857, 
  97465, 
  97035, 
  96564, 
  96049, 
  95484, 
  94864, 
  94184, 
  93437, 
  92619, 
  91722, 
  90743, 
  89674, 
  88511, 
  87248, 
  85884, 
  84414, 
  82839, 
  81159, 
  79373, 
  77474, 
  75466, 
  73356, 
  71142, 
  68820, 
  66388, 
  63841, 
  61179, 
  58404, 
  55490, 
  52407, 
  49148, 
  45724, 
  42173, 
  38579, 
  34936, 
  31260, 
  27640, 
  24125, 
  20768, 
  17625, 
  14738, 
  12137, 
  9846, 
  7871, 
  6187, 
  4765, 
  3591, 
  2647, 
  1907, 
  1336, 
  904, 
  591, 
  372, 
  226, 
  132, 
  75, 
  41, 
  22, 
  11, 
  6, 
  3, 
  1, 
  1, 
  0, 
  0, 
  0, 
  0, 
  0, 
  0, 
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]



}
