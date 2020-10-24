/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { TEXT_CONST } from '../../shared';

export const validator = values => {
    const errors = {};
    console.log(TEXT_CONST.EMAIL_INPUT_NAME, "values", values)
    if (!values[TEXT_CONST.EMAIL_INPUT_NAME]) {
        errors[TEXT_CONST.EMAIL_INPUT_NAME] =
            TEXT_CONST.EMAIL_REQUIRED;
    } else if (
        !TEXT_CONST.EMAIL_REGEX.test(
            values[TEXT_CONST.EMAIL_INPUT_NAME].toLowerCase()
        )
    ) {
        errors[TEXT_CONST.EMAIL_INPUT_NAME] =
            TEXT_CONST.EMAIL_INVALID;
    }
    if (!values[TEXT_CONST.PASSWORD_INPUT_NAME]) {
        errors[TEXT_CONST.PASSWORD_INPUT_NAME] =
            TEXT_CONST.PASSWORD_REQUIRED;
    }
    console.log("errors", errors)
    return errors;
};

