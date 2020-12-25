class RequestsController < ActionController::Base
  before_action :operator?,
                except: %i[index create]
  @@types_req = %w[processing accepted completed]
  def index
    user_role = User.find(current_user.id).role
    if (user_role == 'user') || (user_role == 'manager')
      render json: {
        loaded: true,
        requests: Request.find_by_sql("SELECT \"requests\".* FROM \"requests\" WHERE \"requests\".\"user_id\" = #{current_user.id}"),
        role: User.find(current_user.id).role
      }
    else
      render json: {
        loaded: true,
        requests: Request.find_by_sql("SELECT \"requests\".* FROM \"requests\" WHERE \"requests\".\"operator_id\" = #{current_user.id}"),
        role: User.find(current_user.id).role
      }
    end
  rescue StandardError
    render json: { role: 'anonymous' }
  end

  def create
    if (User.find(current_user.id).role == 'user') || (User.find(current_user.id).role == 'manager')
      req_by_user = Request.find_by_sql("SELECT \"requests\".* FROM \"requests\" WHERE \"requests\".\"user_id\" =
        #{current_user.id} and \"requests\".\"product_id\" = #{params[:product_id]}")

      unless req_by_user.count >= 1
        operator = User.find_by_sql(['SELECT "users".id, count("requests".id)
          FROM "users" left join "requests" on "users".id = "requests"."operator_id"
          group by "requests".id, "users".id having "users".role = :role', { role: 'operator' }])
                       .min_by(&:count)

        request = Request.create
        request.id = Request.last.nil? ? 1 : Request.last.id + 1
        request.type_req = @@types_req[0]
        request.product_id = params[:product_id]
        request.user_id = current_user.id
        request.operator_id = operator.id.floor
        request.save
        render json: request
      end
    else
      req_by_user = Request.find_by_sql("SELECT \"requests\".* FROM \"requests\"
        WHERE \"requests\".\"user_id\" = #{params[:user_id]} and \"requests\".\"product_id\" = #{params[:product_id]}")

      unless req_by_user.count >= 1
        request = Request.create
        request.id = Request.last.nil? ? 1 : Request.last.id + 1
        request.type_req = params[:type_req]
        request.product_id = params[:product_id]
        request.user_id = params[:user_id]
        request.operator_id = current_user.id
        request.save
        render json: request
      end
    end
  end

  def update
    request = Request.find(params[:id])
    request.type_req = @@types_req[@@types_req.index(params[:type_req]) + 1] unless params[:type_req] == 'completed'
    request.save
    render json: request
  rescue StandardError
    render json: { error: 'incorrect type requests' }, status: 500
  end

  def destroy
    Request.destroy(params[:id])
  end

  private

  def request_params
    params.require(:request).permit(
      :current_user.id, :type_req
    )
  end

  def operator?
    p Request.all
    render json: { error: 'You are not a page!' } unless User.find(current_user.id).role == 'operator'
  end
end
