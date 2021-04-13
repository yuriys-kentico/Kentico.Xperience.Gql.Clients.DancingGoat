import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

interface IMetadata {
  description: string;
  lang: string;
  meta: any[];
  title: string;
}

export const Metadata: FC<Partial<IMetadata>> = ({ description, lang, meta, title }) => {
  const { xperience } = useStaticQuery<{
    xperience: {
      site: {
        name: string;
      };
    };
  }>(
    graphql`
      {
        xperience {
          site(name: "DancingGoatCore") {
            name
          }
        }
      }
    `
  );

  const metaDescription = description || xperience.site.name;

  return (
    <Helmet
      htmlAttributes={{
        lang: lang || 'en',
      }}
      title={title}
      titleTemplate={title === '' ? xperience.site.name : `%s - ${xperience.site.name}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta || [])}
    />
  );
};
