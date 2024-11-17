import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from '../server/index'

const trpc = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({
        url: String(process.env.NEXT_PUBLIC_BACKEND_URL)
    })]
})
export default trpc
