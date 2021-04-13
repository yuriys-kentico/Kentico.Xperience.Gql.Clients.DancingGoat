require('dotenv').config();

const environment = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

if (environment === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

module.exports = {
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'XperienceQuery',
        fieldName: 'xperience',
        url: process.env.XPERIENCE_QUERY_ENDPOINT,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-gatsby-cloud`,
    'gatsby-transformer-typescript-css-modules',
  ],
};
