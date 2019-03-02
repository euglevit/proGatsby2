const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      query NewPostsQuery {
        allMarkdownRemark(limit: 3, sort: { fields: [frontmatter___date] }) {
          totalCount
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `).then((results) => {
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: path.resolve('./src/components/postLayout.js'),
          context: {
            path: node.frontmatter.path
          }
        });
      });
      resolve();
    });
  });
};
