# Angular 14 App <img src="logo.png" alt="drawing" width="200"/>


This is an exercice project to create a conversion currency app with Angular 14. 

## Get started

### Clone the repo

```shell
git clone https://github.com/nourmay/currency-exercice.git 
```

### Install npm packages

Install the `npm` packages described in the `package.json`

```shell
npm install
```

### How To Run

Run `npm run start` for a dev server.

Navigate to `http://localhost:4200/`.

The browser will automatically reload if you change any of the source files.

Shut it down manually with `Ctrl-C`.


## One Main Views page

This app contains one component that updates the exchange rate every three seconds and displays euro and usd values. You can specify your own exchange rate on condition that the provided value won't be more/less than 2% from the original exchange rate.
You can also switch the conversion between euro and usd.

