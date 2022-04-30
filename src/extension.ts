import { privateEncrypt } from "crypto";
import { CancellationToken, Definition, Position, TextDocument } from "vscode";

import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.languages.registerDefinitionProvider(
    "yack",
    new YackDefinitionProvider()
  );

  context.subscriptions.push(disposable);
}

class YackDefinitionProvider implements vscode.DefinitionProvider {
  provideDefinition(
    document: TextDocument,
    position: Position,
    _token: CancellationToken
  ): Definition | null {
    // Because .yack files are generally small, we should be able to get
    // away with this synchronous implementation with a simple heuristic.
    const range = document.getWordRangeAtPosition(position);
    if (range == null) {
      return null;
    }

    const word = document.getText(range);
    if (word == null) {
      return null;
    }

    const { line, character } = range.start;
    if (character < 3) {
      return null;
    }

    // See if "->" precedes the word the user clicked on. Admittedly this could
    // be a false positive if we are in the middle of a string literal,
    // but we can live with that.
    const arrowRange = new vscode.Range(
      new vscode.Position(line, character - 3),
      new vscode.Position(line, character - 1)
    );
    const arrow = document.getText(arrowRange);
    if (arrow !== "->") {
      return null;
    }

    const regex = new RegExp(`^(={2,}\\s+)${escapeRegex(word)}`);
    const count = document.lineCount;
    for (let lineNumber = 0; lineNumber < count; ++lineNumber) {
      const line = document.lineAt(lineNumber);
      const match = line.text.match(regex);
      if (match != null) {
        const column = match[1].length;
        return new vscode.Location(
          document.uri,
          new Position(lineNumber, column)
        );
      }
    }

    return null;
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}

function escapeRegex(s: string): string {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
