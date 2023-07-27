
export class BaseAction {
  handleError(err: any) {
    if (Array.isArray(err)) {
      err.forEach((e) => {
        // logger.error(e);
      });
    } else {
    //   logger.error(err);
    }
  }
}
