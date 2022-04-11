# List Symbols [![Visual Studio Marketplace Installs - Azure DevOps Extension](https://img.shields.io/visual-studio-marketplace/azure-devops/installs/total/jmbeach.list-symbols)](https://marketplace.visualstudio.com/items?itemName=jmbeach.list-symbols) [![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/jmbeach.list-symbols)](https://marketplace.visualstudio.com/items?itemName=jmbeach.list-symbols)

![List Symbols Icon](src/assets/icon.png)

This extension will list all symbols in a code file as plain text using vscode's built-in symbol processing capabilities.

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

## List All Symbols in Folder

Also, you can right click a folder and select `List All Symbols in Folder` to get a combined output of all of the files in that folder.
