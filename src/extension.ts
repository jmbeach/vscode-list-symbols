import * as vscode from 'vscode';
import SymbolKinds from './SymbolKinds';

function processNodes(symbols: vscode.DocumentSymbol[], depth: number): string {
  let result = '';
  for (const symbol of symbols) {
    const tabs = [...new Array(depth)].reduce((a, b) => a + '\t', '');
    result += `${tabs}${SymbolKinds[symbol.kind]} ${symbol.name}\n`;
    if (symbol.children) {
      result += processNodes(symbol.children, depth + 1);
    }
  }

  return result;
}

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.listSymbols', () => {
    if (!vscode.window.activeTextEditor) {
      vscode.window.showWarningMessage('There must be an active text editor');
      return;
    }

    (vscode.commands.executeCommand('vscode.executeDocumentSymbolProvider', vscode.Uri.file(vscode.window.activeTextEditor.document.fileName)) as Thenable<vscode.DocumentSymbol[]>)
      .then((symbols: vscode.DocumentSymbol[]) => {
        const text = processNodes(symbols, 0);
        vscode.workspace.openTextDocument({ content: text }).then(doc => {
          vscode.window.showTextDocument(doc);
        });
      });
	});

	context.subscriptions.push(disposable);
}
