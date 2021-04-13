import React, { FC } from 'react';

import Layout from '../components/layout';
import { Metadata } from '../components/metadata';

const _404: FC = () => (
  <Layout>
    <Metadata title='404: Not found' />
    <h1>404: Not Found</h1>
  </Layout>
);

export default _404;
