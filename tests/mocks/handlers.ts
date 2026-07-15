import { db } from './db';
import { http, HttpResponse } from 'msw';


export const handlers = [
  ...db.category.toHandlers('rest'),
  ...db.product.toHandlers('rest'),
  http.get('/user', () => {
    return HttpResponse.json({ name: 'Sheriff' });
  })
];
