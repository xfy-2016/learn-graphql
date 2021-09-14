const { buildSchema } = require('graphql')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

const app = express()

// 跨域设置
app.use(cors())

// 1. 构建schema
const schema = buildSchema(`
  type Query {
    foo: String,
    count: Int,
    height: Float,
    isGood: Boolean,
    userId: ID,
    user: User,
    article: Article,
    goods: [String],
    users: [User]
  }

  type User {
    name: String,
    age: Int
  }

  type Article {
    title: String,
    body: String,
    author: User
  }
`)

// 2. 定义 schme 的 resolver
const rootValue = {
  foo() {
    return 'bar'
  },
  count() {
    return 123
  },
  height() {
    return 123.123
  },
  isGood() {
    return true
  },
  userId() {
    return 123
  },
  user() {
    return {
      name: 'aaa',
      age: 18
    }
  },
  article() {
    return {
      title: 'head',
      body: 'content',
      author: {
        name: 'aaaa',
        age: 19
      }
    }
  },
  goods() {
    return ['1', '2']
  },
  users() {
    return [
      { name: 'bbb', age: 20 },
      { name: 'ccc', age: 19 }
    ]
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