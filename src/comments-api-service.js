import ApiService from './framework/api-service.js';

const Method = {
  DELETE: 'DELETE',
  POST:   'POST',
};

export default class CommentsApiService extends ApiService {
  getComments = (filmId) => this._load({url: `comments/${filmId}`}).then(ApiService.parseResponse);

  addComment = async (comment, filmId) => {
    const response = await this._load({
      url:     `comments/${filmId}`,
      method:  Method.POST,
      body:    JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return await ApiService.parseResponse(response);
  };

  deleteComment = async (comment) => await this._load({
    url:    `comments/${comment.id}`,
    method: Method.DELETE,
  });
}
