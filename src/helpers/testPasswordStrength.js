module.exports = function testPasswordStrength(password) {
  return new Promise((resolve, reject) => {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{8,})'
    );
    const mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );

    if (strongRegex.test(password)) {
      resolve('high');
    } else if (mediumRegex.test(password)) {
      resolve('med');
    } else {
      resolve('low');
    }
  });
};
