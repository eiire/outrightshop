class ProductsController < ActionController::Base
  before_action :manager?, except: [:index]
  def index
    render json: {
      loaded: true,
      role: current_user.nil? ? 'anonymous' : current_user.role,
      products: Jbuilder.new { |json| json.array! Product.all, :id, :name, :image_url }.array!
    }
  end

  def create
    product = Product.create(product_params)
    if product.valid?
      render json: { id: product.id, name: product.name, image_url: product.image_url }, status: :ok
    else
      render json: { errors: product.errors }, status: :unprocessable_entity
    end
  end

  def update
    product = Product.find(product_params[:id])
    if product.update_attributes(product_params)
      render json: { id: product.id, name: product.name, image_url: product.image_url }, status: :ok
    else
      render json: { errors: product.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Product.destroy(product_params[:id])
  end

  private

  def product_params
    params.permit(:name, :image, :id).to_h.merge! user: current_user
  end

  def manager?
    current_user.role == 'manager'
  end
end
