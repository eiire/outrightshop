class RequestsController < ActionController::Base
  def index
    render json: Request.all
  end

  def create
    request = Request.create(request_params)
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
    params.require(:request).permit(:current_user.id, :type)
  end
end