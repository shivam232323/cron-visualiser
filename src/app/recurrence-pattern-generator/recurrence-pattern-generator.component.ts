import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recurrence-pattern-generator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recurrence-pattern-generator.component.html',
  styleUrls: ['./recurrence-pattern-generator.component.css']
})
export class RecurrencePatternGeneratorComponent {
  // Add this line to expose Object to the template
  Object = Object;
  
  weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  pattern: string = 'daily';
  time: string = '12:00';
  date: string = '1';
  selectedDays: { [key: string]: boolean } = {
    monday: false, tuesday: false, wednesday: false,
    thursday: false, friday: false, saturday: false, sunday: false
  };
  description: string = '';

  ngOnInit() {
    this.generateDescription();
  }

  onPatternChange(value: string) {
    this.pattern = value;
    // Reset selections when pattern changes
    if (value === 'weekly') {
      this.selectedDays = {
        monday: false, tuesday: false, wednesday: false,
        thursday: false, friday: false, saturday: false, sunday: false
      };
    }
    this.generateDescription();
  }

  onTimeChange(value: string) {
    this.time = value;
    this.generateDescription();
  }

  toggleDay(day: string) {
    this.selectedDays[day] = !this.selectedDays[day];
    this.generateDescription();
  }

  onDateChange(value: string) {
    this.date = value;
    this.generateDescription();
  }

  generateDescription(): void {
    const time = this.time || '00:00';
    switch (this.pattern) {
      case 'daily':
        this.description = `Runs every day at ${time}.`;
        break;
      case 'weekly': {
        const days = Object.entries(this.selectedDays)
          .filter(([_, selected]) => selected)
          .map(([day]) => this.capitalize(day));
        this.description = days.length
          ? `Runs every week on ${days.join(', ')} at ${time}.`
          : `Runs every week at ${time}.`;
        break;
      }
      case 'monthly': {
        const dateNum = parseInt(this.date, 10) || 1;
        const suffix = this.ordinalSuffix(dateNum);
        this.description = `Runs every month on the ${dateNum}${suffix} day at ${time}.`;
        break;
      }
      default:
        this.description = '';
    }
  }

  getDaysKeys() { // Returns the keys of selectedDays for iteration in the template
    return Object.keys(this.selectedDays);
  }

  capitalize(day: string): string {      // Capitalizes the first letter of the day
    return day.charAt(0).toUpperCase() + day.slice(1);
  }
  ordinalSuffix(day: number): string {   // Returns the ordinal suffix for a given day number
    const lastDigit = day % 10;
    const lastTwoDigits = day % 100;
    if (lastDigit === 1 && lastTwoDigits !== 11) return 'st';
    if (lastDigit === 2 && lastTwoDigits !== 12) return 'nd';
    if (lastDigit === 3 && lastTwoDigits !== 13) return 'rd';
    return 'th';
  }

  }

 


