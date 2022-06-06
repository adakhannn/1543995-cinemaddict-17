import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class CommentsApiService extends ApiService {
  get comments() {
    return this._load({url: 'movies/1'})
      .then(ApiService.parseResponse);
  }

  updateComment = async (comment) => {
    const response = await this._load({
      url: `tasks/${comment.id}`,
      method: Method.PUT,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };
}