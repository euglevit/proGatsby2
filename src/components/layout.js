/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Header from './header';
import Archive from './archive';
import './layout.css';

const MainLayout = styled.main`
  max-width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 40px;
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data) => {
      const { title } = data.site.siteMetadata;
      return (
        <>
          <Header siteTitle={title} />
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `0px 1.0875rem 1.45rem`,
              paddingTop: 0
            }}
          >
            <MainLayout>
              <div>{children}</div>
              <Archive />
            </MainLayout>
            <footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href='https://www.gatsbyjs.org'>Gatsby</a>
            </footer>
          </div>
        </>
      );
    }}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
