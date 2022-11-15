export const Categories = {
  SPORT: 1,
  ElECTRONIC: 2,
  TECHNOLOGY: 3,
  COMPUTER: 4,
  CLOTHING: 5,
  FORNITURE: 6,
  HOUSEWARE: 7,
  AUTO: 8,
  BEAUTY: 9,
  JWELLERY: 10,
};
export const optionsCategory = (): JSX.Element[] => {
  const keys = Object.keys(Categories);
  const value = Object.values(Categories);
  const options: JSX.Element[] = [];
  for (let i = 0; i < keys.length; i++) {
    options.push(
      <option value={value[i]} key={value[i]}>
        {keys[i]}
      </option>
    );
  }
  return options;
};
export const getKeyByValue = (value: number): string => {
  const map = new Map<number, string>();
  const keys = Object.keys(Categories);
  const values = Object.values(Categories);
  for (let i = 0; i < keys.length; i++) {
    map.set(Number(values[i]), keys[i]);
  }
  return String(map.get(Number(value)));
};
