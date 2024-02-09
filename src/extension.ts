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

        // Check if the file is a Scilab script
        if (!fileName || !fileName.endsWith('.sce')) {
            vscode.window.showErrorMessage('The file is not a Scilab script.');
            return;
        }

        // Assurez-vous d'avoir le bon répertoire de travail dans Scilab
        const workingDir = filePath.replace('\\' + fileName, '');
        const scilabCommand = `exec("./${fileName}", -1);`;

        // Launch Scilab console
        // const scilabPath = 'C:\\Path\\To\\Scilab\\bin\\WScilex-cli.exe'; // Update to the actual path
        // const terminal = vscode.window.createTerminal(`Scilab`);
        const existingTerminal = vscode.window.terminals.find(terminal => terminal.name === "Scilab");
        const terminal = existingTerminal || vscode.window.createTerminal(`Scilab`);
        if (!existingTerminal) {
            terminal.sendText(`& "${scilabPath}" -nb -noatomsautoload -nouserstartup -f ./${fileName}`, true);
        } else {
            // If terminal exists, simply run the script without initializing Scilab again
            terminal.sendText(`exec("./${fileName}", -1);`, true);
        }

        // Wait for Scilab to initialize and then run the script
        // setTimeout(() => {
        //     terminal.sendText(scilabCommand, true);
        // }, 5000); // Adjust delay as needed for Scilab to initialize

        terminal.show();
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
