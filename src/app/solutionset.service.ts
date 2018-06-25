import { Injectable } from '@angular/core';
import {BenefitService} from './benefit.service'
import {SolutionSet} from './solutionset'
import {claimingSolution} from './claimingsolution';

@Injectable({
  providedIn: 'root'
})
export class SolutionSetService {

  constructor(private benefitService: BenefitService) { }

  generateSingleSolutionSet(maritalStatus: string, SSbirthDate:Date, FRA:Date, PIA:number, savedPV:number, savedClaimingDate:Date){
        //Find age and monthly benefit amount at savedClaimingDate, for sake of output statement.
        let savedClaimingAge: number = savedClaimingDate.getFullYear() - SSbirthDate.getFullYear() + (savedClaimingDate.getMonth() - SSbirthDate.getMonth())/12
        let savedClaimingAgeYears: number = Math.floor(savedClaimingAge)
        let savedClaimingAgeMonths: number = Math.round((savedClaimingAge%1)*12)
        let savedRetirementBenefit: number = this.benefitService.calculateRetirementBenefit(PIA, FRA, savedClaimingDate)

        //Create "solutionSet" object and claimingSolution object to populate it
        let solutionSet:SolutionSet = {
          "solutionPV":savedPV,
          "solutionsArray": []
        }
        let retirementSolution = new claimingSolution(maritalStatus, "retirementAlone", "spouseA", savedClaimingDate, savedRetirementBenefit, savedClaimingAgeYears, savedClaimingAgeMonths)
        solutionSet.solutionsArray.push(retirementSolution)
        return solutionSet
  }

