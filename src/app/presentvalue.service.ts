import { Injectable } from '@angular/core';
import {BirthdayService} from './birthday.service'
import {BenefitService} from './benefit.service'
import { CurrencyPipe } from '@angular/common';

@Injectable()
export class PresentvalueService {

  constructor(private benefitService: BenefitService, private birthdayService: BirthdayService) { }
  
  calculateSinglePersonPV(FRA: Date, SSbirthDate: Date, PIA: number, inputBenefitMonth: number, inputBenefitYear: number, gender: string, discountRate: number)
  {
    let retirementBenefit: number = this.benefitService.calculateRetirementBenefit(PIA, FRA, inputBenefitMonth, inputBenefitYear)
    let retirementPV: number = 0
    let roundedAge: number = 0
    let probabilityAlive: number = 0

    //calculate age when they start benefit
    let age: number = ( inputBenefitMonth - (SSbirthDate.getMonth() + 1) + 12 * (inputBenefitYear - SSbirthDate.getFullYear()) )/12

    //calculate age when filling out form
    let today: Date = new Date()
    let initialAge: number = today.getFullYear() - SSbirthDate.getFullYear() + (today.getMonth() - SSbirthDate.getMonth())/12
    let initialAgeRounded: number = Math.round(initialAge)
    let discountTargetAge: number
    
    //Calculate PV via loop until they hit age 118 (by which point probability of being alive is basically zero)
      while (age < 118) {
        //When calculating probability alive, we have to round age to get a whole number to use for lookup in array.
        //Normally we round age down and use that number for the whole year. But sometimes, for example, real age will be 66 but javascript sees it as 65.99999, so we have to round that up.
        if (age%1 > 0.999) {
          roundedAge = Math.round(age)
          }
          else {roundedAge = Math.floor(age)}
        //Calculate probability of being alive at age in question.
        if (initialAgeRounded <= 62) {
            if (gender == "male") {probabilityAlive = this.maleLivesRemaining[roundedAge + 1] / this.maleLivesRemaining[62]}
            if (gender == "female") {probabilityAlive = this.femaleLivesRemaining[roundedAge + 1] / this.femaleLivesRemaining[62]}
        }
          //If they're older than 62 when filling out form, denominator is lives remaining at age when filling out the form.
          else { 
            if (gender == "male") {probabilityAlive = this.maleLivesRemaining[roundedAge + 1] / this.maleLivesRemaining[initialAgeRounded]}
            if (gender == "female") {probabilityAlive = this.femaleLivesRemaining[roundedAge + 1] / this.femaleLivesRemaining[initialAgeRounded]}
          }
        
        //Calculate probability-weighted benefit
        let monthlyPV = retirementBenefit * probabilityAlive
        //Discount that benefit to age 62
        monthlyPV = monthlyPV / (1 + discountRate/2) //e.g., benefits received during age 62 must be discounted for 0.5 years
        monthlyPV = monthlyPV / Math.pow((1 + discountRate),(roundedAge - 62)) //e.g., benefits received during age 63 must be discounted for 1.5 years
        //Add discounted benefit to ongoing count of retirementPV, add 1 month to age, and start loop over
        retirementPV = retirementPV + monthlyPV
        age = age + 1/12
      }
        return retirementPV
  }

