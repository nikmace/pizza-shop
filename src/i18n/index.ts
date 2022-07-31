/* eslint-disable import/prefer-default-export */
export const i18n = {
  EN: {
    title: 'English',
    subTitle: 'English Language',
    currency: 'USD',
    currencySign: '$',
    SinglePizza: {
      PIZZA_PRICE: 'Price',
      PIZZA_FROM: 'from',
      PIZZA_RATING: 'Rating',
      PIZZA_SIZES: 'Possible sizes',
      PIZZA_DOUGH_TYPE: 'Dough type',
      PIZZA_CATEGORY: 'Category',
      BACK_BUTTON: 'Back',
    },
  },
  RU: {
    title: 'Русский',
    subTitle: 'Русский язык',
    currency: 'RUB',
    currencySign: '₽',
    SinglePizza: {
      PIZZA_PRICE: 'Цена',
      PIZZA_FROM: 'от',
      PIZZA_RATING: 'Рейтинг',
      PIZZA_SIZES: 'Возможные размеры',
      PIZZA_DOUGH_TYPE: 'Тип теста',
      PIZZA_CATEGORY: 'Категория',
      BACK_BUTTON: 'Назад',
    },
  },
};

export interface IpData {
  ip: string;
  country: string;
}

interface APIResponse {
  city: string;
  country: string;
  hostname: string;
  ip: string;
  loc: string;
  org: string;
  postal: string;
  region: string;
  timezone: string;
}

export async function getCurrentIP(): Promise<IpData> {
  const request = await fetch('https://ipinfo.io/json?token=dea24934179d18');
  const json = (await request.json()) as APIResponse;

  return {
    ip: json.ip,
    country: json.country,
  };
}
