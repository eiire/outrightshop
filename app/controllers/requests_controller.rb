class RequestsController < ActionController::Base
  before_action :operator?, except: %i[index create]
  def index
    result = RequestsSpecificUser.new(current_user).call
    if result.success?
      render json: result.data
    else
      render json: result.data, status: result.error_code
    end
  end

  def create
    result = BalancerRequestCreator.new(current_user).call(request_params)
    if result.success?
      render json: result.data
    else
      render json: { error: result.data }, status: result.error_code
    end
  end

  def update
    result = RequestUpdater.new(current_user).call(request_params)
    if result.success?
      render json: result.data
    else
      render json: { error: result.data }, status: result.error_code
    end
  end

  def destroy
    Request.destroy(request_params[:id])
  end

  private

  def request_params
    params.permit(:id, :product_id, :type_req, :user_id).to_h.merge! user: current_user
  end

  def operator?
    current_user.role == 'operator'
  end
end
