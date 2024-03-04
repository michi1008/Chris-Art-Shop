import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, desc, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='destiption' content={desc} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To my art gallery',
  description: 'I sell my painings',
  keywords: 'paining, midwest, landscape, hourses',
};
export default Meta;
