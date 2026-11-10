import {API, ASTPath, FileInfo, JSXMemberExpression, MemberExpression, Options} from 'jscodeshift';

const tabsPackages = ['@workday/canvas-kit-react', '@workday/canvas-kit-react/tabs'];

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;

  const root = j(file.source);

  // Local names of `Tabs` imported from main, accounting for renamed imports
  // i.e. `import {Tabs as MyTabs} from '@workday/canvas-kit-react/tabs'`
  const tabsNames = new Set<string>();
  root
    .find(j.ImportDeclaration, node => tabsPackages.includes(node.source.value as string))
    .forEach(nodePath => {
      (nodePath.value.specifiers || []).forEach(specifier => {
        if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'Tabs') {
          tabsNames.add(specifier.local?.name || specifier.imported.name);
        }
      });
    });

  if (!tabsNames.size) {
    return file.source;
  }

  // Skip references where a local binding shadows the imported `Tabs`
  const isImportedTabs = (nodePath: ASTPath, name: string) => {
    const scope = nodePath.scope?.lookup(name);
    return !scope || scope.isGlobal;
  };

  let hasChanges = false;

  // <Tabs.MenuPopper> -> <Tabs.Menu.Popper>
  root
    .find(
      j.JSXMemberExpression,
      (node: JSXMemberExpression) =>
        node.object.type === 'JSXIdentifier' &&
        tabsNames.has(node.object.name) &&
        node.property.name === 'MenuPopper'
    )
    .filter(nodePath => isImportedTabs(nodePath, (nodePath.value.object as {name: string}).name))
    .forEach(nodePath => {
      hasChanges = true;
      const tabsName = (nodePath.value.object as {name: string}).name;
      nodePath.replace(
        j.jsxMemberExpression(
          j.jsxMemberExpression(j.jsxIdentifier(tabsName), j.jsxIdentifier('Menu')),
          j.jsxIdentifier('Popper')
        )
      );
    });

  // Tabs.MenuPopper -> Tabs.Menu.Popper (e.g. `as={Tabs.MenuPopper}`)
  root
    .find(
      j.MemberExpression,
      (node: MemberExpression) =>
        !node.computed &&
        node.object.type === 'Identifier' &&
        tabsNames.has(node.object.name) &&
        node.property.type === 'Identifier' &&
        node.property.name === 'MenuPopper'
    )
    .filter(nodePath => isImportedTabs(nodePath, (nodePath.value.object as {name: string}).name))
    .forEach(nodePath => {
      hasChanges = true;
      const tabsName = (nodePath.value.object as {name: string}).name;
      nodePath.replace(
        j.memberExpression(
          j.memberExpression(j.identifier(tabsName), j.identifier('Menu')),
          j.identifier('Popper')
        )
      );
    });

  return hasChanges ? root.toSource() : file.source;
}
