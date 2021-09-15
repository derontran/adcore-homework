var React = require('react');
var { makeStyles } = require('@material-ui/core/styles');
var TreeView = require('@material-ui/lab/TreeView');
var ExpandMoreIcon = require('@material-ui/icons/ExpandMore');
var ChevronRightIcon = require('@material-ui/icons/ChevronRight');
var TreeItem = require('@material-ui/lab/TreeItem');


var root 
(callBackendAPI = async () => {
  const response = await fetch('/express_backend');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  root = body;
})();

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function RecursiveTreeView() {
  const classes = useStyles();

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(root)}
    </TreeView>
  );
}
