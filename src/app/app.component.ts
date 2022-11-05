import { Component, OnDestroy } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'Convertisseur';
  // no need to specify initilized variable type's, TS will automatically  detect it
  private readonly intervalDelay = 3000; // set the variable accorfing to your delay of changing value
  intervallSource = interval(this.intervalDelay);

  // numbers
  exchangeRate = 1.1;
  forcedExchangeRateValue = 1;
  euroValue = 1;
  usdValue = 1;

  // booleans
  forcedExchangeRateEnabled = false;
  fromEuroToDollar = true;

  destroy$ = new Subject();

  constructor() {
    // we can either execute this code in the contsructor or ngOnInit
    //  we chose contructor since it's executed first
    this.intervallSource.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // applied rule here: Math.random() * (max - min) + min;
      this.exchangeRate = parseFloat(
        (this.exchangeRate + Math.random() * 0.1 - 0.05).toFixed(2)
      );
      this.updateValues();
    });
  }

  /**
  * this function update the euro and usd
    value according to the exchange rate
*/
  updateValues(): void {
    const appliedRate = this.forcedRateAcceptable()
      ? this.forcedExchangeRateValue
      : this.exchangeRate;
    if (this.fromEuroToDollar) {
      this.usdValue = parseFloat((this.euroValue * appliedRate).toFixed(2));
    } else {
      this.euroValue = parseFloat((this.usdValue / appliedRate).toFixed(2));
    }
  }
  /**
  * this function checks if the forced rate value
    entered by  user can be used to update values
*/
  forcedRateAcceptable(): boolean {
    // we will check if the entred value is bigger than the exchange rate
    // then we will return whether the difference between them is more than 2% or not
    if (this.forcedExchangeRateValue > this.exchangeRate) {
      return (
        this.forcedExchangeRateValue - this.exchangeRate <=
        (this.exchangeRate * 2) / 100
      );
    } else {
      return (
        this.exchangeRate - this.forcedExchangeRateValue <=
        (this.exchangeRate * 2) / 100
      );
    }
  }
  onSwitchClick(): void {
    this.fromEuroToDollar = !this.fromEuroToDollar;
    this.fromEuroToDollar
      ? (this.euroValue = this.usdValue)
      : (this.usdValue = this.euroValue);

    this.updateValues();
  }
  /**
  * this function enables and disables the use of the value  
    entered by user and call the update value
*/
  forceExchangeRate(): void {
    this.forcedExchangeRateEnabled = !this.forcedExchangeRateEnabled;
    this.forcedExchangeRateEnabled && this.updateValues();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
