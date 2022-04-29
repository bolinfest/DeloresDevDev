# DeloresDevDev

This is a VS Code extension designed to help with navigating
the code in https://github.com/grumpygamer/DeloresDev.

Currently, the only thing that is supported is syntax highlighting
for `.yack` files.

# Demo without Downloading

If you are logged into GitHub, then you can load a repo in VS Code Web
by loading the file on `github.dev` like so:

https://github.dev/grumpygamer/DeloresDev/blob/master/Scripts/Yacks/Natalie.yack

Once you are in, click on the **Extensions** tab on the left
(or use `ctrl+shift+x` or `cmd+shift+x`, as appropriate) and type
`delores` into the search box. From there you should be able to install
this extension, **DeloresDevDev**, in your web-based instance of VS Code.

Once you have installed the extension, `.yack` files should get syntax
highlighted as shown here:

![`Natalie.yack` syntax highlighted using DeloresDevDev](./docs/vscodeweb.png)

Note that `.dinky` files are not supported yet, nor is there any
sort of LSP-like support, though creating a
[Tree-sitter](https://tree-sitter.github.io/tree-sitter/) grammar
and then leveraging the [vscode-anycode](https://github.com/microsoft/vscode-anycode)
extension seems like a promsing approach to getting something basic working!
