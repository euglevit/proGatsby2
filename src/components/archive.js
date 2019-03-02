import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import './layout.css';

const ArchiveList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  .a {
    color: #524673;
    font-size: 0.8rem;
    text-decoration: none;
  }
`;

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
            <ArchiveList>
              {allMarkdownRemark.edges.map((edge) => (
                <li key={edge.node.frontmatter.path}>
                  <Link to={`/posts/${edge.node.frontmatter.path}`}>
                    {edge.node.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ArchiveList>
          </aside>
        </>
      );
    }}
  />
);

export default Archive;
