import { Networkish } from '@ethersproject/networks'
import { Web3Provider } from '@ethersproject/providers'
import { createWeb3SolidStoreAndActions } from '@web3-solid/store'
import { Actions, Connector, Web3SolidState, Web3SolidStateAcessor, Web3SolidStore } from '@web3-solid/types'
import { createSignal, createMemo, createEffect, onCleanup, Accessor } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import { EqualityChecker, StoreApi } from 'zustand/vanilla'
import create, { UseBoundStore } from 'solid-zustand'

export type Web3SolidHooks = ReturnType<typeof getStateHooks> &
  ReturnType<typeof getDerivedHooks> &
  ReturnType<typeof getAugmentedHooks>

export type Web3SolidSelectedHooks = ReturnType<typeof getSelectedConnector>

export type Web3SolidPriorityHooks = ReturnType<typeof getPriorityConnector>

/**
 * Wraps the initialization of a `connector`. Creates a zustand `store` with `actions` bound to it, and then passes
 * these to the connector as specified in `f`. Also creates a variety of `hooks` bound to this `store`.
 *
 * @typeParam T - The type of the `connector` returned from `f`.
 * @param f - A function which is called with `actions` bound to the returned `store`.
 * @param allowedChainIds - An optional array of chainIds which the `connector` may connect to. If the `connector` is
 * connected to a chainId which is not allowed, a ChainIdNotAllowedError error will be reported.
 * If this argument is unspecified, the `connector` may connect to any chainId.
 * @returns [connector, hooks, store] - The initialized connector, a variety of hooks, and a zustand store.
 */
export function initializeConnector<T extends Connector> (
  f: (actions: Actions) => T,
  allowedChainIds?: number[]
): [T, Web3SolidHooks, Web3SolidStore] {
  const [store, actions] = createWeb3SolidStoreAndActions(allowedChainIds)

  const connector = f(actions)

  const stateHooks = getStateHooks(store)
  const derivedHooks = getDerivedHooks(stateHooks)
  const augmentedHooks = getAugmentedHooks(connector, stateHooks, derivedHooks)

  return [connector, { ...stateHooks, ...derivedHooks, ...augmentedHooks }, store]
}

function computeIsActive ({ chainId, accounts, activating, error }: Web3SolidStateAcessor) {
  return Boolean(chainId?.() && accounts?.() && !activating?.() && !error?.())
}

/**
 * Creates a variety of convenience `hooks` that return data associated with a particular passed connector.
 *
 * @param initializedConnectors - Two or more [connector, hooks] arrays, as returned from initializeConnector.
 * @returns hooks - A variety of convenience hooks that wrap the hooks returned from initializeConnector.
 */
export function getSelectedConnector (...initializedConnectors: [Connector, Web3SolidHooks][]) {
  function getIndex (connector: Connector) {
    const index = initializedConnectors.findIndex(([initializedConnector]) => connector === initializedConnector)
    if (index === -1) throw new Error('Connector not found')
    return index
  }

  // the following code calls hooks in a map a lot, which violates the eslint rule.
  // this is ok, though, because initializedConnectors never changes, so the same hooks are called each time
  function useSelectedChainId (connector: Connector) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useChainId }]) => useChainId())
    return values[getIndex(connector)]
  }

  function useSelectedAccounts (connector: Connector) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useAccounts }]) => useAccounts())
    return values[getIndex(connector)]
  }

  function useSelectedIsActivating (connector: Connector) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useIsActivating }]) => useIsActivating())
    return values[getIndex(connector)]
  }

  function useSelectedError (connector: Connector) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useError }]) => useError())
    return values[getIndex(connector)]
  }

  function useSelectedAccount (connector: Connector) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useAccount }]) => useAccount())
    return values[getIndex(connector)]
  }

  function useSelectedIsActive (connector: Connector) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useIsActive }]) => useIsActive())
    return values[getIndex(connector)]
  }

  function useSelectedProvider (connector: Connector, network?: Networkish) {
    const index = getIndex(connector)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useProvider }], i) => useProvider(network, i === index))
    return values[index]
  }

  function useSelectedENSNames (connector: Connector, provider: Web3Provider | undefined) {
    const index = getIndex(connector)
    const values = initializedConnectors.map(([, { useENSNames }], i) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useENSNames(i === index ? provider : undefined)
    )
    return values[index]
  }

  function useSelectedENSName (connector: Connector, provider: Web3Provider | undefined) {
    const index = getIndex(connector)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useENSName }], i) => useENSName(i === index ? provider : undefined))
    return values[index]
  }

  function useSelectedWeb3Solid (connector: Connector, provider: Web3Provider | undefined) {
    const index = getIndex(connector)
    const values = initializedConnectors.map(([, { useWeb3 }], i) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useWeb3(i === index ? provider : undefined)
    )
    return values[index]
  }

  return {
    useSelectedChainId,
    useSelectedAccounts,
    useSelectedIsActivating,
    useSelectedError,
    useSelectedAccount,
    useSelectedIsActive,
    useSelectedProvider,
    useSelectedENSNames,
    useSelectedENSName,
    useSelectedWeb3Solid
  }
}

