import clsx from 'clsx';
import { graphql, Link, PageProps } from 'gatsby';
import React, { FC } from 'react';

import Layout from '../components/layout';
import { Metadata } from '../components/metadata';
import { Article, XperienceQuery } from '../XperienceQuery';
import * as styles from './index.module.css';

export const query = graphql`
  {
    xperience {
      site(name: "DancingGoatCore") {
        home: page(path: "/Home") {
          name
          bannerText: field(name: "BannerText")
          banner: media(field: "Banner") {
            url
          }
          aboutUsLeftText: field(name: "AboutUsLeftText")
          aboutUsRightText: field(name: "AboutUsRightText")
          sections: children(types: ["DancingGoatCore.HomeSection"], orderBy: { columns: ["NodeOrder"] }) {
            path
            heading: field(name: "HomeSectionHeading")
            text: field(name: "HomeSectionText")
            linkText: field(name: "HomeSectionLinkText")
            link: links(field: "HomeSectionLink", top: 1) {
              url(relative: true)
            }
          }
          references: children(types: ["DancingGoatCore.Reference"], orderBy: { columns: ["NodeOrder"] }) {
            path
            name: field(name: "ReferenceName")
            description: field(name: "ReferenceDescription")
            text: field(name: "ReferenceText")
            image: attachment(field: "ReferenceImage") {
              url
            }
          }
          cafes: links(field: "Cafes") {
            path
            cafeName: field(name: "CafeName")
            image: attachment(field: "CafePhoto") {
              url
            }
          }
        }
        articles: page(path: "/Articles") {
          articles: children(
            types: ["DancingGoatCore.Article"]
            orderBy: { columns: ["DocumentPublishFrom"], order: DESCENDING }
            top: 5
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
      latestArticleHeading: localize(key: "dancinggoat.latestArticle")
      moreArticles: localize(key: "dancinggoat.moreArticles")
      tasteOurCoffee: localize(key: "dancinggoat.tasteOurCoffee")
      findOutMore: localize(key: "dancinggoat.findOutMore")
    }
  }
`;

const Index: FC<PageProps<XperienceQuery>> = ({
  data: {
    xperience: { site, latestArticleHeading, moreArticles, tasteOurCoffee, findOutMore },
  },
}) => {
  const publicationDate = (article: Article) => {
    const date = new Date(article.publishFrom ?? article.created);

    return date.toLocaleString('default', { month: 'long', day: 'numeric' });
  };

  const latestArticle = site.articles.articles[0];

  return (
    <Layout>
      <Metadata title={site.home.name} />
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(${site.home.banner.url})`,
        }}
        dangerouslySetInnerHTML={{ __html: site.home.bannerText }}
      ></div>
      <div className={styles.articles}>
        <h2>{latestArticleHeading}</h2>
        <div className={styles.articleHero}>
          <div className='group'>
            <div className='item'>
              <a href={latestArticle.url}>
                <img src={latestArticle.teaser.url} alt={latestArticle.title} title={latestArticle.title} />
              </a>
            </div>
            <div className={clsx('item', styles.articleHeroDetails)}>
              <h4>{publicationDate(latestArticle)}</h4>
              <h3>
                <a href={latestArticle.url}>{latestArticle.title}</a>
              </h3>
              <p>{latestArticle.summary}</p>
            </div>
          </div>
        </div>
        <div className='group'>
          {site.articles.articles.map((article, index) => {
            switch (index) {
              case 0:
                return;

              default:
                return (
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
                );
            }
          })}
        </div>
        <div className={styles.more}>
          <Link to='/articles'>{moreArticles}</Link>
        </div>
      </div>
      {site.home.sections.map((section) => (
        <div key={section.path} className={styles.section}>
          <h2>{section.heading}</h2>
          <p>{section.text}</p>
          <a href={section.link[0].url}>{section.linkText}</a>
        </div>
      ))}
      {site.home.references.map((reference) => (
        <div key={reference.path} className={styles.reference}>
          <h2>Reference</h2>
          <div className='group'>
            <div className={styles.image}>
              <img src={reference.image.url} alt={reference.name} />
            </div>
            <div className={clsx('item', styles.quote)}>
              <p>
                <span>&ldquo;</span>
                {reference.text}
                <span>&rdquo;</span>
              </p>
              <b>{reference.name}</b>
              <i>{reference.description}</i>
            </div>
          </div>
        </div>
      ))}
      <div className={clsx(styles.about, 'group')}>
        <div
          className={clsx(styles.left, 'item')}
          dangerouslySetInnerHTML={{ __html: site.home.aboutUsLeftText }}
        ></div>
        <div
          className={clsx(styles.right, 'item')}
          dangerouslySetInnerHTML={{ __html: site.home.aboutUsRightText }}
        ></div>
      </div>
      <div className={styles.cafes}>
        <h2>{tasteOurCoffee}</h2>
        <div className='group'>
          {site.home.cafes.map((cafe) => (
            <div key={cafe.path} className={clsx('item', styles.cafe)}>
              <div>
                <Link to='/cafes'>
                  <h3>{cafe.cafeName}</h3>
                  <span />
                  <img src={cafe.image.url} alt={cafe.cafeName} title={cafe.cafeName} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.more}>
          <Link to='/cafes'>{findOutMore}</Link>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
