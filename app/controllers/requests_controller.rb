class RequestsController < ActionController::Base
  before_action :operator?, except: [:index, :create]
  def index
    render json: Request.find_by_user_id(current_user.id)
  end

  def create
    if User.find(current_user.id).role == 'user'
      operator_id, count_requests = Request.joins(:user)
                                           .where("users.role = 'operator'")
                                           .group('users.id')
                                           .count
                                           .max_by { |key, value| value }
      request = Request.create(user: User.find(operator_id))
    else
      request = Request.create(request_params)
    end
    render json: request
  end

  def update
    request = Request.find(params[:id])
    request.update_attributes(request_params)
    render json: request
  end

  def destroy
    Request.destroy(params[:id])
  end

  private

  def request_params
    params.require(:request).permit(:current_user.id, :type_req)
  end

  def operator?
    p Request.all
    render json: { error: 'You are not a page!' } unless User.find(current_user.id).role == 'operator'
  end
end
