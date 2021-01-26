import React, { useState } from 'react';

import Loader from '../../Animations/Loader';

export type SetLoadingType = {
  setLoading: (loading: boolean) => void;
};

export default function withLoading<P>(
  Component: React.ComponentType<P & SetLoadingType>,
): typeof Component {
  return (props: P): JSX.Element => {
    const [isLoading, setLoading] = useState(false);
    return (
      <>
        {isLoading && <Loader />}
        <Component {...props} setLoading={setLoading} />;
      </>
    );
  };
}
