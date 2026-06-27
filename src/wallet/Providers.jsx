import { WagmiProvider } from "wagmi";

import { config } from "./config";

import {

QueryClient,

QueryClientProvider,

} from "@tanstack/react-query";

const queryClient =
new QueryClient();

export default function Providers({
children,
}){

return(

<WagmiProvider config={config}>

<QueryClientProvider
client={queryClient}
>

{children}

</QueryClientProvider>

</WagmiProvider>

);

}