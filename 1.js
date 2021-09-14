const { graphql, buildSchema } = require('graphql')

// 1. 构建schema
const scheme = buildSchema(`
  type Query {
    foo: String,
    count: Int
  }
`)

// 2. 定义 schme 的 resolver
const root = {
  foo() {
    return 'bar'
  },
  count() {
    return 123
  }
}

// 3. 查询
graphql(scheme, '{ foo }', root).then(res => {
  console.log(res)
})