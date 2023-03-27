'use client';
import { createContext, useContext } from 'react';

type GlobalMapContextContent = {
  onSalvarPonto: (any: any) => any;
};

export const globalMapContext = createContext<GlobalMapContextContent>({
  onSalvarPonto: () => {},
});

export const useGlobalMapContext = () => useContext(globalMapContext);
