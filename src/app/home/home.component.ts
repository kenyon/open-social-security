import { Component, OnInit } from '@angular/core';
import {BirthdayService} from '../birthday.service'
import {PresentvalueService} from '../presentvalue.service'
import {MortalityService} from '../mortality.service'
import {SolutionSet} from '../solutionset'
import {FREDresponse} from '../fredresponse'
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private birthdayService: BirthdayService, private presentvalueService: PresentvalueService, private mortalityService: MortalityService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get<FREDresponse>("https://www.quandl.com/api/v3/datasets/FRED/DFII20.json?limit=1&api_key=iuEbMEnRuZzmUpzMYgx3")
    .subscribe(
      data => {this.discountRate = data.dataset.data[0][1]},
      error => {this.discountRate = 1}
    )
  }

  today = new Date()
  deemedFilingCutoff: Date = new Date(1954, 0, 1)

//Variables to make form work
  inputMonths: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  inputDays: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
              16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  inputYears = [1938, 1939,
              1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949,
              1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959,
              1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969,
              1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
              1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
              1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
              2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
              2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]

  inputBenefitYears = [
                    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
                    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
                    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029,
                    2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039,
                    2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049,
                    2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059,
                    2060]

  quitWorkYears = [ 2018, 2019,
    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029,
    2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039,
    2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049,
    2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059,
    2060, 2061, 2062, 2063, 2065, 2065, 2066, 2067, 2069, 2070 ]


