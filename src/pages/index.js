import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
  <StaticQuery
    query={graphql`
      query blogListings {
        allMarkdownRemark {
          nodes {
            frontmatter {
              title
              excerpt
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
            {data.allMarkdownRemark.nodes.map(({ frontmatter }) => (
              <div>
                <h2>{frontmatter.title}</h2>
                <p>{frontmatter.excerpt}</p>
              </div>
            ))}
          </div>
        </Layout>
      )
    }}
  />
)
