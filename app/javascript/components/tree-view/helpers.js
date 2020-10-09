import { Tree } from 'react-wooden-tree';

/**
 * Helper
 * Changes class to className.
 * Sets undefined checkbox to null.
 * Moves the key to attr.key.
 */
const normalize = (tree, fn) => tree.map((n) => {
  let node = { ...n };
  if (node.class) {
    node = { ...node, classes: node.class };
    delete node.class;
  }

  // The server cannot send null, just undefined, this is why it is tested as a string.
  if (node.state.checked === 'undefined') {
    node = { ...node, state: { ...node.state, checked: null } };
  } else if (node.state.checked === null) {
    node = { ...node, state: { ...node.state, checked: false } };
  }

  if (node.key) {
    node = { ...node, attr: { key: node.key } };
    delete node.key;
  }

  if (node.nodes) {
    node = { ...node, nodes: normalize(node.nodes, fn) };
  }

  return fn ? fn(node) : node;
});

const flatten = data => Tree.convertHierarchicalTree(Tree.initHierarchicalTree(data));

// This function adjusts the nodes generated by the TreeBuilder for the usage with TreeView
const convert = (data, { checked = [], selected = null } = {}) => flatten(normalize(data, ({ state, ...node }) => ({
  ...node,
  state: {
    ...state,
    checked: checked.includes(node.attr.key),
    selected: selected === node.attr.key,
  },
})));

/**
 * Helper
 * Activates the first active node in the tree, which is passed trought the props.
 *
 * FIXME Delete this function when bakcend is sending data where the initial node is activated,
 * or when all the trees calling a reducer if they want to have an activated node at the start.
 */

const activateNode = (tree, doActivate, key) => {
  if (!doActivate) {
    return tree;
  }

  let node = Tree.nodeSelector(tree, Tree.nodeSearch(tree, null, 'key', key)[0]);
  node = { ...node, state: { ...node.state, selected: true } };
  return { ...tree, [node.nodeId]: node };
};

const callBack = (nodeId, type, value, namespace) => ({ nodeId, type, value, namespace });

export { convert, activateNode, callBack };
