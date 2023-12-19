import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";
import fetch from "cross-fetch";

// 定义 The Graph 子图的 API 端点
const graphEndpoint =
  "https://api.thegraph.com/subgraphs/name/YOUR_SUBGRAPH_NAME";

// 创建 Apollo Client 实例
const client = new ApolloClient({
  link: createHttpLink({
    uri: graphEndpoint,
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});

// 定义 GraphQL 查询
const graphqlQuery = gql`
  query {
    // 在此处添加你的 GraphQL 查询语句
  }
`;

// 使用 Apollo Client 发送 GraphQL 查询
const fetchData = async () => {
  try {
    // 发送查询并等待结果
    const result = await client.query({
      query: graphqlQuery,
    });

    // 处理查询结果
    const responseData = result.data;
    console.log("GraphQL response data:", responseData);
  } catch (error) {
    // 处理错误
    console.error("Error fetching data:", error);
  }
};

// 调用 fetchData 函数开始请求数据
fetchData();
