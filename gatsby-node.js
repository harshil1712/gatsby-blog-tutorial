const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value: `/blog${value}`,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter, pathPrefix }) => {
  const { createPage } = actions
  const result = await graphql(
    `
       query loadPagesQuery {
            allMarkdownRemark( filter: {fields:{slug:{regex:"/blog/"}}}){
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                    }
                }
            }
        }`
  )

    if (result.errors && result.errors.length) {
      if (result.errors.length === 1) {
        throw new Error(result.errors[0])
      }

      result.errors.forEach(err => {
        reporter.error("Error while quering", err)
      })

      throw new Error("See errors above")
    }

    console.log(result)
    const posts = result.data.allMarkdownRemark.edges
    posts.forEach(({ node }) => {
        const pagePath = `${pathPrefix}${node.fields.slug}`
        console.log(pagePath)

        createPage({
            path: pagePath,
            component: path.resolve(`src/templates/blog-post.js`),
            context: {id: node.id}
        })
    })
}
