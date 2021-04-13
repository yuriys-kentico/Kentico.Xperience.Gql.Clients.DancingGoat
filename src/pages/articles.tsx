import clsx from 'clsx';
import { graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';

import Layout from '../components/layout';
import { Metadata } from '../components/metadata';
import { Article, XperienceQuery } from '../XperienceQuery';
import * as styles from './articles.module.css';

export const query = graphql`
  {
    xperience {
      site(name: "DancingGoatCore") {
        articles: page(path: "/Articles") {
          name
          articles: children(
            types: ["DancingGoatCore.Article"]
            orderBy: { columns: ["DocumentPublishFrom"], order: DESCENDING }
          ) {
            path
            created
            publishFrom
            title: field(name: "ArticleTitle")
            summary: field(name: "ArticleSummary")
            url(relative: true)
            teaser: attachment(field: "ArticleTeaser") {
              url
            }
          }
        }
      }
    }
  }
`;

const Index: FC<PageProps<XperienceQuery>> = ({
  data: {
    xperience: { site },
  },
}) => {
  const publicationDate = (article: Article) => {
    const date = new Date(article.publishFrom ?? article.created);

    return date.toLocaleString('default', { month: 'long', day: 'numeric' });
  };

  return (
    <Layout>
      <Metadata title={site.articles.name} />
      <div className={styles.articles}>
        {site.articles.articles.map((article) => (
          <div key={article.path} className={styles.article}>
            <div className='group column'>
              <a href={article.url}>
                <img src={article.teaser.url} alt={article.title} title={article.title} />
              </a>
              <div className={clsx('item', styles.articleDetails)}>
                <h4>{publicationDate(article)}</h4>
                <h3>
                  <a href={article.url}>{article.title}</a>
                </h3>
                <p>{article.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Index;