  calculateCouplePV(spouseAFRA: Date, spouseBFRA: Date, spouseASSbirthDate: Date, spouseBSSbirthDate: Date, spouseAPIA: number, spouseBPIA: number, spouseAinputBenefitMonth: number, spouseBinputBenefitMonth: number, spouseAinputBenefitYear:number, spouseBinputBenefitYear: number, spouseAgender: string, spouseBgender:string, discountRate:number){
    let spouseAretirementBenefit: number = 0
    let spouseBretirementBenefit: number = 0
    let spouseAspousalBenefit: number
    let spouseBspousalBenefit: number
    let spouseAage: number
    let spouseAroundedAge: number
    let spouseAprobabilityAlive: number
    let spouseBage: number
    let spouseBroundedAge: number
    let spouseBprobabilityAlive: number
    let couplePV = 0
    let firstStartDate: Date
    let secondStartDate: Date
    let spouseAinputBenefitDate: Date = new Date(spouseAinputBenefitYear, spouseAinputBenefitMonth - 1, 1)
    let spouseBinputBenefitDate: Date = new Date(spouseBinputBenefitYear, spouseBinputBenefitMonth - 1, 1)

    //If spouse A's input benefit date earlier, set firstStartDate and secondStartDate accordingly.
    if (spouseAinputBenefitDate < spouseBinputBenefitDate)
      {
      firstStartDate = spouseAinputBenefitDate
      secondStartDate = spouseBinputBenefitDate
      }
    else {//This is fine as a simple "else" statement. If the two input benefit dates are equal, doing it as of either date is fine.
    firstStartDate = spouseBinputBenefitDate
    secondStartDate = spouseAinputBenefitDate
      }
    
    //Find age of each spouse as of firstStartDate
    spouseAage = ( firstStartDate.getMonth() - spouseASSbirthDate.getMonth() + 12 * (firstStartDate.getFullYear() - spouseASSbirthDate.getFullYear()) )/12
    spouseBage = ( firstStartDate.getMonth() - spouseBSSbirthDate.getMonth() + 12 * (firstStartDate.getFullYear() - spouseBSSbirthDate.getFullYear()) )/12

    //calculate ageswhen filling out form
    let today: Date = new Date()
    let spouseAinitialAgeRounded = Math.round(today.getFullYear() - spouseASSbirthDate.getFullYear() + (today.getMonth() - spouseASSbirthDate.getMonth())/12)
    let spouseBinitialAgeRounded = Math.round(today.getFullYear() - spouseBSSbirthDate.getFullYear() + (today.getMonth() - spouseBSSbirthDate.getMonth())/12)



    //Calculate PV via loop until both spouses are at least age 118 (by which point probability of being alive is basically zero)
    let currentTestDate: Date = new Date(firstStartDate)
    while (spouseAage < 118 || spouseBage < 118){
      //Both spouses must have filed before there can be spousal benefits. If both have reached start date, both spousal benefits are calculated as of secondStartDate
      if (currentTestDate < secondStartDate){
        spouseAspousalBenefit = 0
        spouseBspousalBenefit = 0
        }
        else {
        spouseAspousalBenefit = this.benefitService.calculateSpousalBenefit(spouseAPIA, spouseBPIA, spouseAFRA, spouseAinputBenefitMonth, spouseAinputBenefitYear, secondStartDate.getMonth()+1, secondStartDate.getFullYear())
        spouseBspousalBenefit = this.benefitService.calculateSpousalBenefit(spouseBPIA, spouseAPIA, spouseBFRA, spouseBinputBenefitMonth, spouseBinputBenefitYear, secondStartDate.getMonth()+1, secondStartDate.getFullYear())
        }

      //Retirement benefit A is zero if currentTestDate is prior to inputBenefitDateA. Otherwise retirement benefit A is calculated as of inputBenefitDateA
      if (currentTestDate < spouseAinputBenefitDate) {
        spouseAretirementBenefit = 0
        }
        else {spouseAretirementBenefit = this.benefitService.calculateRetirementBenefit(spouseAPIA, spouseAFRA, spouseAinputBenefitMonth, spouseAinputBenefitYear)
        }
      //Retirement benefit B is zero if currentTestDate is prior to inputBenefitDateB. Otherwise retirement benefit B is calculated as of inputBenefitDateB
      if (currentTestDate < spouseBinputBenefitDate) {
        spouseBretirementBenefit = 0
        }
        else {spouseBretirementBenefit = this.benefitService.calculateRetirementBenefit(spouseBPIA, spouseBFRA, spouseBinputBenefitMonth, spouseBinputBenefitYear)
        }

      //Calculate probability of spouseA being alive at given age
        //When calculating probability alive, we have to round age to get a whole number to use for lookup in array.
        //Normally we round age down and use that number for the whole year. But sometimes, for example, real age will be 66 but javascript sees it as 65.99999, so we have to round that up.
          if (spouseAage%1 > 0.999) {
          spouseAroundedAge = Math.round(spouseAage)
          }
          else {spouseAroundedAge = Math.floor(spouseAage)}
          //Calculate probability of being alive at age in question.
          if (spouseAinitialAgeRounded <= 62) {
            if (spouseAgender == "male") {spouseAprobabilityAlive = this.maleLivesRemaining[spouseAroundedAge + 1] / this.maleLivesRemaining[62]}
            if (spouseAgender == "female") {spouseAprobabilityAlive = this.femaleLivesRemaining[spouseAroundedAge + 1] / this.femaleLivesRemaining[62]}
          }
          //If spouseA is older than 62 when filling out form, denominator is lives remaining at age when filling out the form.
          else { 
            if (spouseAgender == "male") {spouseAprobabilityAlive = this.maleLivesRemaining[spouseAroundedAge + 1] / this.maleLivesRemaining[spouseAinitialAgeRounded]}
            if (spouseAgender == "female") {spouseAprobabilityAlive = this.femaleLivesRemaining[spouseAroundedAge + 1] / this.femaleLivesRemaining[spouseAinitialAgeRounded]}
          }
      //Do same math to calculate probability of spouseB being alive at given age
          //calculate rounded age
          if (spouseBage%1 > 0.999) {
          spouseBroundedAge = Math.round(spouseBage)
          }
          else {spouseBroundedAge = Math.floor(spouseBage)}
          //use rounded age and lives remaiing array to calculate probability
          if (spouseBinitialAgeRounded <= 62) {
            if (spouseBgender == "male") {spouseBprobabilityAlive = this.maleLivesRemaining[spouseBroundedAge + 1] / this.maleLivesRemaining[62]}
            if (spouseBgender == "female") {spouseBprobabilityAlive = this.femaleLivesRemaining[spouseBroundedAge + 1] / this.femaleLivesRemaining[62]}
          }
          //If spouseA is older than 62 when filling out form, denominator is lives remaining at age when filling out the form.
          else { 
            if (spouseBgender == "male") {spouseBprobabilityAlive = this.maleLivesRemaining[spouseBroundedAge + 1] / this.maleLivesRemaining[spouseBinitialAgeRounded]}
            if (spouseBgender == "female") {spouseBprobabilityAlive = this.femaleLivesRemaining[spouseBroundedAge + 1] / this.femaleLivesRemaining[spouseBinitialAgeRounded]}
          }
      //Find probability-weighted benefit
        let monthlyPV = (spouseAretirementBenefit + spouseAspousalBenefit) * spouseAprobabilityAlive + (spouseBretirementBenefit + spouseBspousalBenefit) * spouseBprobabilityAlive

      //Discount that benefit
            //Find which spouse is older, because we're discounting back to date on which older spouse is age 62.
            let olderRoundedAge: number
            if (spouseAage > spouseBage) {
              olderRoundedAge = spouseAroundedAge
            } else {olderRoundedAge = spouseBroundedAge}
            //Here is where actual discounting happens.
            monthlyPV = monthlyPV / (1 + discountRate/2) 
            monthlyPV = monthlyPV / Math.pow((1 + discountRate),(olderRoundedAge - 62))
      //Add discounted benefit to ongoing count of retirementPV, add 1 month to each age, add 1 month to currentTestDate, and start loop over
        couplePV = couplePV + monthlyPV
        spouseAage = spouseAage + 1/12
        spouseBage = spouseBage + 1/12
        currentTestDate.setMonth(currentTestDate.getMonth()+1)
    }

    return couplePV
  }


