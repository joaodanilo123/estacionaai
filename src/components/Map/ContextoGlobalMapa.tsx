'use-client';
import { createContext, useContext } from 'react';

export type conteudoContextoGlobalMapa = {
  onSalvarPonto: (any: any) => any;
};

export const ContextoGlobalMapa = createContext<conteudoContextoGlobalMapa>({
  onSalvarPonto: () => {},
});

export const useContextoGlobalMapa = () => useContext(ContextoGlobalMapa);
