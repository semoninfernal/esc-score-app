import errors from 'feathers-errors';

const codes = {
  UNIQUE_VIOLATION: '23505'
}

function uniqueViolationError(err) {
  const pattern = /\(([^)]+)\)=\(([^)]+)\)/ig;
  const [field, value] = Array.prototype.splice.call(pattern.exec(err.detail), 1);

  return new errors.BadRequest(`Unique violation.`, {errors: {
    [field]: `${value} already exists`
  }});
}

function knexHandler(err) {
  switch (err.code) {
    case codes.UNIQUE_VIOLATION:
      throw uniqueViolationError(err);
    default:
      throw errors.GeneralError('Error in application')
  }
}

export default knexHandler;
