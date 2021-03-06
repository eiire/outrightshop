class Product < ApplicationRecord
  include Rails.application.routes.url_helpers
  has_one_attached :image
  belongs_to :user

  validates :image, { presence: true }
  validates :name, { presence: true }

  def image_url
    url_for(image)
  end
end
