const asyncHandler =
  (fn) =>
  (
    req,
    res,
    next //1-we're just we just have a function
  ) =>
    // that takes in request response and next ...and it's going to resolve a promise.
    // 2- And if it resolves, it's going to just it's going to call next,
    // which then calls the next piece of middleware
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
