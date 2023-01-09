import * as React from 'react';

let id = 0;

export const useId = () => React.useState(() => id++)[0];
