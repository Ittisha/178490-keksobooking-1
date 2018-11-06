const ValidationError = require(`../errors/validation-error`);

const {FormFields,
  CHECK_IN_OUT_REGEXP,
  MAX_ADDRESS_LENGTH,
  OFFER_FEATURES,
  OFFER_TYPES,
  Price,
  RoomsQuantity,
  TitleLength,
  ValidateErrorMessage} = require(`../server-settings`);

const {makeArray} = require(`../../utils/util-functions`);

const createErrorMessage = (field, message = ValidateErrorMessage.REQUIRED) => ({
  error: `Validation Error`,
  fieldName: field,
  errorMessage: message
});

const isAddressValid = (address) => typeof address === `string` && address.length <= MAX_ADDRESS_LENGTH;

const isCheckValid = (time) => typeof time === `string` &&
 !!time.match(CHECK_IN_OUT_REGEXP);

const isPriceValid = (price) => Number(price) && price >= Price.MIN && price <= Price.MAX;

const isTitleValid = (title) =>
  typeof title === `string` && title.length >= TitleLength.MIN &&
   title.length <= TitleLength.MAX;

const isTypeValid = (type) => typeof type === `string` &&
 OFFER_TYPES.find((item) => item === type);

// should make this additional check `|| rooms === RoomsQuantity.MIN` as min rooms number is 0, and Number(0) is read as false
const isRoomsFieldValid = (rooms) => (Number(rooms) || Number(rooms) === RoomsQuantity.MIN) &&
rooms >= RoomsQuantity.MIN && rooms <= RoomsQuantity.MAX;

const isFeatureFieldValid = (features) => {
  const incomingFeatures = makeArray(features);
  return incomingFeatures.every((feature) =>
    OFFER_FEATURES.includes(feature)) && !incomingFeatures.some((feature) =>
    incomingFeatures.indexOf(feature) !== incomingFeatures.lastIndexOf(feature));
};

const isImageValid = (image) => image.mimetype.match(/^image\//);

const validateRequiredField = (field, fieldName, errorMessage, isValidField, errorsStore) => {
  if (!field) {
    return [...errorsStore, createErrorMessage(fieldName)];
  }
  if (!isValidField(field)) {
    return [...errorsStore, createErrorMessage(fieldName, errorMessage)];
  }
  return errorsStore;
};

const validateOptionalField = (field, fieldName, errorMessage, isValidField, errorsStore) => {
  if (field && !isValidField(field)) {
    return [...errorsStore, createErrorMessage(fieldName, errorMessage)];
  }
  return errorsStore;
};

const validateRoomsField = (rooms, prevErrorsStore) => {
  if (rooms === undefined) {
    return [...prevErrorsStore, createErrorMessage(FormFields.rooms)];
  }
  if (!isRoomsFieldValid(rooms)) {
    return [...prevErrorsStore, createErrorMessage(FormFields.rooms, ValidateErrorMessage.ROOMS)];
  }
  return prevErrorsStore;
};

const validate = (data) => {
  let errors = [];

  const {title,
    type,
    price,
    address,
    checkin,
    checkout,
    rooms,
    features,
    avatar,
    preview} = data;

  errors = validateRequiredField(title, FormFields.title, ValidateErrorMessage.TITLE, isTitleValid, errors);

  errors = validateRequiredField(type, FormFields.type, ValidateErrorMessage.TYPE, isTypeValid, errors);

  errors = validateRequiredField(price, FormFields.price, ValidateErrorMessage.PRICE, isPriceValid, errors);

  errors = validateRequiredField(address, FormFields.address, ValidateErrorMessage.ADDRESS, isAddressValid, errors);

  errors = validateRequiredField(checkin, FormFields.checkin, ValidateErrorMessage.CHECKIN, isCheckValid, errors);

  errors = validateRequiredField(checkout, FormFields.checkout, ValidateErrorMessage.CHECKOUT, isCheckValid, errors);

  errors = validateRoomsField(rooms, errors);

  errors = validateOptionalField(features, FormFields.features, ValidateErrorMessage.FEATURES, isFeatureFieldValid, errors);

  errors = validateOptionalField(avatar, FormFields.avatar, ValidateErrorMessage.IMAGES, isImageValid, errors);

  if (preview) {
    const errorInPreview = preview.some((photo) => !isImageValid(photo));
    errors = errorInPreview ? [...errors, createErrorMessage(FormFields.preview, ValidateErrorMessage.IMAGES)] : errors;
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  return data;
};

module.exports = validate;
