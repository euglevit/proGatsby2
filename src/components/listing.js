import React from 'react';
import styled from 'styled-components';
import { Link, StaticQuery, graphql } from 'gatsby';

const Post = styled.article`
  box-shadow: 0px 3px 10px rgba(25, 17, 34, 0.05);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  a {
    color: #000;
    text-decoration: none;
  }
  p {
    font-size: 0.8rem;
  }
  h2 {
    margin-bottom: 0;
  }
  .read-more {
    color: #524673;
    font-size: 0.8rem;
    text-decoration: underline;
  }
`;

const LISTING_QUERY = graphql`
  query ListingQuery {
    allMarkdownRemark(limit: 3, sort: { fields: [frontmatter___date] }) {
      totalCount
      edges {
        node {
          excerpt
          frontmatter {
            title
            path
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;

const Listing = () => (
  <StaticQuery
    query={LISTING_QUERY}
    render={({ allMarkdownRemark }) =>
      allMarkdownRemark.edges.map((edge) => (
        <Post key={edge.node.frontmatter.path}>
          <Link to={`/posts/${edge.node.frontmatter.path}`}>
            <h2>{edge.node.frontmatter.title}</h2>
          </Link>
          <p>{edge.node.frontmatter.date}</p>
          <p>{edge.node.excerpt}</p>
          <Link
            className={'read-more'}
            to={`/posts/${edge.node.frontmatter.path}`}
          >
            Read More
          </Link>
        </Post>
      ))
    }
  />
);

export default Listing;
