import * as vscode from 'vscode'
import { createCompletionItem, getSelection, registerCompletionItemProvider } from '@vscode-use/utils'

const buttonType = ['primary', 'success', 'info', 'warning', 'danger', 'text', 'error']
const buttonSize = ['medium', 'small', 'large', 'mini', 'normal']
const progressStatus = ['success', 'exception', 'warning']
const progressType = ['line', 'circle', 'dashboard']
const avatarShape = ['circle', 'square']
const placementPosition = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']
const directionWay = ['horizontal', 'vertical', 'rtl', 'ltr', 'ttb', 'btt']
const alignWay = ['left', 'center', 'right']
const columnFixed = ['left', 'right']
const snippetString = [
  'width',
  'height',
  'min',
  'min-width',
  'min-height',
  'max',
  'max-width',
  'max-height',
  'maxlength',
  'minlength',
  'tabindex',
  'options',
  'limit',
  'data',
  'icon',
  'title',
  'label',
  'label-position',
  'label-width',
  'label-suffix',
  'rules',
  'active-color',
  'inactive-color',
  'model',
  'prop',
  'props',
  'percentage',
  'v-loading',
  'fill',
  'suffix',
  'prefix-icon',
  'suffix-icon',
  'total',
  'value-format',
  'formatter',
]
const commonMap = [
  'autocomplete',
  'multiple',
  'inline',
  'round',
  'circle',
  'disabled',
  'loading',
  'plain',
  'active',
  'clearable',
  'fit',
  'clearable',
  'autosize',
  'column-key',
  'append-to-body',
  'draggable',
  ...buttonType.map(type => `type="${type}"`),
  ...buttonSize.map(size => `size="${size}"`),
  ...progressType.map(type => `type="${type}"`),
  ...progressStatus.map(status => `status="${status}"`),
  ...avatarShape.map(shape => `shape="${shape}"`),
  ...placementPosition.map(placement => `placement="${placement}"`),
  ...directionWay.map(direction => `direction="${direction}"`),
  ...alignWay.map(align => `align="${align}"`),
  ...columnFixed.map(fixed => `fixed="${fixed}"`),
]
const uiComponents = [
  'container',
  'header',
  'aside',
  'main',
  'footer',
  'form',
  'form-item',
  'table',
  'table-item',
  'tag',
  'progress',
  'tree',
  'pagination',
  'badge',
  'row',
  'col',
  'avatar',
  'empty',
  'alert',
  'menu',
  'menu-item',
  'submenu',
  'tabs',
  'tab-pane',
  'breadcrumb',
  'breadcrumb-item',
  'page-header',
  'dropdown',
  'dropdown-menu',
  'steps',
  'dialog',
  'tooltip',
  'popover',
  'button',
  'link',
  'icon',
  'radio',
  'radio-group',
  'checkbox',
  'checkbox-group',
  'input',
  'input-number',
  'select',
  'cascader',
  'switch',
  'slider',
  'time-select',
  'time-picker',
  'date-picker',
  'upload',
  'rate',
  'color-picker',
  'transfer',
  'popconfirm',
  'card',
  'carousel',
  'collapse',
  'collapse-item',
  'timeline',
  'timeline-item',
  'divider',
  'calendar',
  'image',
  'backtop',
  'drawer',
]

export function activate(context: vscode.ExtensionContext) {
  const filter = ['javascript', 'javascriptreact', 'typescriptreact', 'html', 'vue', 'css']

  context.subscriptions.push(registerCompletionItemProvider(filter, () => {
    const { lineText } = getSelection()!
    const uiMatch = lineText.split(' ').slice(-1)[0].match(/<(\w+)-/)
    if (uiMatch) {
      const uiLib = uiMatch[1]
      return uiComponents.map((component) => {
        return createCompletionItem(`${uiLib}-${component}`, `${uiLib}-${component}></${uiLib}-${component}>`, vscode.CompletionItemKind.Variable)
      })
    }

    return [
      ...commonMap.map(completion => createCompletionItem(
        completion,
        completion,
        vscode.CompletionItemKind.Variable,
      )),
      ...snippetString.map(snippet =>
        createCompletionItem(snippet, `${snippet}="$1"$2`, vscode.CompletionItemKind.Variable),
      ),
    ]
  }, ['"', '\'', ' ', '.']))
}

export function deactivate() {

}
