const { buildSchema } = require('graphql')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()

// 跨域设置
app.use(cors())

const articles = [
  { id: '1', title: '111', body: '11 111 111' },
  { id: '2', title: '222', body: '22 222 222' },
  { id: '3', title: '333', body: '33 333 333' }
]

// 1. 构建schema
const schema = buildSchema(`
  type Query {
    articles: [Article]
    article(id: ID!): Article
  }

  type Article {
    id: ID!,
    title: String!,
    body: String!,
    tagList: [String!]
  }

  # 修改
  type Mutation {
    createArticle(article: CreateArticleInput): Article
    updateArticle(id: ID!, article: UpdateArticleInput): Article
    deleteArticle(id: ID!): DeletionStatus
  }

  input CreateArticleInput {
    title: String!,
    body: String!,
    tagList: [String!]
  }

  input UpdateArticleInput {
    title: String!,
    body: String!
  }

  type DeletionStatus {
    success: Boolean!
  }
`)

// 2. 定义 schme 的 resolver
const rootValue = {
  articles() {
    return articles
  },
  article({ id }) {
    return articles.find(article => article.id === id)
  },
  createArticle({ article }) {
    article.id = uuidv4()
    articles.push(article)
    return article
  },
  updateArticle({ id, article: postArticle }) {
    const article = articles.find(article => article.id === id)
    article.title = postArticle.title
    article.body = postArticle.body
    return article
  },
  deleteArticle({ id }) {
    const index = articles.find(article => article.id === id)
    articles.splice(index, 1)
    return {
      success: true
    }
  }
}

// 3. graphql中间件
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true  // 开启浏览器调试
}))


// 4.启动
app.listen(4000, () => {
  console.log('running at http://localhost:4000')
})