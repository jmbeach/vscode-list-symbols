# List Symbols

This extension will list all symbols in a code file as plain text using vscode's built-in symbol processing capabilites.

Simply run `ctrl + shift + p` -> `List Symbols`

![Example usage](./demo.png)

and you will get output like the following in a new tab (Based on [this example code](https://github.com/WebDevSimplified/Vanilla-JavaScript-Calculator)):

```
class Calculator
	constructor constructor
	method appendNumber
	method chooseOperation
	method clear
	method compute
		variable computation
		variable current
		variable prev
	method delete
	method getDisplayNumber
		variable decimalDigits
		variable integerDigits
		variable integerDisplay
		property maximumFractionDigits
		variable stringNumber
	method updateDisplay
  ```