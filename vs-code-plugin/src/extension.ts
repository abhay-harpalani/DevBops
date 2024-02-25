// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HelloWorldPanel } from './helloWorldPanel';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vs-song" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(
		vscode.commands.registerCommand('vs-song.takeQuiz', () => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			HelloWorldPanel.createOrShow(context.extensionUri);
		})
	);


	context.subscriptions.push(
		vscode.commands.registerCommand("vs-song.answerQuestion", async () => {
			const answer = await vscode.window.showInformationMessage(
				"Do you like music?", 
				"Yes!", "No"
			);

			if (answer === "No") {
				vscode.window.showInformationMessage("This plugin is not for you!");
			} else {
				console.log({ answer });
			}
		})
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
