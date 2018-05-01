import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <header
    className="site-header"
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <div className="heading">
        <h1 style={{ margin: 0, textAlign: 'right' }}>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            {siteTitle
              .split(' ')
              .map((word, index) => <span key={index}>{word}&nbsp;</span>)}
          </Link>
        </h1>
      </div>
    </div>
  </header>
)

export default Header
