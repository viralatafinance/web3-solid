# web3-solid (beta)

[![CI](https://github.com/NoahZinsmeister/web3-solid/actions/workflows/CI.yml/badge.svg)](https://github.com/NoahZinsmeister/web3-solid/actions/workflows/CI.yml)

## [Example](https://web3-solid-mu.vercel.app/)

This is a hosted version of [packages/example](packages/example).

## Packages

| Package                                               | Version                                                                                                                                   | Size                                                                                                                                                         | Link                                                                      |
|-------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| [`@web3-solid/types`](packages/types)                 | [![npm](https://img.shields.io/npm/v/@web3-solid/types/beta.svg)](https://www.npmjs.com/package/@web3-solid/types/v/beta)                 | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-solid/types/beta.svg)](https://bundlephobia.com/result?p=@web3-solid/types@beta)                 |                                                                           |
| [`@web3-solid/store`](packages/store)                 | [![npm](https://img.shields.io/npm/v/@web3-solid/store/beta.svg)](https://www.npmjs.com/package/@web3-solid/store/v/beta)                 | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-solid/store/beta.svg)](https://bundlephobia.com/result?p=@web3-solid/store@beta)                 |                                                                           |
| [`@web3-solid/core`](packages/core)                   | [![npm](https://img.shields.io/npm/v/@web3-solid/core/beta.svg)](https://www.npmjs.com/package/@web3-solid/core/v/beta)                   | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-solid/core/beta.svg)](https://bundlephobia.com/result?p=@web3-solid/core@beta)                   |                                                                           |
| **Connectors**                                        |                                                                                                                                           |                                                                                                                                                              |                                                                           |
| [`@web3-solid/eip1193`](packages/eip1193)             | [![npm](https://img.shields.io/npm/v/@web3-solid/eip1193/beta.svg)](https://www.npmjs.com/package/@web3-solid/eip1193/v/beta)             | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-solid/eip1193/beta.svg)](https://bundlephobia.com/result?p=@web3-solid/eip1193@beta)             | [EIP-1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md) |
| [`@web3-solid/empty`](packages/empty)                 | [![npm](https://img.shields.io/npm/v/@web3-solid/empty/beta.svg)](https://www.npmjs.com/package/@web3-solid/empty/v/beta)                 | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-solid/empty/beta.svg)](https://bundlephobia.com/result?p=@web3-solid/empty@beta)                 |                                                                           |
| [`@web3-solid/metamask`](packages/metamask)           | [![npm](https://img.shields.io/npm/v/@web3-solid/metamask/beta.svg)](https://www.npmjs.com/package/@web3-solid/metamask/v/beta)           | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-solid/metamask/beta.svg)](https://bundlephobia.com/result?p=@web3-solid/metamask@beta)           | [MetaMask](https://metamask.io/)                                          |
| [`@web3-solid/network`](packages/network)             | [![npm](https://img.shields.io/npm/v/@web3-solid/network/beta.svg)](https://www.npmjs.com/package/@web3-solid/network/v/beta)             | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-solid/network/beta.svg)](https://bundlephobia.com/result?p=@web3-solid/network@beta)             |                                                                           |
| [`@web3-solid/url`](packages/url)                     | [![npm](https://img.shields.io/npm/v/@web3-solid/url/beta.svg)](https://www.npmjs.com/package/@web3-solid/url/v/beta)                     | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-solid/url/beta.svg)](https://bundlephobia.com/result?p=@web3-solid/url@beta)                     |                                                                           |
| [`@web3-solid/walletconnect`](packages/walletconnect) | [![npm](https://img.shields.io/npm/v/@web3-solid/walletconnect/beta.svg)](https://www.npmjs.com/package/@web3-solid/walletconnect/v/beta) | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-solid/walletconnect/beta.svg)](https://bundlephobia.com/result?p=@web3-solid/walletconnect@beta) | [WalletConnect](https://walletconnect.org/)                               |
| [`@web3-solid/walletlink`](packages/walletlink)       | [![npm](https://img.shields.io/npm/v/@web3-solid/walletlink/beta.svg)](https://www.npmjs.com/package/@web3-solid/walletlink/v/beta)       | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-solid/walletlink/beta.svg)](https://bundlephobia.com/result?p=@web3-solid/walletlink@beta)       | [WalletLink](https://walletlink.org/#/)                                   |
| **Experimental Connectors**                           |                                                                                                                                           |                                                                                                                                                              | Not stable                                                                |
| [`@web3-solid/frame`](packages/frame)                 | [![npm](https://img.shields.io/npm/v/@web3-solid/frame/beta.svg)](https://www.npmjs.com/package/@web3-solid/frame/v/beta)                 | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-solid/frame/beta.svg)](https://bundlephobia.com/result?p=@web3-solid/frame@beta)                 | [Frame](https://frame.sh/)                                                |
| [`@web3-solid/magic`](packages/magic)                 | [![npm](https://img.shields.io/npm/v/@web3-solid/magic/beta.svg)](https://www.npmjs.com/package/@web3-solid/magic/v/beta)                 | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-solid/magic/beta.svg)](https://bundlephobia.com/result?p=@web3-solid/magic@beta)                 | [Magic](https://magic.link/)                                              |


## Getting Started

- `yarn`
- `yarn bootstrap`
- `yarn start`

In addition to compiling each package in watch mode, this will also spin up [packages/example](packages/example) on [localhost:3000](http://localhost:3000/).

## Running Tests

- `yarn test --watch`

## Documentation

This version of web3-solid is still in beta, so unfortunately documentation is pretty sparse at the moment. The [packages/example](packages/example), TSDoc comments, and the source itself are the best ways to get an idea of what's going on. More thorough documentation is a priority as development continues!

## Adding Connectors

If you're interested in using web3-solid with a wallet that doesn't have an "official" connector package, you're in luck! This library was designed to be highly modular, and you should be able to draw inspiration from the existing connectors to write your own! That code can live inside your codebase, or even be published as a standalone package. From time to time, if there's sufficient interest and desire, PRs adding new connectors may be accepted, but this should be brought up in an issue or discussion beforehand.

## Upgrading from v6

While the internals of web3-solid have changed fairly dramatically between v6 and v8, the hope is that usage don't have to change too much when upgrading. Once you've migrated to the new connectors and state management patterns, you should be able to use the hooks defined in @web3-solid/core, in particular `useWeb3React` (or `usePriorityWeb3React`), as more or less drop-in replacements for the v6 hooks. The big benefit in v8 is that hooks are now per-connector, as opposed to global, so no more juggling between connectors/multiple roots!

## Useful Commands

### Add a dependency

- `yarn lerna add <DEPENDENCY> --scope <PACKAGE>`

### Remove a dependency

- Delete the relevant `package.json` entry

Because of a [lerna bug](https://github.com/lerna/lerna/issues/1883), it's not possible to prune `yarn.lock` programmatically, so regenerate it manually:

- `yarn lerna exec "rm -f yarn.lock" --scope <SUBPACKAGE>`
- `yarn clean --scope <SUBPACKAGE>`
- `yarn bootstrap`
