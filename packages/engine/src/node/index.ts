export type Node = {
  kind: 'element' | 'component' | 'slot' | 'text' | 'comment' | 'mustache_tag' | 'attribute' | 'directive' | 'expression';
}

export type BaseNode = {
  attributes: {
    [key: string]: string | boolean | number | null;
  };
  children: Node[];
}

export type ElementNode = BaseNode & {
  kind: 'element';
}

export type ComponentNode = {
  kind: 'component';
}
