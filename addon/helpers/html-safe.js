import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function htmlSafeHelper(value) {
  return htmlSafe(value);
}

export default helper(htmlSafeHelper);
