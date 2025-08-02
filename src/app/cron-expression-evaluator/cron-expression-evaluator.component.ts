import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cron-expression-evaluator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cron-expression-evaluator.component.html',
  styleUrls: ['./cron-expression-evaluator.component.css']
})
export class CronExpressionEvaluatorComponent {
  cronExpression: string = '';
  cronFields = { seconds: '*', minutes: '*', hours: '*', days: '*', month: '*', dayOfWeek: '*' };
  activeFields = { seconds: false, minutes: false, hours: false, days: false, month: false, dayOfWeek: false };



  // Called when cron expression input changes
  onCronChange(value: string | Event) {
    let expr = '';
    if (typeof value === 'string') {
      expr = value;
    } else if (value && 'target' in value && (value.target as HTMLInputElement).value !== undefined) {
      expr = (value.target as HTMLInputElement).value;
    }
    this.cronExpression = expr;
    this.getValidExpression(expr);
  }

  // Parses the cron expression and updates fields and activeness
  getValidExpression(expr: string): void {
    // It will split the expression by spaces, trim each part, and filter out empty parts
    const parts = expr.split(' ').map(part => part.trim()).filter(part => part.length > 0);

    // If not exactly 6 parts, reset to defaults
    if (parts.length !== 6) {
      this.setInvalidExpression();
      return;
    }

    const [seconds, minutes, hours, days, month, dayOfWeek] = parts;

    this.cronFields = { seconds, minutes, hours, days, month, dayOfWeek };
    this.activeFields = {
      seconds: seconds !== '*',
      minutes: minutes !== '*',
      hours: hours !== '*',
      days: days !== '*',
      month: month !== '*',
      dayOfWeek: dayOfWeek !== '*'
    };
  }

  setInvalidExpression(): void {
    this.cronFields = { seconds: '*', minutes: '*', hours: '*', days: '*', month: '*', dayOfWeek: '*' };
    this.activeFields = { seconds: false, minutes: false, hours: false, days: false, month: false, dayOfWeek: false };
  }
}
