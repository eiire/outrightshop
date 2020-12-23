class ProductsController < ActionController::Base
  before_action :manager?, except: [:index]
  def index
    begin
      render json: {
        loaded: true,
        products: Product.all.reduce([]) { |json, product|
          json.append(
            {
              id: product.id,
              name: product.name,
              image: product.get_image_url
            }
          )
        },
        role: User.find(current_user.id).role
      }
    rescue StandardError
      render json: {
          loaded: true,
          products: Product.all.reduce([]) { |json, product|
            json.append(
                {
                    id: product.id,
                    name: product.name,
                    image: product.get_image_url
                }
            )
          },
          role: "anonymous"
      }
    end
  end

  def create
    product = Product.create
    product.name = params[:name]
    product.user = current_user
    product.image = params[:image]
    product.save

    render json: { id: product.id, name: product.name, image: product.get_image_url }
  end

  def update
    product = Product.find(params[:id])
    product.name = params[:name]
    product.image = params[:image]
    product.user = current_user
    product.save
    render json: { id: product.id, name: product.name, image: product.get_image_url }
  end

  def destroy
    Product.destroy(params[:id])
  end

  private

  def product_params
    params.require(:product).permit(:name, :image)
  end

  def manager?
    render json: { error: 'You are not a page!' } unless User.find(current_user.id).role == 'manager'
  end
end
