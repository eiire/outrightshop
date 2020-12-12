class RolesController < ActionController::Base
  before_action :authenticate_user!

  def index
    render json: { role: User.find(current_user.id).role }
  end
end
