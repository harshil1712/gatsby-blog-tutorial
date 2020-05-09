import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
  <StaticQuery
    query={graphql`
      query blogListings {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <Layout>
          <SEO title="Home" />
          <div>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <Link to={node.fields.slug}>
                <h2>{node.frontmatter.title}</h2>
                <p>{ node.frontmatter.excerpt}</p>
              </Link>
            ))}
          </div>
        </Layout>
      )
    }}
  />
)
