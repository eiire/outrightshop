class RequestUpdater < Service
  CODE_REQUEST_NOT_VALID = :request_not_valid

  def initialize(current_user)
    @cur_user = current_user
  end

  def call(request_params)
    @req_params = request_params

    request = req_find
    new_state = update_req(request)
    return request_not_valid_error(new_state) unless new_state.valid?

    success(new_state)
  end

  private

  def update_req(request)
    request.update(type_req: @req_params[:type_req])
    request
  end

  def req_find
    Request.find(@req_params[:id])
  end

  def request_not_valid_error(request)
    error(request.errors.messages, code: CODE_REQUEST_NOT_VALID)
  end
end