//Inputs from form
  maritalStatus: string = "single"
  spouseAinputMonth: number = 4
  spouseAinputDay: number = 15
  spouseAinputYear: number = 1960
  spouseAPIA: number = 1000
  spouseAfixedRetirementBenefitMonth: number
  spouseAfixedRetirementBenefitYear: number
  spouseAfixedRetirementBenefitDate: Date
  spouseBfixedRetirementBenefitMonth: number
  spouseBfixedRetirementBenefitYear: number
  spouseBfixedRetirementBenefitDate: Date
  spouseAgender: string = "male"
  spouseAassumedDeathAge: number = 0
  spouseAmortalityInput: string = "SSA"
  spouseBinputMonth: number = 4
  spouseBinputDay: number = 15
  spouseBinputYear: number = 1960
  spouseBPIA: number = 1000
  spouseBgender: string = "female"
  spouseBmortalityInput: string = "SSA"
  spouseBassumedDeathAge: number = 0
  discountRate: number
  advanced: boolean = false
  spouseAgovernmentPension: number = 0
  spouseBgovernmentPension: number = 0
  spouseAhasFiled: boolean = false
  spouseBhasFiled: boolean = false
    //earnings test inputs
    spouseAworking: boolean = false
    spouseAquitWorkYear: number
    spouseAquitWorkMonth: number
    spouseAquitWorkDate: Date
    spouseAmonthlyEarnings: number = 0
    spouseBworking: boolean = false
    spouseBquitWorkYear: number
    spouseBquitWorkMonth: number
    spouseBquitWorkDate: Date
    spouseBmonthlyEarnings: number = 0

  //Inputs from custom date form
  customSpouseAretirementBenefitMonth: number
  customSpouseAretirementBenefitYear: number
  customSpouseAretirementBenefitDate: Date
  customSpouseAspousalBenefitMonth: number
  customSpouseAspousalBenefitYear: number
  customSpouseAspousalBenefitDate: Date
  customSpouseBretirementBenefitMonth: number
  customSpouseBretirementBenefitYear: number
  customSpouseBretirementBenefitDate: Date
  customSpouseBspousalBenefitMonth: number
  customSpouseBspousalBenefitYear: number
  customSpouseBspousalBenefitDate: Date


  //Calculated dates and related info
  spouseAactualBirthDate: Date
  spouseASSbirthDate: Date
  spouseAFRA: Date
  spouseAsurvivorFRA: Date
  spouseBSSbirthDate: Date
  spouseBactualBirthDate: Date
  spouseBFRA: Date
  spouseBsurvivorFRA: Date
  spouseAage: number
  spouseBage: number
  spouseAageRounded: number
  spouseBageRounded: number
  spouseAmortalityTable: number[]
  spouseBmortalityTable: number[]

  //Error variables
  statusMessage:string = ""
  customSpouseAretirementDateError:string
  customSpouseBretirementDateError:string
  customSpouseAspousalDateError:string
  customSpouseBspousalDateError:string
  spouseAfixedRetirementDateError:string
  spouseBfixedRetirementDateError:string

  //solution variables
  customPV: number
  differenceInPV: number
  solutionSet: SolutionSet = {
    "solutionPV":null,
    "spouseAretirementSolutionDate":null,
    "spouseAretirementSolutionAmount":null,
    "spouseAretirementSolutionAgeYears":null,
    "spouseAretirementSolutionAgeMonths":null,
    "spouseBretirementSolutionDate":null,
    "spouseBretirementSolutionAmount":null,
    "spouseBretirementSolutionAgeYears":null,
    "spouseBretirementSolutionAgeMonths":null,
    "spouseAspousalSolutionDate":null,
    "spouseAspousalSolutionAmount":null,
    "spouseAspousalSolutionAgeYears":null,
    "spouseAspousalSolutionAgeMonths":null,
    "spouseBspousalSolutionDate":null,
    "spouseBspousalSolutionAmount":null,
    "spouseBspousalSolutionAgeYears":null,
    "spouseBspousalSolutionAgeMonths":null
  }

  onSubmit() {
    let startTime = performance.now() //for testing performance
    console.log("-------------")
    this.getPrimaryFormInputs() //Use inputs to calculate ages, SSbirthdates, FRAs, etc.

    //Call appropriate "maximizePV" function to find best solution
    if (this.maritalStatus == "single") {
      this.solutionSet = this.presentvalueService.maximizeSinglePersonPV(Number(this.spouseAPIA), this.spouseASSbirthDate, this.spouseAactualBirthDate, this.spouseAage, this.spouseAFRA, this.spouseAquitWorkDate, this.spouseAmonthlyEarnings, this.spouseAmortalityTable, Number(this.discountRate))
      }
    if(this.maritalStatus == "married") {
      if (this.spouseAhasFiled === false && this.spouseBhasFiled === false) {//i.e., if neither spouse has filed
        this.solutionSet = this.presentvalueService.maximizeCouplePV(this.maritalStatus, Number(this.spouseAPIA), Number(this.spouseBPIA), this.spouseAactualBirthDate, this.spouseBactualBirthDate, this.spouseASSbirthDate, this.spouseBSSbirthDate, Number(this.spouseAageRounded), Number(this.spouseBageRounded), this.spouseAFRA, this.spouseBFRA, this.spouseAsurvivorFRA, this.spouseBsurvivorFRA, this.spouseAmortalityTable, this.spouseBmortalityTable, this.spouseAquitWorkDate, this.spouseBquitWorkDate, this.spouseAmonthlyEarnings, this.spouseBmonthlyEarnings, Number(this.spouseAgovernmentPension), Number(this.spouseBgovernmentPension), Number(this.discountRate))
      } else if (this.spouseAhasFiled === true && this.spouseBhasFiled === false) {//i.e., if spouseA has filed and B has not
        this.spouseAfixedRetirementDateError = this.checkValidRetirementInputs(this.spouseAFRA, this.spouseASSbirthDate, this.spouseAactualBirthDate, this.spouseAfixedRetirementBenefitDate)
        if (!this.spouseAfixedRetirementDateError){
          this.solutionSet = this.presentvalueService.maximizeCoupleOneHasFiledPV(this.maritalStatus, this.spouseAhasFiled, this.spouseBhasFiled, this.spouseAfixedRetirementBenefitDate, Number(this.spouseBPIA), Number(this.spouseAPIA), this.spouseBactualBirthDate, this.spouseAactualBirthDate, this.spouseBSSbirthDate, this.spouseASSbirthDate, Number(this.spouseBageRounded), Number(this.spouseAageRounded), this.spouseBFRA, this.spouseAFRA, this.spouseBsurvivorFRA, this.spouseAsurvivorFRA, this.spouseBmortalityTable, this.spouseAmortalityTable, this.spouseBquitWorkDate, this.spouseAquitWorkDate, this.spouseBmonthlyEarnings, this.spouseAmonthlyEarnings, Number(this.spouseBgovernmentPension), Number(this.spouseAgovernmentPension), Number(this.discountRate))
        }
      } else if (this.spouseBhasFiled === true && this.spouseAhasFiled === false) {//i.e., if spouseB has filed and A has not
        this.spouseBfixedRetirementDateError = this.checkValidRetirementInputs(this.spouseBFRA, this.spouseBSSbirthDate, this.spouseBactualBirthDate, this.spouseBfixedRetirementBenefitDate)
        if (!this.spouseBfixedRetirementDateError){
          this.solutionSet = this.presentvalueService.maximizeCoupleOneHasFiledPV(this.maritalStatus, this.spouseAhasFiled, this.spouseBhasFiled, this.spouseBfixedRetirementBenefitDate, Number(this.spouseAPIA), Number(this.spouseBPIA), this.spouseAactualBirthDate, this.spouseBactualBirthDate, this.spouseASSbirthDate, this.spouseBSSbirthDate, Number(this.spouseAageRounded), Number(this.spouseBageRounded), this.spouseAFRA, this.spouseBFRA, this.spouseAsurvivorFRA, this.spouseBsurvivorFRA, this.spouseAmortalityTable, this.spouseBmortalityTable, this.spouseAquitWorkDate, this.spouseBquitWorkDate, this.spouseAmonthlyEarnings, this.spouseBmonthlyEarnings, Number(this.spouseAgovernmentPension), Number(this.spouseBgovernmentPension), Number(this.discountRate))
        }
      }
    }
    if(this.maritalStatus == "divorced") {
      this.spouseBfixedRetirementDateError = this.checkValidRetirementInputs(this.spouseBFRA, this.spouseBSSbirthDate, this.spouseBactualBirthDate, this.spouseBfixedRetirementBenefitDate)
        if (!this.spouseBfixedRetirementDateError){
          this.solutionSet = this.presentvalueService.maximizeCoupleOneHasFiledPV(this.maritalStatus, this.spouseAhasFiled, this.spouseBhasFiled, this.spouseBfixedRetirementBenefitDate, Number(this.spouseAPIA), Number(this.spouseBPIA), this.spouseAactualBirthDate, this.spouseBactualBirthDate, this.spouseASSbirthDate, this.spouseBSSbirthDate, Number(this.spouseAageRounded), Number(this.spouseBageRounded), this.spouseAFRA, this.spouseBFRA, this.spouseAsurvivorFRA, this.spouseBsurvivorFRA, this.spouseAmortalityTable, this.spouseBmortalityTable, this.spouseAquitWorkDate, this.spouseBquitWorkDate, this.spouseAmonthlyEarnings, this.spouseBmonthlyEarnings, Number(this.spouseAgovernmentPension), Number(this.spouseBgovernmentPension), Number(this.discountRate))
        }
    }
    this.normalCursor()
      //For testing performance
      let endTime = performance.now()
      let elapsed = (endTime - startTime) /1000
      this.statusMessage = ""
      console.log("Time elapsed: " + elapsed)
  }

  customDates() {
    this.getPrimaryFormInputs() //Use inputs to calculate ages, SSbirthdates, FRAs, etc.

    //Reset input benefit dates, then get from user input
    this.customSpouseAretirementBenefitDate = null
    this.customSpouseAspousalBenefitDate = null
    this.customSpouseBretirementBenefitDate = null
    this.customSpouseBspousalBenefitDate = null
    this.spouseBfixedRetirementBenefitDate = null
    this.customSpouseAretirementBenefitDate = new Date(this.customSpouseAretirementBenefitYear, this.customSpouseAretirementBenefitMonth-1, 1)
    this.customSpouseAspousalBenefitDate = new Date(this.customSpouseAspousalBenefitYear, this.customSpouseAspousalBenefitMonth-1, 1)
    this.customSpouseBretirementBenefitDate = new Date(this.customSpouseBretirementBenefitYear, this.customSpouseBretirementBenefitMonth-1, 1)
    this.customSpouseBspousalBenefitDate = new Date(this.customSpouseBspousalBenefitYear, this.customSpouseBspousalBenefitMonth-1, 1)
    this.spouseBfixedRetirementBenefitDate = new Date(this.spouseBfixedRetirementBenefitYear, this.spouseBfixedRetirementBenefitMonth-1, 1)

    //Check for errors in input dates
    this.customSpouseAretirementDateError = this.checkValidRetirementInputs(this.spouseAFRA, this.spouseASSbirthDate, this.spouseAactualBirthDate, this.customSpouseAretirementBenefitDate)
    this.customSpouseBretirementDateError = this.checkValidRetirementInputs(this.spouseBFRA, this.spouseBSSbirthDate, this.spouseBactualBirthDate, this.customSpouseBretirementBenefitDate)
    this.customSpouseAspousalDateError = this.checkValidSpousalInputs(this.spouseAFRA, this.spouseAactualBirthDate, this.spouseASSbirthDate, this.spouseBactualBirthDate, this.spouseBSSbirthDate, this.customSpouseAretirementBenefitDate, this.customSpouseAspousalBenefitDate, this.customSpouseBretirementBenefitDate)
    this.customSpouseBspousalDateError = this.checkValidSpousalInputs(this.spouseBFRA, this.spouseBactualBirthDate, this.spouseBSSbirthDate, this.spouseAactualBirthDate, this.spouseASSbirthDate, this.customSpouseBretirementBenefitDate, this.customSpouseBspousalBenefitDate, this.customSpouseAretirementBenefitDate)
    this.spouseBfixedRetirementDateError = this.checkValidRetirementInputs(this.spouseBFRA, this.spouseBSSbirthDate, this.spouseBactualBirthDate, this.spouseBfixedRetirementBenefitDate)


    //Get spousal benefit dates if there were no inputs from user (i.e. if spouseA won't actually file for a spousal benefit at any time, get the input that makes function run appropriately)
    if (this.spouseAPIA > 0.5 * this.spouseBPIA && this.spouseAactualBirthDate > this.deemedFilingCutoff) {
      //If married, spouseA spousal date is later of retirement dates
      if (this.maritalStatus == "married") {
        if (this.customSpouseAretirementBenefitDate > this.customSpouseBretirementBenefitDate) {
          this.customSpouseAspousalBenefitDate = new Date(this.customSpouseAretirementBenefitDate)
        } else {
          this.customSpouseAspousalBenefitDate = new Date(this.customSpouseBretirementBenefitDate)
          }
      }
      //If divorced, spouseA spousal date is spouseA retirementdate
      if (this.maritalStatus == "divorced"){
        this.customSpouseAspousalBenefitDate = new Date(this.customSpouseAretirementBenefitDate)
      }
      //eliminate spouseAspousalDateError, because user didn't even input anything
      this.customSpouseAspousalDateError = undefined
    }
    //Ditto, for spouseB
    if (this.spouseBPIA > 0.5 * this.spouseAPIA && this.spouseBactualBirthDate > this.deemedFilingCutoff) {
      //spouseB spousal date is later of retirement dates
      if (this.customSpouseAretirementBenefitDate > this.customSpouseBretirementBenefitDate) {
        this.customSpouseBspousalBenefitDate = new Date(this.customSpouseAretirementBenefitDate)
      } else {
        this.customSpouseBspousalBenefitDate = new Date(this.customSpouseBretirementBenefitDate)
        }
      //eliminate spouseAspousalDateError, because user didn't even input anything
      this.customSpouseBspousalDateError = undefined
    }
    
    //Calc PV with input dates
    if (this.maritalStatus == "single" && !this.customSpouseAretirementDateError) {
      this.customPV = this.presentvalueService.calculateSinglePersonPV(this.spouseAFRA, this.spouseASSbirthDate, Number(this.spouseAage), Number(this.spouseAPIA), this.customSpouseAretirementBenefitDate, this.spouseAquitWorkDate, this.spouseAmonthlyEarnings, this.spouseAmortalityTable, Number(this.discountRate))
      }
    if(this.maritalStatus == "married" && !this.customSpouseAretirementDateError && !this.customSpouseBretirementDateError && !this.customSpouseAspousalDateError && !this.customSpouseBspousalDateError) {
      this.customPV = this.presentvalueService.calculateCouplePV(this.maritalStatus, this.spouseAmortalityTable, this.spouseBmortalityTable, this.spouseASSbirthDate, this.spouseBSSbirthDate, Number(this.spouseAageRounded), Number(this.spouseBageRounded), this.spouseAFRA, this.spouseBFRA, this.spouseAsurvivorFRA, this.spouseBsurvivorFRA, Number(this.spouseAPIA), Number(this.spouseBPIA), this.customSpouseAretirementBenefitDate, this.customSpouseBretirementBenefitDate, this.customSpouseAspousalBenefitDate, this.customSpouseBspousalBenefitDate, this.spouseAquitWorkDate, this.spouseBquitWorkDate, this.spouseAmonthlyEarnings, this.spouseBmonthlyEarnings, Number(this.spouseAgovernmentPension), Number(this.spouseBgovernmentPension), Number(this.discountRate))
      }
    if(this.maritalStatus == "divorced" && !this.spouseBfixedRetirementDateError && !this.customSpouseAretirementDateError && !this.customSpouseAspousalDateError) {
      this.customPV = this.presentvalueService.calculateCouplePV(this.maritalStatus, this.spouseAmortalityTable, this.spouseBmortalityTable, this.spouseASSbirthDate, this.spouseBSSbirthDate, Number(this.spouseAageRounded), Number(this.spouseBageRounded), this.spouseAFRA, this.spouseBFRA, this.spouseAsurvivorFRA, this.spouseBsurvivorFRA, Number(this.spouseAPIA), Number(this.spouseBPIA), this.customSpouseAretirementBenefitDate, this.spouseBfixedRetirementBenefitDate, this.customSpouseAspousalBenefitDate, this.spouseBfixedRetirementBenefitDate, this.spouseAquitWorkDate, this.spouseBquitWorkDate, this.spouseAmonthlyEarnings, this.spouseBmonthlyEarnings, Number(this.spouseAgovernmentPension), Number(this.spouseBgovernmentPension), Number(this.discountRate) )
    }
    this.differenceInPV = this.solutionSet.solutionPV - this.customPV
  }

  //Use inputs to calculate ages, SSbirthdates, FRAs, etc.
  getPrimaryFormInputs() {
    this.spouseAactualBirthDate = new Date (this.spouseAinputYear, this.spouseAinputMonth-1, this.spouseAinputDay)
    this.spouseASSbirthDate = new Date(this.birthdayService.findSSbirthdate(this.spouseAinputMonth, this.spouseAinputDay, this.spouseAinputYear))
    this.spouseAFRA = new Date(this.birthdayService.findFRA(this.spouseASSbirthDate))
    this.spouseAsurvivorFRA = new Date(this.birthdayService.findSurvivorFRA(this.spouseASSbirthDate))
    this.spouseBactualBirthDate = new Date (this.spouseBinputYear, this.spouseBinputMonth-1, this.spouseBinputDay)
    this.spouseBSSbirthDate = new Date(this.birthdayService.findSSbirthdate(this.spouseBinputMonth, this.spouseBinputDay, this.spouseBinputYear))
    this.spouseBFRA = new Date(this.birthdayService.findFRA(this.spouseBSSbirthDate))
    this.spouseBsurvivorFRA = new Date(this.birthdayService.findSurvivorFRA(this.spouseBSSbirthDate))
    this.spouseAage =  ( this.today.getMonth() - this.spouseASSbirthDate.getMonth() + 12 * (this.today.getFullYear() - this.spouseASSbirthDate.getFullYear()) )/12
    this.spouseBage =  ( this.today.getMonth() - this.spouseBSSbirthDate.getMonth() + 12 * (this.today.getFullYear() - this.spouseBSSbirthDate.getFullYear()) )/12
    this.spouseAageRounded = Math.round(this.spouseAage)
    this.spouseBageRounded = Math.round(this.spouseBage)
    this.spouseAquitWorkDate = new Date(this.spouseAquitWorkYear, this.spouseAquitWorkMonth-1, 1)
    this.spouseBquitWorkDate = new Date(this.spouseBquitWorkYear, this.spouseBquitWorkMonth-1, 1)
    this.spouseAfixedRetirementBenefitDate = new Date(this.spouseAfixedRetirementBenefitYear, this.spouseAfixedRetirementBenefitMonth-1, 1)
    this.spouseBfixedRetirementBenefitDate = new Date(this.spouseBfixedRetirementBenefitYear, this.spouseBfixedRetirementBenefitMonth-1, 1)
    this.spouseAmortalityTable = this.mortalityService.determineMortalityTable(this.spouseAgender, this.spouseAmortalityInput, this.spouseAassumedDeathAge)
    this.spouseBmortalityTable = this.mortalityService.determineMortalityTable(this.spouseBgender, this.spouseBmortalityInput, this.spouseBassumedDeathAge)
  }

  checkValidRetirementInputs(FRA: Date, SSbirthDate: Date, actualBirthDate:Date, retirementBenefitDate:Date) {
    let error = undefined

    //Make sure there is an input
    if ( isNaN(retirementBenefitDate.getFullYear()) || isNaN(retirementBenefitDate.getMonth()) ) {
      error = "Please enter a date."
    }

    //Validation in case they try to start benefit earlier than possible or after 70
    let earliestDate: Date = new Date(SSbirthDate.getFullYear()+62, 1, 1)
    if (actualBirthDate.getDate() <= 2) {
      earliestDate.setMonth(actualBirthDate.getMonth())
    } else {
      earliestDate.setMonth(actualBirthDate.getMonth()+1)
    }
    if (retirementBenefitDate < earliestDate) {error = "Please enter a later date. You cannot file for retirement benefits before the first month in which you are 62 for the entire month."}
    let latestDate: Date = new Date (SSbirthDate.getFullYear()+70, SSbirthDate.getMonth(), 1)
    if (retirementBenefitDate > latestDate) {error = "Please enter an earlier date. You do not want to wait beyond age 70."}
    return error
  }


  checkValidSpousalInputs(FRA: Date, actualBirthDate:Date, SSbirthDate: Date, otherSpouseActualBirthDate:Date, otherSpouseSSbirthDate:Date, ownRetirementBenefitDate:Date, spousalBenefitDate:Date, otherSpouseRetirementBenefitDate:Date) {
    let error = undefined
    let secondStartDate:Date = new Date(1,1,1)
    //Make sure there is an input (Note that this will get overrode in the customDates function after the error check, in cases where there isn't supposed to be a user input)
    if ( isNaN(spousalBenefitDate.getFullYear()) || isNaN(spousalBenefitDate.getMonth()) ) {
      error = "Please enter a date."
    }

    //Deemed filing validation
    if (actualBirthDate < this.deemedFilingCutoff) {//old deemed filing rules apply: If spousalBenefitDate < FRA, it must be equal to ownRetirementBenefitDate
        if ( spousalBenefitDate < FRA && ( spousalBenefitDate.getMonth() !== ownRetirementBenefitDate.getMonth() || spousalBenefitDate.getFullYear() !== ownRetirementBenefitDate.getFullYear() ) )
        {
        error = "You can't file a restricted application (i.e., application for spousal-only) prior to your FRA."
        }
    }
    else {//new deemed filing rules apply
      //Married version: own spousalBenefitDate must equal later of own retirementBenefitDate or other spouse's retirementBenefitDate
        if(this.maritalStatus == "married") {
          if (ownRetirementBenefitDate < otherSpouseRetirementBenefitDate) {
            secondStartDate.setFullYear(otherSpouseRetirementBenefitDate.getFullYear())
            secondStartDate.setMonth(otherSpouseRetirementBenefitDate.getMonth())
          }
          else {
            secondStartDate.setFullYear(ownRetirementBenefitDate.getFullYear())
            secondStartDate.setMonth(ownRetirementBenefitDate.getMonth())
          }
          if ( spousalBenefitDate.getMonth() !== secondStartDate.getMonth() || spousalBenefitDate.getFullYear() !== secondStartDate.getFullYear() ) {
          error = "Per new deemed filing rules, your spousal benefit date must be the later of your retirement benefit date, or your spouse's retirement benefit date."
          }
        }
      //Divorced version: own spousalBenefitDate must equal later of own retirementBenefitDate or other spouse's age62 date
        if(this.maritalStatus == "divorced") {
          let exSpouse62Date = new Date(otherSpouseSSbirthDate.getFullYear()+62, 1, 1)
          if (otherSpouseActualBirthDate.getDate() <= 2){
            exSpouse62Date.setMonth(otherSpouseActualBirthDate.getMonth())
          } else {
            exSpouse62Date.setMonth(otherSpouseActualBirthDate.getMonth()+1)
          }
          if (ownRetirementBenefitDate < exSpouse62Date) {
            secondStartDate.setFullYear(exSpouse62Date.getFullYear())
            secondStartDate.setMonth(exSpouse62Date.getMonth())
          }
          else {
            secondStartDate.setFullYear(ownRetirementBenefitDate.getFullYear())
            secondStartDate.setMonth(ownRetirementBenefitDate.getMonth())
          }
          if ( spousalBenefitDate.getMonth() !== secondStartDate.getMonth() || spousalBenefitDate.getFullYear() !== secondStartDate.getFullYear() ) {
          error = "Per new deemed filing rules, your spousal benefit date must be the later of your retirement benefit date, or the first month in which your ex-spouse is 62 for the entire month."
          }
        }
    }

    //Validation in case they try to start benefit earlier than possible.
    let earliestDate: Date = new Date(SSbirthDate.getFullYear()+62, 1, 1)
    if (actualBirthDate.getDate() <= 2) {
      earliestDate.setMonth(actualBirthDate.getMonth())
    } else {
      earliestDate.setMonth(actualBirthDate.getMonth()+1)
    }
    if (spousalBenefitDate < earliestDate) {error = "Please enter a later date. You cannot file for spousal benefits before the first month in which you are 62 for the entire month."}

    //Validation in case they try to start spousal benefit before other spouse's retirement benefit.
    if (spousalBenefitDate < otherSpouseRetirementBenefitDate && this.maritalStatus == "married") {error = "You cannot start your spousal benefit before your spouse has filed for his/her own retirement benefit."}

    return error
  }

  waitCursor() {
    document.getElementById("container").style.cursor = "wait";
    document.getElementById("maximizeSubmit").style.cursor = "wait";
    this.statusMessage = "Calculating the optimal strategy..."
  }

  normalCursor(){
    document.getElementById("container").style.cursor = "default";
    document.getElementById("maximizeSubmit").style.cursor = "default";
  }

  resetWorkInputs() {
    if (this.spouseAworking === false) {
      this.spouseAmonthlyEarnings = 0
      this.spouseAquitWorkMonth = null
      this.spouseAquitWorkYear = null
    }
    if (this.spouseBworking === false) {
      this.spouseBmonthlyEarnings = 0
      this.spouseBquitWorkMonth = null
      this.spouseBquitWorkYear = null
    }
  }

resetFixedRetirementDateInputs(){
  if (this.spouseAhasFiled === false) {
    this.spouseAfixedRetirementBenefitMonth = null
    this.spouseAfixedRetirementBenefitYear = null
    this.spouseAfixedRetirementBenefitDate = null
  }
  if (this.spouseBhasFiled === false) {
    this.spouseBfixedRetirementBenefitMonth = null
    this.spouseBfixedRetirementBenefitYear = null
    this.spouseBfixedRetirementBenefitDate = null
  }
}

}
