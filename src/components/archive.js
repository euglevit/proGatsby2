import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import './layout.css';

const POST_ARCHIVE_QUERY = graphql`
  query PostsQuery {
    allMarkdownRemark(limit: 3, sort: { fields: [frontmatter___date] }) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "L")
          }
        }
      }
    }
  }
`;

const Archive = () => (
  <StaticQuery
    query={POST_ARCHIVE_QUERY}
    render={({ allMarkdownRemark }) => {
      // const { title, date } = data.site.siteMetadata;
      return (
        <>
          <aside>
            <h3>Archive</h3>
            <ul>
              {allMarkdownRemark.edges.map((edge) => (
                <li key={edge.node.frontmatter.path}>
                  <Link to={`/posts/${edge.node.frontmatter.path}`}>
                    {edge.node.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </>
      );
    }}
  />
);

export default Archive;
