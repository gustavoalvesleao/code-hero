import React, { useState } from 'react';

import Loader from '../../Animations/Loader';

export type SetLoadingType = {
  setLoading: (loading: boolean) => void;
};

// This takes a Component as an argument and returns it with a Loader Component
// Also passes a setLoading as props, enabling the Component to control whether
// to display the loading animation or not.
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
