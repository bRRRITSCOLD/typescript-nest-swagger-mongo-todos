import * as _request from 'supertest';

export const request = (app: any, method: any, route: any, body?: any, jwt?: string) => {
  return new Promise((resolve, reject) => {
    _request(app.getHttpServer())
      [method](route)
      .set('Authorization', jwt ? jwt : '')
      .send(body ? body : undefined)
      .end((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
};