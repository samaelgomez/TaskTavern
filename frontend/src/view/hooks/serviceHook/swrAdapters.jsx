import useSWR from 'swr';
import useSWRMutation from 'swr/mutation'

const SwrGetAdapter = ({ key, fetcher, shouldFetch = true }) => {
    const { data, error, isValidating, mutate } = useSWR(shouldFetch ? key : null, fetcher)
    return { data, error, isValidating, mutate }
}

const SwrMutateAdapter = ({ key, fetcher }) => {
    const { trigger } = useSWRMutation(key, fetcher)
    return { trigger }
}

export { SwrGetAdapter, SwrMutateAdapter }