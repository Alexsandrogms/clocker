import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date: Date, pattern: string) => {
  return format(date, pattern, {
    locale: ptBR,
  });
};