/**
 * Creates a variety of convenience `hooks` that return data associated with the first of the `initializedConnectors`
 * that is active.
 *
 * @param initializedConnectors - Two or more [connector, hooks] arrays, as returned from initializeConnector.
 * @returns hooks - A variety of convenience hooks that wrap the hooks returned from initializeConnector.
 */
export function getPriorityConnector (...initializedConnectors: [Connector, Web3SolidHooks][]) {
  const {
    useSelectedChainId,
    useSelectedAccounts,
    useSelectedIsActivating,
    useSelectedError,
    useSelectedAccount,
    useSelectedIsActive,
    useSelectedProvider,
    useSelectedENSNames,
    useSelectedENSName,
    useSelectedWeb3Solid
  } = getSelectedConnector(...initializedConnectors)

  function usePriorityConnector () {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useIsActive }]) => useIsActive())
    const index = values.findIndex(isActive => isActive)
    return initializedConnectors[index === -1 ? 0 : index][0]
  }

  function usePriorityChainId () {
    return useSelectedChainId(usePriorityConnector())
  }

  function usePriorityAccounts () {
    return useSelectedAccounts(usePriorityConnector())
  }

  function usePriorityIsActivating () {
    return useSelectedIsActivating(usePriorityConnector())
  }

  function usePriorityError () {
    return useSelectedError(usePriorityConnector())
  }

  function usePriorityAccount () {
    return useSelectedAccount(usePriorityConnector())
  }

  function usePriorityIsActive () {
    return useSelectedIsActive(usePriorityConnector())
  }

  function usePriorityProvider (network?: Networkish) {
    return useSelectedProvider(usePriorityConnector(), network)
  }

  function usePriorityENSNames (provider: Web3Provider | undefined) {
    return useSelectedENSNames(usePriorityConnector(), provider)
  }

  function usePriorityENSName (provider: Web3Provider | undefined) {
    return useSelectedENSName(usePriorityConnector(), provider)
  }

  function usePriorityWeb3Solid (provider: Web3Provider | undefined) {
    return useSelectedWeb3Solid(usePriorityConnector(), provider)
  }

  return {
    useSelectedChainId,
    useSelectedAccounts,
    useSelectedIsActivating,
    useSelectedError,
    useSelectedAccount,
    useSelectedIsActive,
    useSelectedProvider,
    useSelectedENSNames,
    useSelectedENSName,
    useSelectedWeb3Solid,
    usePriorityConnector,
    usePriorityChainId,
    usePriorityAccounts,
    usePriorityIsActivating,
    usePriorityError,
    usePriorityAccount,
    usePriorityIsActive,
    usePriorityProvider,
    usePriorityENSNames,
    usePriorityENSName,
    usePriorityWeb3Solid
  }
}

const CHAIN_ID = (state: Web3SolidStateAcessor) => state.chainId
const ACCOUNTS = (state: Web3SolidStateAcessor) => state.accounts
const ACTIVATING = (state: Web3SolidStateAcessor) => state.activating
const ERROR = (state: Web3SolidStateAcessor) => state.error

