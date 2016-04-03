import {GLOBAL_KEY_PRESS} from '../constants'

export default function(key) {
  return {
    type: GLOBAL_KEY_PRESS,
    key: key
  };
}
