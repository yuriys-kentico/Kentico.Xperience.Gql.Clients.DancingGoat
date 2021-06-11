import clsx from 'clsx';
import { graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';

import Layout from '../components/layout';
import { Metadata } from '../components/metadata';
import { Article, XperienceQuery } from '../XperienceQuery';
import * as styles from './article.module.css';

export const query = graphql`
  query($articlePath: String!) {
    xperience {
      site(name: "DancingGoatCore") {
        article: page(path: $articlePath) {
          created
          publishFrom
          title: field(name: "ArticleTitle")
          text: field(name: "ArticleText")
          teaser: attachment(field: "ArticleTeaser") {
            url
          }
          relatedArticles: links(field: "ArticleRelatedArticles") {
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
      relatedArticles: localize(key: "dancinggoat.relatedArticles")
    }
  }
`;

const Index: FC<PageProps<XperienceQuery>> = ({
  data: {
    xperience: { site, relatedArticles },
  },
}) => {
  const longPublicationDate = (article: Article) => {
    const date = new Date(article.publishFrom ?? article.created);

    return date.toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const publicationDate = (article: Article) => {
    const date = new Date(article.publishFrom ?? article.created);

    return date.toLocaleString('default', { month: 'long', day: 'numeric' });
  };

  return (
    <Layout>
      <Metadata title={site.article.name} />
      <div className={styles.article}>
        <div className={styles.body}>
          <h1>{site.article.title}</h1>
          <div className={styles.date}>{longPublicationDate(site.article)}</div>
          <div className='group'>
            <img src={site.article.teaser.url} alt={site.article.title} title={site.article.title} />
          </div>
          <p dangerouslySetInnerHTML={{ __html: site.article.text }} />
        </div>
        <div className={styles.relatedArticles}>
          {site.article.relatedArticles.length > 0 && <h2>{relatedArticles}</h2>}
          {site.article.relatedArticles.map((relatedArticle) => (
            <div key={relatedArticle.path} className={styles.relatedArticle}>
              <div className='group column'>
                <a href={relatedArticle.url}>
                  <img src={relatedArticle.teaser.url} alt={relatedArticle.title} title={relatedArticle.title} />
                </a>
                <div className={clsx('item', styles.articleDetails)}>
                  <h4>{publicationDate(relatedArticle)}</h4>
                  <h3>
                    <a href={relatedArticle.url}>{relatedArticle.title}</a>
                  </h3>
                  <p>{relatedArticle.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
