import React, { Component } from 'react';
import Layout from './layout';
import { graphql } from 'gatsby';

//Static query can be used anywhere, does not accept variables, can't use context

// Page query must be used on pages

export default class postLayout extends Component {
  render() {
    const { markdownRemark } = this.props.data;
    return (
      <Layout>
        <h1>{markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </Layout>
    );
  }
}

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        path
      }
    }
  }
`;
