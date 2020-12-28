class Request < ApplicationRecord
  belongs_to :user
  belongs_to :product

  validate :product_req_exist, on: :create
  validate :req_not_exist, on: :update

  def product_req_exist
    errors.add(:massages, 'Request for this product already exists') if Request.exists?(product_id: product_id)
  end

  def req_not_exist
    types_req = %w[processing accepted completed]
    errors.add(:massages, 'Incorrect type request') unless types_req.include? type_req
  end
end
