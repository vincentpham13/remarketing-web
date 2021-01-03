import React, { PropsWithChildren } from 'react';

const SimpleButton = (props: PropsWithChildren<{
  hello?: string
}>) => {

  return (
    <button>Click me</button>
  )
}

export default SimpleButton;
