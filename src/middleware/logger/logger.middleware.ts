export function loggerMiddleware(...args: any[]) {
  return function(req, res, next) {
    const _write = res.write;
    const _end = res.end;

    const chunks = [];

    const startTime: number = new Date().getTime();

    req.customContext = {
      startTime,
      endTime: undefined
    };

    res.customContext = {
      startTime,
      endTime: undefined
    };

    res.write = function (chunk) {
      chunks.push(Buffer.from(chunk));

      _write.apply(res, arguments);
    };

    res.end = function (chunk) {
      if (chunk)
        chunks.push(Buffer.from(chunk));

      var body = Buffer.concat(chunks).toString('utf8');

      const endTime: number = new Date().getTime();

      res.customContext.endTime = endTime;
      req.customContext.endTime = endTime;

      _end.apply(res, arguments);
    };

    next();
  }
}