  maximizeSinglePersonPV(PIA: number, SSbirthDate: Date, FRA: Date, gender: string, discountRate: number){
    //find initial benefitMonth and benefitYear for age 62 (have to add 1 to month, because getMonth returns 0-11)
    let benefitMonth = SSbirthDate.getMonth() + 1
    let benefitYear = SSbirthDate.getFullYear() + 62

    //If they are currently over age 62 when filling out form, set benefitMonth and benefitYear to today's month/year instead of their age 62 month/year, so that calc starts today instead of 62.
    let today = new Date()
    let ageToday = today.getFullYear() - SSbirthDate.getFullYear() + (today.getMonth() - SSbirthDate.getMonth())/12
    if (ageToday > 62){
      benefitMonth = today.getMonth()+1
      benefitYear = today.getFullYear()
    }

    //Run calculateSinglePersonPV for their earliest possible claiming date, save the PV and the date.
    let savedPV: number = this.calculateSinglePersonPV(FRA, SSbirthDate, PIA, benefitMonth, benefitYear, gender, discountRate)
    let currentTestDate = new Date(benefitYear, benefitMonth, 1)
    let savedClaimingDate = new Date(currentTestDate)

    //Set endingTestDate equal to the month before they turn 70 (because loop starts with adding a month and then testing new values)
    let endingTestDate = new Date(SSbirthDate)
    endingTestDate.setFullYear(endingTestDate.getFullYear() + 70)
    endingTestDate.setMonth(endingTestDate.getMonth()-1)
    while (currentTestDate <= endingTestDate){
      //Add 1 month to claiming age and run both calculations again and compare results. Save better of the two.
      currentTestDate.setMonth(currentTestDate.getMonth() + 1)
      benefitMonth = currentTestDate.getMonth() + 1
      benefitYear = currentTestDate.getFullYear()
      let currentTestPV = this.calculateSinglePersonPV(FRA, SSbirthDate, PIA, benefitMonth, benefitYear, gender, discountRate)
      if (currentTestPV > savedPV)
        {savedClaimingDate.setMonth(currentTestDate.getMonth())
          savedClaimingDate.setFullYear(currentTestDate.getFullYear())
          savedPV = currentTestPV}
    }
    //after loop is finished
    console.log("saved PV: " + savedPV)
    console.log("savedClaimingDate: " + savedClaimingDate)
  }

