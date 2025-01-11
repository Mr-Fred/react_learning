import App from '../App'
import {
  ApolloClient,
  ApolloProvider,  InMemoryCache,
} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

const AppWithApollo = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

export default AppWithApollo