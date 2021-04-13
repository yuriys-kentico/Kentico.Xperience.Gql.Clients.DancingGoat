import clsx from 'clsx';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React, { FC } from 'react';

import { XperienceQuery } from '../XperienceQuery';
import * as styles from './layout.module.css';

const Layout: FC = ({ children }) => {
  const {
    xperience: { site },
  } = useStaticQuery<XperienceQuery>(graphql`
    {
      xperience {
        site(name: "DancingGoatCore") {
          menu(orderBy: { columns: ["NodeLevel", "NodeOrder"] }) {
            name
            url(relative: true)
          }
          contact: page(path: "/Footer/Dancing-Goat-Ltd") {
            socials: children {
              linkTitle: field(name: "SocialLinkTitle")
              linkUrl: field(name: "SocialLinkUrl")
              icon: attachment(field: "SocialLinkIcon") {
                url
              }
            }
            countryState(field: "ContactCountry") {
              country {
                twoLetterCode
                name
              }
              state {
                code
                name
              }
            }
            name: field(name: "ContactName")
            phone: field(name: "ContactPhone")
            email: field(name: "ContactEmail")
            zip: field(name: "ContactZipCode")
            street: field(name: "ContactStreet")
            city: field(name: "ContactCity")
          }
        }
      }
    }
  `);

  return (
    <>
      <header className='group'>
        <div className={styles.logo}>
          <StaticImage src='../assets/logo.svg' alt='Dancing Goat logo' />
        </div>
        {site.menu.map((page) => (
          <a key={page.url} className={clsx(styles.menu)} href={page.url}>
            {page.name}
          </a>
        ))}
        <div className={clsx('group item', styles.rightMenu)}>
          <div className={clsx('group', styles.search)}>
            <input className={styles.searchBox} placeholder='Search'></input>
            <button className={styles.searchButton}></button>
          </div>
          <a title='User' className={styles.icon}>
            <svg width='21' height='20' viewBox='0 0 21 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5.44934 14H15.4493C18.2108 14 20.4493 16.2386 20.4493 19C20.4493 19.5523 20.0016 20 19.4493 20C18.9365 20 18.5138 19.614 18.4561 19.1166L18.4442 18.8237C18.3564 17.3072 17.1421 16.093 15.6256 16.0051L15.4493 16H5.44934C3.79249 16 2.44934 17.3431 2.44934 19C2.44934 19.5523 2.00163 20 1.44934 20C0.897056 20 0.449341 19.5523 0.449341 19C0.449341 16.3112 2.57165 14.1182 5.23245 14.0046L5.44934 14H15.4493H5.44934ZM10.4493 0C13.763 0 16.4493 2.68629 16.4493 6C16.4493 9.31371 13.763 12 10.4493 12C7.13563 12 4.44934 9.31371 4.44934 6C4.44934 2.68629 7.13563 0 10.4493 0ZM10.4493 2C8.2402 2 6.44934 3.79086 6.44934 6C6.44934 8.20914 8.2402 10 10.4493 10C12.6585 10 14.4493 8.20914 14.4493 6C14.4493 3.79086 12.6585 2 10.4493 2Z'
                fill='currentColor'
              ></path>
            </svg>
          </a>
          <a title='Language' className={styles.icon}>
            EN
          </a>
          <Link className={styles.icon} to='/checkout/shoppingcart'>
            <svg width='26' height='24' viewBox='0 0 26 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M9.94934 19C10.7778 19 11.4493 19.6716 11.4493 20.5C11.4493 21.3284 10.7778 22 9.94934 22C9.12091 22 8.44934 21.3284 8.44934 20.5C8.44934 19.6716 9.12091 19 9.94934 19ZM18.9493 19C19.7778 19 20.4493 19.6716 20.4493 20.5C20.4493 21.3284 19.7778 22 18.9493 22C18.1209 22 17.4493 21.3284 17.4493 20.5C17.4493 19.6716 18.1209 19 18.9493 19ZM4.44934 2H6.44934C6.90494 2 7.29765 2.30684 7.4144 2.73774L7.43771 2.84794L7.92264 6H22.4493C23.0491 6 23.5043 6.52068 23.4445 7.10035L23.4255 7.21693L21.7736 14.6508C21.4818 15.9637 20.3552 16.9143 19.0273 16.9945L18.845 17H10.1652C8.74369 17 7.52631 16.0044 7.23199 14.6299L7.20006 14.4562L5.59142 4H4.44934C3.89706 4 3.44934 3.55228 3.44934 3C3.44934 2.48716 3.83538 2.06449 4.33272 2.00673L4.44934 2H6.44934H4.44934ZM21.2027 8H8.23034L9.17681 14.1521C9.24608 14.6024 9.60907 14.9438 10.0527 14.9937L10.1652 15H18.845C19.2746 15 19.6514 14.7265 19.7896 14.3285L19.8212 14.2169L21.2027 8Z'
                fill='currentColor'
              ></path>
            </svg>
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div className='group'>
          <div className={clsx('item', styles.contact)}>
            <h5>Contact</h5>
            <address>
              {site.contact.phone}
              <br />
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              <br />
              {site.contact.name}
              <br />
              <br />
              {`${site.contact.street} ${site.contact.city}`}
              <br />
              {`${site.contact.countryState.state.name} ${site.contact.zip}, ${site.contact.countryState.country.name}`}
            </address>
            <div>
              {site.contact.socials.map((social) => (
                <a key={social.linkUrl} className={styles.social} href={social.linkUrl} target='_blank'>
                  <img src={social.icon.url} alt={social.linkTitle} title={social.linkTitle} />
                </a>
              ))}
            </div>
          </div>
          <div className={clsx('group column item', styles.news)}>
            <h5>News &amp; Updates</h5>
            <div className='group'>
              <div className='item'>
                <label className='group column'>
                  <span className='item'>Want to stay up to date? Please leave us your email address.</span>
                  <input className={styles.subscribeEmail} type='email' maxLength={250} />
                </label>
              </div>
              <div className='group'>
                <button className={styles.subscribeButton}>Subscribe</button>
              </div>
            </div>
            <div
              className={styles.copyright}
            >{`Copyright © ${new Date().getFullYear()} Dancing Goat. All rights reserved.`}</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
