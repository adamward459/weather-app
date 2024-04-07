export async function getData<Data, Key extends string>(
  url: Key,
): Promise<Data> {
  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw await response.json();
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getDataWithArgs<
  Data,
  Key extends string,
  ExtraArgs extends object,
>(url: Key, { arg }: { arg: ExtraArgs }): Promise<Data> {
  try {
    let queryString = '';
    for (const [key, value] of Object.entries(arg)) {
      queryString += `&${key}=${value}`;
    }
    console.log(queryString);
    const response = await fetch(`${url}?${queryString}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw await response.json();
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
