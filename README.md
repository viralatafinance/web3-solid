# web3-solid (beta)

## Getting Started

- `yarn`
- `yarn bootstrap`
- `yarn start`

## Running Tests

- `yarn test --watch`

## Adding Connectors

If you're interested in using web3-solid with a wallet that doesn't have an "official" connector package, you're in luck! This library was designed to be highly modular, and you should be able to draw inspiration from the existing connectors to write your own! That code can live inside your codebase, or even be published as a standalone package. From time to time, if there's sufficient interest and desire, PRs adding new connectors may be accepted, but this should be brought up in an issue or discussion beforehand.

## Upgrading from v6

While the internals of web3-solid have changed fairly dramatically between v6 and v8, the hope is that usage don't have to change too much when upgrading. Once you've migrated to the new connectors and state management patterns, you should be able to use the hooks defined in @web3-solid/core, in particular `useWeb3` (or `usePriorityWeb3Solid`), as more or less drop-in replacements for the v6 hooks. The big benefit in v8 is that hooks are now per-connector, as opposed to global, so no more juggling between connectors/multiple roots!

## Useful Commands

### Add a dependency

- `yarn lerna add <DEPENDENCY> --scope <PACKAGE>`

### Remove a dependency

- Delete the relevant `package.json` entry

Because of a [lerna bug](https://github.com/lerna/lerna/issues/1883), it's not possible to prune `yarn.lock` programmatically, so regenerate it manually:

- `yarn lerna exec "rm -f yarn.lock" --scope <SUBPACKAGE>`
- `yarn clean --scope <SUBPACKAGE>`
- `yarn bootstrap`