  maximizeCouplePV(spouseAPIA: number, spouseBPIA: number, spouseASSbirthDate: Date, spouseBSSbirthDate: Date, spouseAFRA: Date, spouseBFRA: Date, spouseAgender: string, spouseBgender:string, discountRate: number){
    //find spouseAbenefitMonth and spouseAbenefitYear for when spouseA is 62 (have to add 1 to month, because getMonth returns 0-11)
    let spouseAbenefitMonth: number = spouseASSbirthDate.getMonth()+1
    let spouseAbenefitYear: number = spouseASSbirthDate.getFullYear()+62
    //If spouseA is currently over age 62 when filling out form, adjust their initial benefitMonth and benefitYear to today's month/year instead of their age 62 month/year.
    let today = new Date()
    let spouseAageToday: number = today.getFullYear() - spouseASSbirthDate.getFullYear() + (today.getMonth() - spouseASSbirthDate.getMonth()) /12
    if (spouseAageToday > 62){
      spouseAbenefitMonth = today.getMonth()+1
      spouseAbenefitYear = today.getFullYear()
    }
    //Do all of the same, but for spouseB.
    let spouseBbenefitMonth: number = spouseBSSbirthDate.getMonth()+1
    let spouseBbenefitYear: number = spouseBSSbirthDate.getFullYear()+62
    let spouseBageToday: number = today.getFullYear() - spouseBSSbirthDate.getFullYear() + (today.getMonth() - spouseBSSbirthDate.getMonth()) /12
    if (spouseBageToday > 62){
      spouseBbenefitMonth = today.getMonth()+1
      spouseBbenefitYear = today.getFullYear()
    }
    //Initialize savedPV as zero. Set spouseATestDate and spouseBTestDate. Set spouseAsavedDate and spouseBsavedDate equal to their current testDates.
      let savedPV: number = 0
      let spouseAtestDate = new Date(spouseAbenefitYear, spouseAbenefitMonth-1, 1)
      let spouseBtestDate = new Date(spouseBbenefitYear, spouseBbenefitMonth-1, 1)
      let spouseAsavedDate = new Date(spouseAtestDate)
      let spouseBsavedDate = new Date(spouseBtestDate)

    //Set endingTestDate for each spouse equal to the month they turn 70
    let spouseAendTestDate = new Date(spouseASSbirthDate.getFullYear()+70, spouseASSbirthDate.getMonth(), 1)
    let spouseBendTestDate = new Date(spouseBSSbirthDate.getFullYear()+70, spouseBSSbirthDate.getMonth(), 1)
    while (spouseAtestDate <= spouseAendTestDate) {
        //Reset spouseBtestDate to earliest possible (i.e., their Age62 month or today's month if they're currently older than 62)
        if (spouseBageToday > 62){
          spouseBtestDate.setMonth(today.getMonth())
          spouseBtestDate.setFullYear(today.getFullYear())
        } else {
          spouseBtestDate.setMonth(spouseBSSbirthDate.getMonth())
          spouseBtestDate.setFullYear(spouseBSSbirthDate.getFullYear()+62)
        }
        while (spouseBtestDate <= spouseBendTestDate) {
          //Calculate PV using current testDates
            spouseAbenefitMonth = spouseAtestDate.getMonth() + 1
            spouseAbenefitYear = spouseAtestDate.getFullYear()
            spouseBbenefitMonth = spouseBtestDate.getMonth() + 1
            spouseBbenefitYear = spouseBtestDate.getFullYear()
            let currentTestPV: number = this.calculateCouplePV(spouseAFRA, spouseBFRA, spouseASSbirthDate, spouseBSSbirthDate, Number(spouseAPIA), Number(spouseBPIA), spouseAbenefitMonth, spouseBbenefitMonth, spouseAbenefitYear, spouseBbenefitYear, spouseAgender, spouseBgender, Number(discountRate))
            //If PV is greater than saved PV, save new PV and save new testDates
            if (currentTestPV > savedPV) {
              savedPV = currentTestPV
              spouseAsavedDate.setMonth(spouseAtestDate.getMonth())
              spouseAsavedDate.setFullYear(spouseAtestDate.getFullYear())
              spouseBsavedDate.setMonth(spouseBtestDate.getMonth())
              spouseBsavedDate.setFullYear(spouseBtestDate.getFullYear())
              }
          //Add 1 month to spouseBtestDate
          spouseBtestDate.setMonth(spouseBtestDate.getMonth()+1)
        }
        //Add 1 month to spouseAtestDate
        spouseAtestDate.setMonth(spouseAtestDate.getMonth()+1)
      }
    //after loop is finished
      console.log("saved PV: " + savedPV)
      console.log("spouseAsavedDate: " + spouseAsavedDate)
      console.log("spouseBsavedDate: " + spouseBsavedDate)
  }


//Lives remaining out of 100k, from SSA 2014 period life table
maleLivesRemaining = [
  100000,
  99368,
  99328,
  99300,
  99279,
  99261,
  99245,
  99231,
  99218,
  99206,
  99197,
  99187,
  99177,
  99164,
  99144,
  99114,
  99074,
  99024,
  98963,
  98889,
  98802,
  98701,
  98588,
  98464,
  98335,
  98204,
  98072,
  97937,
  97801,
  97662,
  97520,
  97373,
  97224,
  97071,
  96914,
  96753,
  96587,
  96415,
  96236,
  96050,
  95856,
  95653,
  95437,
  95207,
  94958,
  94688,
  94394,
  94073,
  93721,
  93336,
  92913,
  92449,
  91943,
  91392,
  90792,
  90142,
  89439,
  88681,
  87867,
  87001,
  86081,
  85104,
  84065,
  82967,
  81812,
  80600,
  79324,
  77977,
  76550,
  75036,
  73427,
  71710,
  69878,
  67930,
  65866,
  63686,
  61377,
  58930,
  56344,
  53625,
  50776,
  47795,
  44685,
  41461,
  38148,
  34771,
  31358,
  27943,
  24565,
  21270,
  18107,
  15128,
  12381,
  9906,
  7733,
  5878,
  4348,
  3130,
  2194,
  1500,
  1001,
  652,
  413,
  254,
  151,
  87,
  48,
  26,
  13,
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
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
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

femaleLivesRemaining = [
  100000,
  99469,
  99434,
  99412,
  99396,
  99383,
  99372,
  99361,
  99351,
  99342,
  99334,
  99325,
  99317,
  99307,
  99294,
  99279,
  99260,
  99237,
  99210,
  99180,
  99146,
  99109,
  99069,
  99025,
  98978,
  98929,
  98877,
  98822,
  98765,
  98705,
  98641,
  98575,
  98505,
  98431,
  98351,
  98266,
  98175,
  98076,
  97970,
  97856,
  97735,
  97604,
  97463,
  97311,
  97146,
  96966,
  96771,
  96559,
  96327,
  96072,
  95794,
  95488,
  95155,
  94794,
  94405,
  93987,
  93539,
  93057,
  92542,
  91997,
  91420,
  90809,
  90157,
  89461,
  88715,
  87914,
  87049,
  86114,
  85102,
  84006,
  82818,
  81525,
  80117,
  78591,
  76947,
  75182,
  73280,
  71225,
  69008,
  66621,
  64059,
  61304,
  58350,
  55213,
  51913,
  48467,
  44889,
  41191,
  37394,
  33531,
  29650,
  25811,
  22083,
  18536,
  15240,
  12250,
  9620,
  7378,
  5525,
  4043,
  2893,
  2021,
  1375,
  909,
  583,
  361,
  215,
  123,
  67,
  35,
  17,
  8,
  3,
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

}
