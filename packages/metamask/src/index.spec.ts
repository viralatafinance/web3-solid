import { createWeb3SolidStoreAndActions } from '@web3-solid/store'
import type { Actions, Web3SolidStore } from '@web3-solid/types'
import { MetaMask } from '.'
import { MockEIP1193Provider } from '../../eip1193/src/index.spec'

const chainId = '0x1'
const accounts: string[] = []

describe('MetaMask', () => {
  let mockProvider: MockEIP1193Provider

  beforeEach(() => {
    mockProvider = new MockEIP1193Provider()
  })

  beforeEach(() => {
    ;(window as any).ethereum = mockProvider
  })

  let store: Web3SolidStore
  let connector: MetaMask

  beforeEach(() => {
    let actions: Actions
    ;[store, actions] = createWeb3SolidStoreAndActions()
    connector = new MetaMask(actions, false)
  })

  test('#activate', async () => {
    mockProvider.chainId = chainId
    mockProvider.accounts = accounts

    await connector.activate()

    expect(store.getState()).toEqual({
      chainId: Number.parseInt(chainId, 16),
      accounts,
      activating: false,
      error: undefined,
    })
  })
})
