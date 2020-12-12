class ProductsController < ActionController::Base
  before_action :manager?, except: [:index]
  def index
    # User.find(current_user.id).update_attribute(:role, "manager")
    render json: Product.all
  end

  def create
    product = Product.create(product_params)
    render json: product
  end

  def update
    product = Product.find(params[:id])
    product.update_attributes(product_params)
    render json: product
  end

  def destroy
    Product.destroy(params[:id])
  end

  private

  def product_params
    params.require(:product).permit(:name)
  end

  def manager?
    render json: { error: 'You are not a page!' } unless User.find(current_user.id).role == 'manager'
  end
end
