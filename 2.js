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
    count: Int
  }
`)

// 2. 定义 schme 的 resolver
const rootValue = {
  foo() {
    return 'bar'
  },
  count() {
    return 123
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