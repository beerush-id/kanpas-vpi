import tree from 'directory-tree';
export type Tree = {
  name: string;
  path: string;
  size: number;
  type: 'file' | 'directory';
  children: Tree[];
}

export function dir(path: string): Tree {
  return tree(path) as never;
}
