import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from 'trpc/routers/index'

const trpc = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({
        url: String(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trpc`),
        headers: () => ({
            'Content-Type': 'application/json',
        }),
        fetch: (input, init) => {
            console.log('Fetching URL:', input);
            console.log('Fetch Options:', init);
            return fetch(input, {
                ...init,
                credentials: 'include', // Ensures cookies are sent
            });
        },
    })]
})
export default trpc
