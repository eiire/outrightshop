require 'rails_helper'

RSpec.describe Product, type: :model do
  it 'is not valid with invalid attributes' do
    expect(Product.new).to_not be_valid
  end

  it 'is valid with invalid image' do
    u1 = User.create!({ email: 'guy@gmail.com', role: ['manager'], password: '111111', password_confirmation: '111111' })
    p = Product.new
    p.id = 1
    p.user = u1
    p.name = 'test_p'
    expect(p).to_not be_valid
  end
end
