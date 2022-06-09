import ApiService from './framework/api-service.js';

const Method = {
  DELETE: 'DELETE',
};

export default class CommentsApiService extends ApiService {
  getComments = (filmId) => this._load({url: `comments/${filmId}`}).then(ApiService.parseResponse);

  deleteComment = async (comment) => await this._load({
    url: `comments/${comment.id}`,
    method: Method.DELETE,
  });
}
