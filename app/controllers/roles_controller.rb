class RolesController < ActionController::Base
  def index
    if user_signed_in?
      render json: { role: User.find(current_user.id).role }
    else
      render json: { role: 'anonymous' }
    end
  end
end
