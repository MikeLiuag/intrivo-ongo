export default (function () {
  const epoch = new Date(1899, 11, 30);
  const msPerDay = 8.64e7;

  return function (n) {
    // Deal with -ve values
    const dec = n - Math.floor(n);

    if (n < 0 && dec) {
      n = Math.floor(n) - dec;
    }

    return new Date(n * msPerDay + +epoch);
  };
})();
