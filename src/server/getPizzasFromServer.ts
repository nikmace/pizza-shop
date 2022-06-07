import { IPizza } from 'types/types';

const getPizzasFromServer = async (
  categoryId: number,
  sortName: string,
  currentPage: number
): Promise<IPizza[]> => {
  try {
    const data = await fetch(
      'https://pizz-server.herokuapp.com/api/v1/pizzas',
      {
        method: 'POST',
        body: JSON.stringify({ categoryId, sortName, currentPage }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const pizzaList: IPizza[] = await data.json();
    return pizzaList;
  } catch (err) {
    if (err instanceof Error) {
      // TODO: Error handling & Global REDUX for Errors
      throw new Error(err.message);
    }
  }

  return [];
};

export default getPizzasFromServer;
