const ValidationError = require(`../errors/validation-error`);
const {ValidateErrorMessage,
  TitleLength,
  OFFER_TYPES,
  Price,
  MAX_ADDRESS_LENGTH,
  CHECK_IN_OUT_REGEXP,
  RoomsQuantity,
  OFFER_FEATURES} = require(`../server-settings`);

const createErrorMessage = (field, message = ValidateErrorMessage.REQUIRED) => ({
  error: `Validation Error`,
  fieldName: field,
  errorMessage: message
});

const isTitleValid = (title) =>
  typeof title === `string` && title.length >= TitleLength.MIN && title.length <= TitleLength.MAX;

const isTypeValid = (type) => typeof type === `string` && OFFER_TYPES.find((item) => item === type);

const isPriceValid = (price) => Number(price) && price >= Price.MIN && price <= Price.MAX;

const isAddressValid = (address) => typeof address === `string` && address.length <= MAX_ADDRESS_LENGTH;

const isCheckValid = (time) => typeof time === `string` && !!time.match(CHECK_IN_OUT_REGEXP);

// should make this additional check `|| rooms === RoomsQuantity.MIN` as min rooms number is 0, and Number(0) is read as false
const isRoomsFieldValid = (rooms) => (Number(rooms) || Number(rooms) === RoomsQuantity.MIN) && rooms >= RoomsQuantity.MIN && rooms <= RoomsQuantity.MAX;

const isFeatureFieldValid = (incomingFeatures, featuresList) => {
  return !incomingFeatures || (incomingFeatures.every((feature) => featuresList.includes(feature)) && !incomingFeatures.some((feature) => incomingFeatures.indexOf(feature) !== incomingFeatures.lastIndexOf(feature)));
};

const validate = (data) => {
  const errors = [];

  const validateRequiredField = (field, fieldName, errorMessage, isValidField) => {
    if (!field) {
      errors.push(createErrorMessage(fieldName));
      return;
    }
    if (!isValidField(field)) {
      errors.push(createErrorMessage(fieldName, errorMessage));
    }
  };

  const validateRoomsField = () => {
    if (rooms === undefined) {
      errors.push(createErrorMessage(`rooms`));
      return;
    }
    if (!isRoomsFieldValid(rooms)) {
      errors.push(createErrorMessage(`rooms`, ValidateErrorMessage.ROOMS));
    }
  };

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

  validateRequiredField(title, `title`, ValidateErrorMessage.TITLE, isTitleValid);

  validateRequiredField(type, `type`, ValidateErrorMessage.TYPE, isTypeValid);

  validateRequiredField(price, `price`, ValidateErrorMessage.PRICE, isPriceValid);

  validateRequiredField(address, `address`, ValidateErrorMessage.ADDRESS, isAddressValid);

  validateRequiredField(checkin, `checkin`, ValidateErrorMessage.CHECKIN, isCheckValid);

  validateRequiredField(checkout, `checkout`, ValidateErrorMessage.CHECKOUT, isCheckValid);

  validateRoomsField();

  if (!isFeatureFieldValid(features, OFFER_FEATURES)) {
    errors.push(createErrorMessage(`features`, ValidateErrorMessage.FEATURES));
  }

  if (avatar && !avatar.mimetype.match(/^image\//)) {
    errors.push(createErrorMessage(`avatar`, ValidateErrorMessage.IMAGES));
  }

  if (preview && !preview.mimetype.match(/^image\//)) {
    errors.push(createErrorMessage(`preview`, ValidateErrorMessage.IMAGES));
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  return data;
};

module.exports = validate;
