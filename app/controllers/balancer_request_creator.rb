class BalancerRequestCreator < Service
  CODE_REQUEST_NOT_VALID = :request_not_valid

  def initialize(current_user)
    @cur_user = current_user
  end

  def call(request_params)
    @request_params = request_params

    request = create_req

    return request_not_valid_error(request) unless request.valid?

    success(request)
  end

  private

  def create_req
    Request.create(@request_params.merge!({ user: user, operator_id: operator_id }))
  end

  def operator_id
    # Get an operator id with a minimum number of requests
    User.left_joins(:requests).group(:id).having({ role: 'operator' }).count('id')
        .min_by { |_operator_id, count| count }[0]
  end

  def user
    @cur_user.role == 'user' || @cur_user.role == 'manager' ? @cur_user : User.find(@request_params[:user_id])
  end

  def request_not_valid_error(request)
    error(request.errors.messages, code: CODE_REQUEST_NOT_VALID)
  end
end
