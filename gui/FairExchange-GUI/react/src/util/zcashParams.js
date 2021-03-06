import { translate } from '../translate/translate';

export function zcashParamsCheckErrors(zcashParamsExist) {
  let _errors;

  if (zcashParamsExist.errors) {
    _errors = [translate('SAFE_NATIVE.ZCASH_PARAMS_MISSING'), ''];

    if (!zcashParamsExist.rootDir) {
      _errors.push(translate('SAFE_NATIVE.ZCASH_PARAMS_MISSING_ROOT_DIR'));
    }
    if (!zcashParamsExist.provingKey) {
      _errors.push(translate('SAFE_NATIVE.ZCASH_PARAMS_MISSING_PROVING_KEY'));
    }
    if (!zcashParamsExist.verifyingKey) {
      _errors.push(translate('SAFE_NATIVE.ZCASH_PARAMS_MISSING_VERIFYING_KEY'));
    }
    if (!zcashParamsExist.provingKeySize &&
        zcashParamsExist.provingKey) {
      _errors.push(translate('SAFE_NATIVE.ZCASH_PARAMS_MISSING_PROVING_KEY_SIZE'));
    }
    if (!zcashParamsExist.verifyingKeySize &&
        zcashParamsExist.verifyingKey) {
      _errors.push(translate('SAFE_NATIVE.ZCASH_PARAMS_MISSING_VERIFYING_KEY_SIZE'));
    }
  }

  return _errors;
}