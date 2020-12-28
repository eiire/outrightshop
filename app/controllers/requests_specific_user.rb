class RequestsSpecificUser < Service
  CODE_USER_NOT_CONFIRMED = :anonymous_user

  def initialize(current_user)
    @cur_user = current_user
  end

  def call
    if @cur_user.nil?
      user_not_confirmed_error({ loaded: false, requests: [], role: 'anonymous' })
    elsif @cur_user.role == 'operator' || @cur_user.role == 'manager'
      success({ loaded: true, requests: requests_spec_user, role: @cur_user.role })
    end
  end

  private

  def requests_spec_user
    if @cur_user.role == 'operator'
      Request.where({ operator_id: @cur_user.id }).all
    else
      Request.where({ user: @cur_user }).all
    end
  end

  def user_not_confirmed_error(response)
    error(response, code: CODE_USER_NOT_CONFIRMED)
  end
end
