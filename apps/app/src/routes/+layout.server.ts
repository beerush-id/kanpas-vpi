import dir from 'directory-tree';
export async function load() {
  const tree = dir('/domains/beerush.io/kanpas-vpi');

  return { tree };
}
