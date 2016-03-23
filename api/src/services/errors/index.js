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
  console.error(err);
  switch (err.code) {
    case codes.UNIQUE_VIOLATION:
      throw uniqueViolationError(err);
    default:
      if (err.type !== 'FeathersError') {
        throw new errors.GeneralError('Error in application')
      }
      throw err;
  }
}

export default knexHandler;