  generateCoupleSolutionSet(maritalStatus:string, spouseASSbirthDate: Date, spouseBSSbirthDate: Date, spouseAFRA: Date, spouseBFRA: Date,
    spouseAPIA: number, spouseBPIA: number, spouseAsavedRetirementDate: Date, spouseBsavedRetirementDate: Date, spouseAsavedSpousalDate: Date, spouseBsavedSpousalDate: Date, savedPV: number,
    spouseAgovernmentPension: number, spouseBgovernmentPension:number){
        //Find monthly benefit amounts and ages at saved claiming dates, for sake of output statement.
        //spouseA retirement stuff
        let spouseAsavedRetirementBenefit: number = this.benefitService.calculateRetirementBenefit(spouseAPIA, spouseAFRA, spouseAsavedRetirementDate)
        let spouseAsavedRetirementAge: number = spouseAsavedRetirementDate.getFullYear() - spouseASSbirthDate.getFullYear() + (spouseAsavedRetirementDate.getMonth() - spouseASSbirthDate.getMonth())/12
        let spouseAsavedRetirementAgeYears: number = Math.floor(spouseAsavedRetirementAge)
        let spouseAsavedRetirementAgeMonths: number = Math.round((spouseAsavedRetirementAge%1)*12)
        //spouseB retirement stuff
        let spouseBsavedRetirementBenefit: number = this.benefitService.calculateRetirementBenefit(spouseBPIA, spouseBFRA, spouseBsavedRetirementDate)
        let spouseBsavedRetirementAge: number = spouseBsavedRetirementDate.getFullYear() - spouseBSSbirthDate.getFullYear() + (spouseBsavedRetirementDate.getMonth() - spouseBSSbirthDate.getMonth())/12
        let spouseBsavedRetirementAgeYears: number = Math.floor(spouseBsavedRetirementAge)
        let spouseBsavedRetirementAgeMonths: number = Math.round((spouseBsavedRetirementAge%1)*12)
        //spouseA spousal stuff
        let spouseAsavedSpousalBenefit: number = this.benefitService.calculateSpousalBenefit(spouseAPIA, spouseBPIA, spouseAFRA, spouseAsavedRetirementBenefit, spouseAsavedSpousalDate, spouseAgovernmentPension)
          if (spouseAsavedSpousalBenefit == 0 && spouseAsavedSpousalDate < spouseAsavedRetirementDate) {//In case of restricted application, recalculate spousal benefit with zero as retirement benefit amount
            spouseAsavedSpousalBenefit = this.benefitService.calculateSpousalBenefit(spouseAPIA, spouseBPIA, spouseAFRA, 0, spouseAsavedSpousalDate, spouseAgovernmentPension)
          }
        let spouseAsavedSpousalAge: number = spouseAsavedSpousalDate.getFullYear() - spouseASSbirthDate.getFullYear() + (spouseAsavedSpousalDate.getMonth() - spouseASSbirthDate.getMonth())/12
        let spouseAsavedSpousalAgeYears: number = Math.floor(spouseAsavedSpousalAge)
        let spouseAsavedSpousalAgeMonths: number = Math.round((spouseAsavedSpousalAge%1)*12)
        //spouseB spousal stuff
        let spouseBsavedSpousalBenefit: number = this.benefitService.calculateSpousalBenefit(spouseBPIA, spouseAPIA, spouseBFRA, spouseBsavedRetirementBenefit, spouseBsavedSpousalDate, spouseBgovernmentPension)
        if (spouseBsavedSpousalBenefit == 0 && spouseBsavedSpousalDate < spouseBsavedRetirementDate) {//In case of restricted application, recalculate spousal benefit with zero as retirement benefit amount
          spouseBsavedSpousalBenefit = this.benefitService.calculateSpousalBenefit(spouseBPIA, spouseAPIA, spouseBFRA, 0, spouseBsavedSpousalDate, spouseBgovernmentPension)
        }
        let spouseBsavedSpousalAge: number = spouseBsavedSpousalDate.getFullYear() - spouseBSSbirthDate.getFullYear() + (spouseBsavedSpousalDate.getMonth() - spouseBSSbirthDate.getMonth())/12
        let spouseBsavedSpousalAgeYears: number = Math.floor(spouseBsavedSpousalAge)
        let spouseBsavedSpousalAgeMonths: number = Math.round((spouseBsavedSpousalAge%1)*12)
        //spouseA survivor stuff
        if (spouseAsavedRetirementBenefit >= spouseBsavedRetirementBenefit) {
          var spouseAsavedSurvivorBenefitOutput: number = 0
        } else {
          var spouseAsavedSurvivorBenefitOutput: number = spouseBsavedRetirementBenefit
        }
        //spouseB survivor stuff
        if (spouseBsavedRetirementBenefit >= spouseAsavedRetirementBenefit) {
          var spouseBsavedSurvivorBenefitOutput: number = 0
        } else {
          var spouseBsavedSurvivorBenefitOutput: number = spouseAsavedRetirementBenefit
        }

        let solutionSet: SolutionSet = {
          "solutionPV":savedPV,
          solutionsArray: []
        }
        //Determine claimingSolution objects
        if (spouseAsavedRetirementDate > spouseAsavedSpousalDate) {
          var spouseAretirementSolution = new claimingSolution(maritalStatus, "retirementReplacingSpousal", "spouseA", spouseAsavedRetirementDate, spouseAsavedRetirementBenefit, spouseAsavedRetirementAgeYears, spouseAsavedRetirementAgeMonths)
        } else {
          var spouseAretirementSolution = new claimingSolution(maritalStatus, "retirementAlone", "spouseA", spouseAsavedRetirementDate, spouseAsavedRetirementBenefit, spouseAsavedRetirementAgeYears, spouseAsavedRetirementAgeMonths)
        }
        if (spouseBsavedRetirementDate > spouseBsavedSpousalDate) {
          var spouseBretirementSolution = new claimingSolution(maritalStatus, "retirementReplacingSpousal", "spouseB", spouseBsavedRetirementDate, spouseBsavedRetirementBenefit, spouseBsavedRetirementAgeYears, spouseBsavedRetirementAgeMonths)
        } else {
          var spouseBretirementSolution = new claimingSolution(maritalStatus, "retirementAlone", "spouseB", spouseBsavedRetirementDate, spouseBsavedRetirementBenefit, spouseBsavedRetirementAgeYears, spouseBsavedRetirementAgeMonths)
        }
        if (spouseAsavedSpousalDate < spouseAsavedRetirementDate) {
          var spouseAspousalSolution = new claimingSolution(maritalStatus, "spousalAlone", "spouseA", spouseAsavedSpousalDate, spouseAsavedSpousalBenefit, spouseAsavedSpousalAgeYears, spouseAsavedSpousalAgeMonths)
        } else {
          var spouseAspousalSolution = new claimingSolution(maritalStatus, "spousalWithRetirement", "spouseA", spouseAsavedSpousalDate, spouseAsavedSpousalBenefit, spouseAsavedSpousalAgeYears, spouseAsavedSpousalAgeMonths)
        }
        if (spouseBsavedSpousalDate < spouseBsavedRetirementDate) {
          var spouseBspousalSolution = new claimingSolution(maritalStatus, "spousalAlone", "spouseB", spouseBsavedSpousalDate, spouseBsavedSpousalBenefit, spouseBsavedSpousalAgeYears, spouseBsavedSpousalAgeMonths)
        } else {
          var spouseBspousalSolution = new claimingSolution(maritalStatus, "spousalWithRetirement", "spouseB", spouseBsavedSpousalDate, spouseBsavedSpousalBenefit, spouseBsavedSpousalAgeYears, spouseBsavedSpousalAgeMonths)
        }
        var spouseAsurvivorSolution = new claimingSolution(maritalStatus, "survivor", "spouseA", new Date(9999,0,1), spouseAsavedSurvivorBenefitOutput, 0, 0) //Date isn't output, but we want it last in array. Ages aren't output
        var spouseBsurvivorSolution = new claimingSolution(maritalStatus, "survivor", "spouseB", new Date(9999,0,1), spouseBsavedSurvivorBenefitOutput, 0, 0) //Date isn't output, but we want it last in array. Ages aren't output


        //Push claimingSolution objects to solutionSet.solutionsArray (But don't push them if the benefit amount is zero.)
        if (spouseAsavedRetirementBenefit > 0) {solutionSet.solutionsArray.push(spouseAretirementSolution)}
        if (spouseBsavedRetirementBenefit > 0) {solutionSet.solutionsArray.push(spouseBretirementSolution)}
        if (spouseAsavedSpousalBenefit > 0) {solutionSet.solutionsArray.push(spouseAspousalSolution)}
        if (spouseBsavedSpousalBenefit > 0) {solutionSet.solutionsArray.push(spouseBspousalSolution)}
        if (spouseAsavedSurvivorBenefitOutput > 0) {solutionSet.solutionsArray.push(spouseAsurvivorSolution)}
        if (spouseBsavedSurvivorBenefitOutput > 0) {solutionSet.solutionsArray.push(spouseBsurvivorSolution)}
    
        //Sort array by date
        solutionSet.solutionsArray.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return a.date.getTime() - b.date.getTime()
        })
        return solutionSet
  }

  generateCoupleOneHasFiledSolutionSet(maritalStatus:string, spouseAhasFiled:boolean, spouseBhasFiled:boolean, flexibleSpousePIA:number, fixedSpousePIA:number, flexibleSpouseSSbirthDate:Date,
    flexibleSpouseFRA:Date, fixedSpouseFRA:Date, flexibleSpouseGovernmentPension:number, flexibleSpouseSavedRetirementDate:Date, flexibleSpouseSavedSpousalDate:Date, fixedSpouseRetirementBenefitDate:Date, savedPV:number){
        let fixedSpouseRetirementBenefit: number = this.benefitService.calculateRetirementBenefit(Number(fixedSpousePIA), fixedSpouseFRA, fixedSpouseRetirementBenefitDate)
        //flexible spouse retirement age/benefitAmount
        let flexibleSpouseSavedRetirementBenefit: number = this.benefitService.calculateRetirementBenefit(flexibleSpousePIA, flexibleSpouseFRA, flexibleSpouseSavedRetirementDate)
        let flexibleSpouseSavedRetirementAge: number = flexibleSpouseSavedRetirementDate.getFullYear() - flexibleSpouseSSbirthDate.getFullYear() + (flexibleSpouseSavedRetirementDate.getMonth() - flexibleSpouseSSbirthDate.getMonth())/12
        let flexibleSpouseSavedRetirementAgeYears: number = Math.floor(flexibleSpouseSavedRetirementAge)
        let flexibleSpouseSavedRetirementAgeMonths: number = Math.round((flexibleSpouseSavedRetirementAge%1)*12)
        //flexible spouse spousal age/benefitAmount
        let flexibleSpouseSavedSpousalBenefit: number = this.benefitService.calculateSpousalBenefit(flexibleSpousePIA, fixedSpousePIA, flexibleSpouseFRA, flexibleSpouseSavedRetirementBenefit, flexibleSpouseSavedSpousalDate, flexibleSpouseGovernmentPension)
        if (flexibleSpouseSavedSpousalBenefit == 0 && flexibleSpouseSavedSpousalDate < flexibleSpouseSavedRetirementDate) {//In case of restricted application, recalculate spousal benefit with zero as retirement benefit amount
          flexibleSpouseSavedSpousalBenefit = this.benefitService.calculateSpousalBenefit(flexibleSpousePIA, fixedSpousePIA, flexibleSpouseFRA, 0, flexibleSpouseSavedSpousalDate, flexibleSpouseGovernmentPension)
        }
        let flexibleSpouseSavedSpousalAge: number = flexibleSpouseSavedSpousalDate.getFullYear() - flexibleSpouseSSbirthDate.getFullYear() + (flexibleSpouseSavedSpousalDate.getMonth() - flexibleSpouseSSbirthDate.getMonth())/12
        let flexibleSpouseSavedSpousalAgeYears: number = Math.floor(flexibleSpouseSavedSpousalAge)
        let flexibleSpouseSavedSpousalAgeMonths: number = Math.round((flexibleSpouseSavedSpousalAge%1)*12)
        //flexible spouse survivor
        if (flexibleSpouseSavedRetirementBenefit >= fixedSpouseRetirementBenefit) {
          var flexibleSpouseSavedSurvivorBenefitOutput: number = 0
        } else {
          var flexibleSpouseSavedSurvivorBenefitOutput: number = fixedSpouseRetirementBenefit
        }
 
        let solutionSet: SolutionSet = {
          "solutionPV":savedPV,
          solutionsArray: []
        }

        if (maritalStatus == "divorced" || spouseBhasFiled === true){//i.e., if "flexibleSpouse" is spouseA
            if (flexibleSpouseSavedRetirementDate > flexibleSpouseSavedSpousalDate) {
              var flexibleSpouseRetirementSolution = new claimingSolution(maritalStatus, "retirementReplacingSpousal", "spouseA", flexibleSpouseSavedRetirementDate, flexibleSpouseSavedRetirementBenefit, flexibleSpouseSavedRetirementAgeYears, flexibleSpouseSavedRetirementAgeMonths)
            } else {
              var flexibleSpouseRetirementSolution = new claimingSolution(maritalStatus, "retirementAlone", "spouseA", flexibleSpouseSavedRetirementDate, flexibleSpouseSavedRetirementBenefit, flexibleSpouseSavedRetirementAgeYears, flexibleSpouseSavedRetirementAgeMonths)
            }
            if (flexibleSpouseSavedSpousalDate < flexibleSpouseSavedRetirementDate) {
              var flexibleSpouseSpousalSolution = new claimingSolution(maritalStatus, "spousalAlone", "spouseA", flexibleSpouseSavedSpousalDate, flexibleSpouseSavedSpousalBenefit, flexibleSpouseSavedSpousalAgeYears, flexibleSpouseSavedSpousalAgeMonths)
            } else {
              var flexibleSpouseSpousalSolution = new claimingSolution(maritalStatus, "spousalWithRetirement", "spouseA", flexibleSpouseSavedSpousalDate, flexibleSpouseSavedSpousalBenefit, flexibleSpouseSavedSpousalAgeYears, flexibleSpouseSavedSpousalAgeMonths)
            }
            var flexibleSpouseSurvivorSolution = new claimingSolution(maritalStatus, "survivor", "spouseA", new Date(9999,0,1), flexibleSpouseSavedSurvivorBenefitOutput, 0, 0) //Date isn't output, but we want it last in array. Ages aren't output
        } else if (spouseAhasFiled === true) {//i.e., if "flexibleSpouse" is spouseB
            if (flexibleSpouseSavedRetirementDate > flexibleSpouseSavedSpousalDate) {
              var flexibleSpouseRetirementSolution = new claimingSolution(maritalStatus, "retirementReplacingSpousal", "spouseB", flexibleSpouseSavedRetirementDate, flexibleSpouseSavedRetirementBenefit, flexibleSpouseSavedRetirementAgeYears, flexibleSpouseSavedRetirementAgeMonths)
            } else {
              var flexibleSpouseRetirementSolution = new claimingSolution(maritalStatus, "retirementAlone", "spouseB", flexibleSpouseSavedRetirementDate, flexibleSpouseSavedRetirementBenefit, flexibleSpouseSavedRetirementAgeYears, flexibleSpouseSavedRetirementAgeMonths)
            }
            if (flexibleSpouseSavedSpousalDate < flexibleSpouseSavedRetirementDate) {
              var flexibleSpouseSpousalSolution = new claimingSolution(maritalStatus, "spousalAlone", "spouseB", flexibleSpouseSavedSpousalDate, flexibleSpouseSavedSpousalBenefit, flexibleSpouseSavedSpousalAgeYears, flexibleSpouseSavedSpousalAgeMonths)
            } else {
              var flexibleSpouseSpousalSolution = new claimingSolution(maritalStatus, "spousalWithRetirement", "spouseB", flexibleSpouseSavedSpousalDate, flexibleSpouseSavedSpousalBenefit, flexibleSpouseSavedSpousalAgeYears, flexibleSpouseSavedSpousalAgeMonths)
            }
            var flexibleSpouseSurvivorSolution = new claimingSolution(maritalStatus, "survivor", "spouseB", new Date(9999,0,1), flexibleSpouseSavedSurvivorBenefitOutput, 0, 0) //Date isn't output, but we want it last in array. Ages aren't output
        }
        //push claimingSolution objects to array
        if (flexibleSpouseSavedRetirementBenefit > 0) {solutionSet.solutionsArray.push(flexibleSpouseRetirementSolution)}
        if (flexibleSpouseSavedSpousalBenefit > 0) {solutionSet.solutionsArray.push(flexibleSpouseSpousalSolution)}
        if (flexibleSpouseSavedSurvivorBenefitOutput > 0) {solutionSet.solutionsArray.push(flexibleSpouseSurvivorSolution)}


        //Sort array by date
        solutionSet.solutionsArray.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return a.date.getTime() - b.date.getTime()
        })
        return solutionSet
  }

}