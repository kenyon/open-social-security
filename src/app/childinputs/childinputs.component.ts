import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../data model classes/person';
import { BirthdayService } from '../birthday.service';

@Component({
  selector: 'app-childinputs',
  templateUrl: './childinputs.component.html',
  styleUrls: ['./childinputs.component.css']
})
export class ChildinputsComponent implements OnInit {

  constructor(private birthdayService:BirthdayService) { }

  ngOnInit() {
  }

  @Input() child: Person
  @Output() childChange: EventEmitter<Person> = new EventEmitter<Person>()

  inputMonths: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  inputDays: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
              16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  inputYears = [
              1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959,
              1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969,
              1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
              1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
              1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
              2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
              2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]

  DoBinputMonth:number
  DoBinputDay:number
  DoBinputYear:number

  getInputs(){
    this.child.actualBirthDate = new Date (this.DoBinputYear, this.DoBinputMonth-1, this.DoBinputDay)
    this.child.SSbirthDate = this.birthdayService.findSSbirthdate(this.DoBinputMonth, this.DoBinputDay, this.DoBinputYear)
    this.childChange.emit(this.child)
  }



}