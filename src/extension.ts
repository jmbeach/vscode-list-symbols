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

const getRelativeFilePath = (uri: vscode.Uri) => {
  const workspacePath = vscode.workspace.getWorkspaceFolder(uri)?.uri.path as string;
  let folderPath = uri.path.replace(workspacePath, '');
  if (folderPath.indexOf('/') === 0) {
    folderPath = folderPath.substring(1);
  }
  return folderPath;
};

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.listSymbols', () => {
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
	}));

  context.subscriptions.push(vscode.commands.registerCommand('extension.listAllSymbolsInFolder', (fileMeta) => {
    const folderPath = getRelativeFilePath(fileMeta);

    // TODO: Make a config so that users can choose to exclude files with a glob
    vscode.workspace.findFiles(`${folderPath}/**`, undefined, undefined).then(uris => {
      const promises = [];
      for (const uri of uris) {
        const p = new Promise<{ symbols: vscode.DocumentSymbol[], fileUri: vscode.Uri}>((resolve) => {
          (vscode.commands.executeCommand('vscode.executeDocumentSymbolProvider', uri) as Thenable<vscode.DocumentSymbol[]>).then(symbols => {
            resolve({
              fileUri: uri,
              symbols
            });
          });
        });
        promises.push(p);
      }
      Promise.all(promises).then(allSymbols => {
        let fullText = '';
        for (const fileSymbols of allSymbols) {
          fullText += `${getRelativeFilePath(fileSymbols.fileUri)}\n---\n`;
          fullText += processNodes(fileSymbols.symbols, 0);
          fullText += '\n';
        }

        vscode.workspace.openTextDocument({ content: fullText }).then(doc => {
          vscode.window.showTextDocument(doc);
        });
      });
    });
  }));
}
