import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { useTheme } from 'components/Theming'
import Container from 'components/Container'
import { rhythm } from '../lib/typography'
import { fonts } from '../lib/typography'
import { bpMaxSM, bpMaxMD } from '../lib/breakpoints'

const Hero = () => {
  const theme = useTheme()
  return (
    <section
      css={css`
        color: ${theme.colors.black};
        width: 100%;
        padding: 20px 0 30px 0;
        display: flex;
      `}
    >
      <Container
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <h1
          css={css`
            color: ${theme.colors.black};
            position: relative;
            z-index: 5;
            font-family: ${fonts.walsheim};
            font-weight: 100;
            font-size: ${rhythm(2.2)};
            line-height: ${rhythm(2.2)};
            margin: 0;
            max-width: ${rhythm(18)};
          `}
        >
          Maggie Appleton
        </h1>
        <h2
          css={css`
            font-family: ${fonts.cardo};
            font-weight: 200;
            font-size: ${rhythm(1.1)};
            line-height: ${rhythm(1.4)};
            max-width: 600px;
          `}
        >
          {' '}
          I make illustrations that help explain the world of technology and
          programming.
        </h2>
        <h4
          css={css`
            font-family: ${fonts.walsheimLight};
          `}
        >
          Art Director & Lead Illustrator at Egghead.io
        </h4>
      </Container>
      <div
        css={css`
          height: 150px;
          overflow: hidden;
        `}
      />
    </section>
  )
}

const Description = styled.p`
  margin-bottom: 10px;
  display: inline-block;
`

// ------- // Main Section // ---------- //

export default function Index({
  data: { site, illustrationQuery, notesQuery },
}) {
  const theme = useTheme()
  return (
    <Layout site={site}>
      <Hero />
      <Container
        css={css`
          padding-bottom: 0;
          padding-top: 0;
          display: grid;
          grid-gap: 1em;
          grid-template-columns: 30% 70%;
          max-width: 75vw;
          ${bpMaxMD} {
            grid-template-columns: 100%;
          }
          .illustration {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            grid-gap: 0.2em;
          }
        `}
      >
        <section className="notes">
          <button>Start Here</button>
          <h3>Writing, Notes & Research</h3>
          <p>An open wiki of things I'm currently exploring</p>
          {notesQuery.edges.map(({ node: note }) => (
            <div
              key={note.id}
              css={css`
                margin-bottom: 40px;
              `}
            >
              <h4
                css={css({
                  marginBottom: rhythm(0.1),
                  transition: 'all 150ms ease',
                  ':hover': {
                    color: theme.colors.primary,
                  },
                })}
              >
                <Link
                  css={css`
                    font-family: ${fonts.walsheimLight};
                  `}
                  to={note.frontmatter.slug}
                  aria-label={`View ${note.frontmatter.title}`}
                >
                  {note.frontmatter.title}
                </Link>
              </h4>
            </div>
          ))}
          <Link to="/notes" aria-label="Visit written articles">
            View all essays
          </Link>

          <div className="reading">
            <p>Now Reading</p>
          </div>
        </section>

        <section>
          <h3>Illustration Work</h3>
          <div className="illustration">
            {illustrationQuery.edges.map(({ node: illustration }) => (
              <Link
                css={css`
                  font-family: ${fonts.walsheimLight};
                `}
                to={illustration.frontmatter.slug}
                aria-label={`View ${illustration.frontmatter.title}`}
              >
                <div
                  key={illustration.id}
                  css={css`
                    margin-bottom: 40px;
                  `}
                >
                  <img src={illustration.frontmatter.banner} />
                  <h4
                    css={css({
                      marginBottom: rhythm(0.3),
                      transition: 'all 150ms ease',
                      ':hover': {
                        color: theme.colors.primary,
                      },
                    })}
                  >
                    {illustration.frontmatter.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }

    illustrationQuery: allMdx(
      filter: {
        frontmatter: {
          categories: { eq: "illustration" }
          published: { ne: false }
        }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          excerpt(pruneLength: 120)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            slug
            banner {
              childImageSharp {
                fluid(maxWidth: 280) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }

    notesQuery: allMdx(
      filter: {
        frontmatter: { categories: { eq: "notes" }, published: { ne: false } }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          excerpt(pruneLength: 120)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            slug
          }
        }
      }
    }
  }
`
