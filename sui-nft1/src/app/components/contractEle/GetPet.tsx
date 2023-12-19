import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
// 定义 The Graph 子图的 API 端点，可以在theGraph官网的子图页面中查看
const graphEndpoint =
  "https://api.thegraph.com/subgraphs/name/ppnnssy/foundtionssubgraph";

// 创建 Apollo Client 实例
const client = new ApolloClient({
  link: createHttpLink({
    uri: graphEndpoint,
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});
// 这里容易出错，格式一定要正确
const graphqlQuery = gql`
  query {
    newPets(first: 5) {
      id
      PetRegistry_id
      petName
      petAge
    }
    updatePets(first: 5) {
      id
      PetRegistry_id
      petName
      petAge
    }
    pets(orderDirection: asc, orderBy: petAge) {
      id
      petName
      petAge
      master
    }
  }
`;

export default function GetPet() {
  const getPets = () => {
    client
      .query({
        query: graphqlQuery,
      })
      .then((result) => {
        console.log("🚀 ~ file: GetPet.tsx:48 ~ .then ~ result:", result);
      });
  };

  return <button onClick={getPets}>GetPet</button>;
}
