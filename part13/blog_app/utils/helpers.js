const { AuthorizationError } = require('./errors');

function isAuthorizedUser(targetUserId, authUserId){
  if (targetUserId !== authUserId) {
    throw new AuthorizationError('Permission denied');
  }
  return true;
}

module.exports = { isAuthorizedUser };