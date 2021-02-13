const vscode = require('vscode');
const { Assembler } = require('@neshacker/6502-tools')

/**
 * Command: neshacker-code.assemble.
 *
 * Attempts to assemble 6502 text in the current editor window, convert it to
 * hexadecimal text, and copy it to the clipboard. This command is useful for
 * quickly assembling code to paste into a ROM via a hex editor.
 */
async function assembleAndCopyCommand () {
	try {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
      return
    }
    const { document, selection } = editor
    const text = selection.isEmpty ?
      document.getText() :
      document.getText(selection)
		const result = Assembler.toHexString(text)
		await vscode.env.clipboard.writeText(result)
		const bytes = result.length / 2
		vscode.window.setStatusBarMessage(
			`NesHacker: Copied ${bytes} bytes of hexadecimal to clipboard.`,
		)
	} catch (err) {
		vscode.window.showErrorMessage(err.message)
	}
}

/**
 * Handles activation for the neshacker-code module.
 * @param {vscode.ExtensionContext} context
 */
function activate (context) {
	context.subscriptions.push(vscode.commands.registerCommand(
		'neshacker-code.assembleAndCopy',
		assembleAndCopyCommand
	))
}

/**
 * Handles deactivation for the neshacker-code module.
 */
function deactivate() {
}

module.exports = { activate, deactivate }
