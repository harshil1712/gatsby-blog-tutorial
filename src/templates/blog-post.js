import React from "react"
import { graphql } from 'gatsby'
import Layout from '../components/layout';

export default ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export const pageQuery = graphql`
    query blogPostQuery($id: String) {
        markdownRemark(id:{eq: $id}) {
            html
            frontmatter {
                title
            }
        }
    }
`