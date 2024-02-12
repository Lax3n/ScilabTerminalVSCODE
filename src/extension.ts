import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.runScilabScript', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active Scilab script file is open.');
            return;
        }

        const scilabPath = vscode.workspace.getConfiguration('scilabIntegration').get<string>('scilabPath');
        const filePath = editor.document.fileName;
        const fileName = filePath.split(/\\|\//).pop(); // Compatible avec Windows et Unix

        if (!fileName || !fileName.endsWith('.sce')) {
            vscode.window.showErrorMessage('The file is not a Scilab script.');
            return;
        }

        await editor.document.save();

        // Vérifie si un terminal Scilab existe déjà
        let terminal = vscode.window.terminals.find(t => t.name === "Scilab");
        const terminalExisted = terminal ? true : false; // Nouvelle variable pour vérifier si le terminal existait déjà

        if (!terminal) {
            // Créer un nouveau terminal avec les options spécifiées
            terminal = vscode.window.createTerminal({
                name: "Scilab", // Nom du terminal
                shellPath: scilabPath 

            });
        }

        terminal.show();

        // Construit la commande en fonction de l'existence préalable du terminal
        const command = terminalExisted ? `exec("./${fileName}", -1);` : `exec("./${fileName}", -1);`;
        terminal.sendText(command, true);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }
