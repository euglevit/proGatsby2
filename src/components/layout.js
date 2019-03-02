import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { Spring } from 'react-spring/renderprops';
import styled from 'styled-components';
import Img from 'gatsby-image';
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

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
        file(relativePath: { regex: "/jpg/" }) {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={(data) => {
      const { title } = data.site.siteMetadata;

      return (
        <>
          <Header siteTitle={title} />
          <Spring
            from={{ height: location.pathname === '/' ? 100 : 200 }}
            to={{ height: location.pathname === '/' ? 200 : 100 }}
          >
            {(styles) => (
              <div style={{ ...styles, overflow: 'hidden' }}>
                <Img fluid={data.file.childImageSharp.fluid} />
              </div>
            )}
          </Spring>
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

Layout.defaultProps = {
  location: {}
};

export default Layout;