function getStateHooks (store: UseBoundStore<Web3SolidState, StoreApi<Web3SolidState>>) {
  function useChainId (): Web3SolidStateAcessor['chainId'] {
    const [chainId, setChainId] = createSignal<number | undefined>(store.getState().chainId)

    const unsubscribe = store.subscribe(() => {
      setChainId(store.getState().chainId)
    })
    onCleanup(() => {
      unsubscribe()
    })

    return chainId
  }

  function useAccounts (): Web3SolidStateAcessor['accounts'] {
    const [accounts, setAccounts] = createSignal<string[] | undefined>(store.getState().accounts)

    const unsubscribe = store.subscribe(() => {
      setAccounts(store.getState().accounts)
    })
    onCleanup(() => {
      unsubscribe()
    })

    return accounts
  }

  function useIsActivating (): Web3SolidStateAcessor['activating'] {
    const [activating, setActivating] = createSignal<boolean | undefined>(store.getState().activating)

    const unsubscribe = store.subscribe(() => {
      setActivating(store.getState().activating)
    })
    onCleanup(() => {
      unsubscribe()
    })

    return activating
  }

  function useError (): Web3SolidStateAcessor['error'] {
    const [error, setError] = createSignal<Error | undefined>(store.getState().error)

    const unsubscribe = store.subscribe(() => {
      setError(store.getState().error)
    })
    onCleanup(() => {
      unsubscribe()
    })

    return error
  }

  return { useChainId, useAccounts, useIsActivating, useError }
}

function getDerivedHooks ({ useChainId, useAccounts, useIsActivating, useError }: ReturnType<typeof getStateHooks>) {
  function useAccount (): string | undefined {
    return useAccounts()?.()?.[0]
  }

  function useIsActive (): boolean {
    const chainId = useChainId()
    const accounts = useAccounts()
    const activating = useIsActivating()
    const error = useError()

    return computeIsActive({
      chainId,
      accounts,
      activating,
      error
    })
  }

  return { useAccount, useIsActive }
}

function useENS (provider?: Web3Provider, accounts?: string[]): (string | null)[] | undefined {
  const [ENSNames, setENSNames] = createSignal<(string | null)[] | undefined>()

  createEffect(() => {
    if (provider && accounts?.length) {
      let stale = false

      Promise.all(accounts.map(account => provider.lookupAddress(account)))
        .then(ENSNames => {
          if (!stale) {
            setENSNames(ENSNames)
          }
        })
        .catch(error => {
          console.debug('Could not fetch ENS names', error)
        })

      return () => {
        stale = true
        setENSNames(undefined)
      }
    }
  })

  return ENSNames()
}

function getAugmentedHooks<T extends Connector> (
  connector: T,
  { useChainId, useAccounts, useError }: ReturnType<typeof getStateHooks>,
  { useAccount, useIsActive }: ReturnType<typeof getDerivedHooks>
) {
  function useProvider (network?: Networkish, enabled = true): Web3Provider | undefined {
    const isActive = useIsActive()

    const chainId = useChainId()
    const accounts = useAccounts()

    // trigger the dynamic import on mount
    const [providers, setProviders] = createSignal<{ Web3Provider: typeof Web3Provider } | undefined>(undefined)
    createEffect(() => {
      import('@ethersproject/providers')
        .then(setProviders)
        .catch(() => {
          console.debug('@ethersproject/providers not available')
        })
    })

    const value = createMemo(() => {
      // we use chainId and accounts to re-render in case connector.provider changes in place
      if (providers() && enabled && isActive && chainId && accounts && connector.provider) {
        const provider = providers()
        return provider && new provider.Web3Provider(connector.provider, network)
      }
    })

    return value()
  }

  function useENSNames (provider: Web3Provider | undefined): (string | null)[] | undefined {
    const accounts = useAccounts()
    return useENS(provider, accounts?.())
  }

  function useENSName (provider: Web3Provider | undefined): (string | null) | undefined {
    const account = useAccount()
    const accounts = createMemo(() => (account === undefined ? undefined : [account]))

    return useENS(provider, accounts())?.[0]
  }

  // for backwards compatibility only
  function useWeb3 (provider: Web3Provider | undefined) {
    const chainId = useChainId()
    const account = useAccount()
    const error = useError()

    const isActive = useIsActive()

    return createMemo(
      () => ({
        connector,
        library: provider,
        chainId,
        account,
        active: isActive,
        error
      }),
      [provider, chainId, account, isActive, error]
    )
  }

  return { useProvider, useENSNames, useENSName, useWeb3 }
}
