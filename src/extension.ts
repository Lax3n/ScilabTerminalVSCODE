import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let scilabStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    scilabStatusBarItem.command = "extension.runScilabScript";
    scilabStatusBarItem.text = `$(play) Run Scilab`;
    scilabStatusBarItem.tooltip = "Run Scilab Script";
    scilabStatusBarItem.show();
    context.subscriptions.push(scilabStatusBarItem);

    let disposable = vscode.commands.registerCommand('extension.runScilabScript', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No Scilab script is open');
            return;
        }
        const scilabPath = vscode.workspace.getConfiguration('scilabIntegration').get('scilabPath') || 'scilab';
        const scriptPath = editor.document.fileName;
        const terminal = vscode.window.createTerminal(`Scilab`);
        terminal.sendText(`${scilabPath} -e exec("${scriptPath}", -1);`);
        terminal.show();
    });

    context.subscriptions.push(disposable);
}
