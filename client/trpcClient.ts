import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from '../server/index'

const trpc = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({
        url: "http://localhost:4000/trpc"
    })]
})

export default trpc
