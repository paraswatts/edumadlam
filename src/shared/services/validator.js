/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { TEXT_CONST } from '../../shared';

export const validator = values => {
    const errors = {};
    if (!values[TEXT_CONST.NAME_INPUT_NAME]) {
        errors[TEXT_CONST.NAME_INPUT_NAME] =
            TEXT_CONST.NAME_REQUIRED;
    }
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

    if (!values[TEXT_CONST.MOBILE_INPUT_NAME]) {
        errors[TEXT_CONST.MOBILE_INPUT_NAME] =
            TEXT_CONST.PHONE_REQUIRED;
    }


    if (!values[TEXT_CONST.PASSWORD_INPUT_NAME]) {
        errors[TEXT_CONST.PASSWORD_INPUT_NAME] =
            TEXT_CONST.PASSWORD_REQUIRED;
    }

    if (!values[TEXT_CONST.CONFIRM_PASSWORD_INPUT_NAME]) {
        errors[TEXT_CONST.CONFIRM_PASSWORD_INPUT_NAME] =
            TEXT_CONST.CONFIRM_PASSWORD_REQUIRED;
    }

    if (values[TEXT_CONST.PASSWORD_INPUT_NAME] && values[TEXT_CONST.CONFIRM_PASSWORD_INPUT_NAME]
        && values[TEXT_CONST.PASSWORD_INPUT_NAME] !== values[TEXT_CONST.CONFIRM_PASSWORD_INPUT_NAME]
    ) {
        errors[TEXT_CONST.PASSWORD_INPUT_NAME] = TEXT_CONST.PASSWORD_DONT_MATCH
    }
    return errors;
};

