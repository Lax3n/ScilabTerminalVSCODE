import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.runScilabScript', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active Scilab script file is open.');
            return;
        }
        const scilabPath = vscode.workspace.getConfiguration('scilabIntegration').get('scilabPath') || 'scilab';
        const filePath = editor.document.fileName;
        const fileName = filePath.split('\\').pop();

 
        if (!fileName || !fileName.endsWith('.sce')) {
            vscode.window.showErrorMessage('The file is not a Scilab script.');
            return;
        }

        const workingDir = filePath.replace('\\' + fileName, '');
        const scilabCommand = `exec("./${fileName}", -1);`;

        // Launch Scilab console
        const existingTerminal = vscode.window.terminals.find(terminal => terminal.name === "Scilab");
        const terminal = existingTerminal || vscode.window.createTerminal(`Scilab`);
        if (!existingTerminal) {
            terminal.sendText(`& "${scilabPath}" -f ./${fileName}`, true);
        } else {
            // If terminal exists, simply run the script without initializing Scilab again
            terminal.sendText(`exec("./${fileName}", -1);`, true);
        }

        terminal.show();
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
