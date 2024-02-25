import * as vscode from "vscode";
import { getNonce } from "./getNonce";

export class HelloWorldPanel {
  /**
   * Track the currently panel. Only allow a wingle panel to exist at a time.
   */
  public static currentPanel: HelloWorldPanel | undefined;

  public static readonly viewType = "hello-world";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (HelloWorldPanel.currentPanel) {
      HelloWorldPanel.currentPanel._panel.reveal(column);
      HelloWorldPanel.currentPanel._update();
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      HelloWorldPanel.viewType,
      "VS_Song_Ext",
      column || vscode.ViewColumn.One,
      {
        // Enable javascript in the webview
        enableScripts: true,

        // And restrict the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, "media"),
          vscode.Uri.joinPath(extensionUri, "out/compiled"),
        ],
      }
    );

    HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri);
  }

  public static kill() {
    HelloWorldPanel.currentPanel?.dispose();
    HelloWorldPanel.currentPanel = undefined;
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "alert":
            vscode.window.showErrorMessage(message.text);
            return;
        }
      },
      null,
      this._disposables
    );
  }

  public dispose() {
    HelloWorldPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private async _update() {
    const webview = this._panel.webview;

    this._panel.webview.html = this._getHtmlForWebview(webview);
    webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
        // case "tokens": {
        //   await Util.globalState.update(accessTokenKey, data.accessToken);
        //   await Util.globalState.update(refreshTokenKey, data.refreshToken);
        //   break;
        // }
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // // And the uri we use to load this script in the webview
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out/compiled", "HelloWorld.js")
    );

    // Uri to load styles into webview
    const stylesResetUri = webview.asWebviewUri(vscode.Uri.joinPath(
        this._extensionUri,
        "media",
        "reset.css"
    ));

    const stylesMainUri = webview.asWebviewUri(vscode.Uri.joinPath(
        this._extensionUri,
        "media",
        "vscode.css"
    ));

    const cssUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out", "compiled/swiper.css")
    );

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce();

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <!--
            Use a content security policy to only allow loading images from https or from our extension directory,
            and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${stylesResetUri}" rel="stylesheet">
        <link href="${stylesMainUri}" rel="stylesheet">
        <script nonce="${nonce}">
        </script>
        <style>
            
            h1 {
              text-align: center;
              font-size: 2rem;
              font-weight: bold;
              font-family: "joly-display", Arial, Helvetica, sans-serif;
            }

            h2 {
              text-align: center;
              font-size: 1rem;
              font-weight: bold;
              font-family: "joly-display", Arial, Helvetica, sans-serif;
            }

            .spaced-content {
              line-height: 1.6; 
              text-align: center; /* Center-align text */
              margin: 0 auto; /* Center-align block elements */
              padding: 20px 0; 
            }

            .question {
              margin-bottom: 20px;
              font-family: "joly-display", Arial, Helvetica, sans-serif; 
            }

            .buttons-inline {
              display: flex;
              justify-content: start; 
              gap: 10px; /* Space between buttons */
            }
        </style>
      </head>
      <body>
      <h1> DevBops! </h1>
        <div class="spaced-content">
          <p class="question"> Would you like lyrics in your music? </p>
          <div class="buttons-inline">
            <button> Yes </button>
            <button> No </button>
          </div>
        </div>
        <div class="spaced-content">
          <p class="question"> What's your current task? </p>
          <div class="buttons-inline">
            <button> Ideation </button>
            <button> Development </button>
            <button> Testing </button>
          </div>
        </div>
        <div class="spaced-content">
          <p class="question"> How would you describe your current energy level? </p>
          <div class="buttons-inline">
            <button> Low </button>
            <button> Moderate </button>
            <button> High </button>
          </div>
        </div>
        <div class="spaced-content">
          <p class="question"> How important is music variety to you? </p>
          <div class="buttons-inline">
            <button> Very important </button>
            <button> Moderately important </button>
            <button> Not important </button>
          </div>
        </div>
        <div class="spaced-content">
          <p class="question"> What genre of music do you usually listen to while working? (Black Metal? Pop? Jazz?)</p>
          <input> </input>
        </div>
        <div class="spaced-content">
          <p class="question"> What are your favorite artists to listen to? </p>
          <input> </input>
        </div>

      <h2> Stage 1: Ideation </h2>
        <div class="spaced-content">
          <p class="question"> Are you looking for inspiration or focus? </p>
          <div class="buttons-inline">
            <button> Inspiration </button>
            <button> Focus </button>
          </div>
        </div>
        <div class="spaced-content">
          <p class="question"> Do you prefer instrumental music or songs with lyrics during ideation? </p>
          <div class="buttons-inline">
            <button> Lyrics </button>
            <button> Instrumental </button>
          </div>
        </div>
      
      <h2> Stage 2: Development </h2>
        <div class="spaced-content">
          <p class="question"> Do you prefer music that keeps you in a steady flow or something that periodically energizes you? </p>
          <div class="buttons-inline">
            <button> Steady chill </button>
            <button> Periodically chill </button>
            <button> Never chill </button>
          </div>
        </div>
        <div class="spaced-content">
          <p class="question"> How do you describe the complexity of the task at hand? </p>
          <div class="buttons-inline">
            <button> Simple and routine </button>
            <button> Moderately challenging </button>
            <button> Highly complex </button>
          </div>
        </div>

      <h2> Stage 3: Testing </h2>
        <div class="spaced-content">
          <p class="question"> Are you performing detailed debugging or broad testing? Choose the tempo of music you’d like accordingly </p>
          <div class="buttons-inline">
            <button> Steady chill </button>
            <button> Periodically chill </button>
            <button> Never chill </button>
          </div>
        </div>
        
      </body>
      </html>`;
  }
}
