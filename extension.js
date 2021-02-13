const { Assembler } = require('@neshacker/6502-tools')

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "neshacker-code" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('neshacker-code.assemble', async function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			let document = editor.document;
			const documentText = document.getText();
			console.log(documentText)

			try {
				const result = Assembler.toHexString(documentText)
				await vscode.env.clipboard.writeText(result)
				vscode.window.showInformationMessage('NesHacker: Assembled Hexadecimal Copied to Clipboard');
			} catch (err) {
				vscode.window.showErrorMessage(err.message)
			}
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
